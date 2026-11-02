import { HOD_CONFIG } from "@/lib/config";

export type EventType = "game night" | "tournament" | "game day" | "other";

export type EventItem = {
  title: string;
  date: string;
  start: string;
  end: string;
  location: string;
  description: string;
  type: EventType;
};

/** One occurrence of every calendar event: recurring events collapse to their
 *  next future occurrence (e.g. "every Saturday" -> the next Saturday). */
export async function getEvents(): Promise<EventItem[]> {
  const occurrences = await loadCalendar();

  // Occurrences arrive sorted by start time, so the first one seen for a
  // series is its next occurrence.
  const seen = new Set<string>();
  const events: EventItem[] = [];
  for (const occurrence of occurrences) {
    if (seen.has(occurrence.seriesId)) continue;
    seen.add(occurrence.seriesId);
    events.push(occurrence.item);
  }
  return events;
}

/** Every future occurrence, with recurring events expanded up to one year
 *  ahead (e.g. "every Saturday" -> ~52 occurrences). */
export async function getAgendaEvents(): Promise<EventItem[]> {
  const occurrences = await loadCalendar();
  return occurrences.map((occurrence) => occurrence.item);
}

type Occurrence = {
  /** Shared by every occurrence of a recurring event. */
  seriesId: string;
  item: EventItem;
};

type CalendarApiDate = { date?: string; dateTime?: string };

type CalendarApiEvent = {
  id: string;
  recurringEventId?: string;
  summary?: string;
  location?: string;
  description?: string;
  start?: CalendarApiDate;
  end?: CalendarApiDate;
};

type CalendarApiResponse = {
  items?: CalendarApiEvent[];
  nextPageToken?: string;
};

// Both getEvents() and getAgendaEvents() run on the same page: share one request.
let calendarPromise: Promise<Occurrence[]> | null = null;

function loadCalendar(): Promise<Occurrence[]> {
  calendarPromise ??= fetchCalendar().catch((err) => {
    console.log(err);
    calendarPromise = null;
    return [];
  });
  return calendarPromise;
}

/** Future occurrences (up to one year ahead) from the Google Calendar API,
 *  which sends CORS headers and expands recurring events for us. */
async function fetchCalendar(): Promise<Occurrence[]> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
  if (!apiKey) {
    console.warn("NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY is not set: no events loaded.");
    return [];
  }

  const from = startOfToday();
  const to = new Date(from);
  to.setFullYear(to.getFullYear() + 1);

  const occurrences: Occurrence[] = [];
  let pageToken: string | undefined;
  do {
    const params = new URLSearchParams({
      key: apiKey,
      singleEvents: "true",
      orderBy: "startTime",
      timeMin: from.toISOString(),
      timeMax: to.toISOString(),
      maxResults: "2500",
    });
    if (pageToken) params.set("pageToken", pageToken);

    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        HOD_CONFIG.eventsCalendarId,
      )}/events?${params}`,
      { cache: "no-store" },
    );
    if (!res.ok) throw new Error(`Google Calendar API: ${res.status} ${await res.text()}`);

    const data: CalendarApiResponse = await res.json();
    for (const event of data.items ?? []) {
      const occurrence = toOccurrence(event);
      // timeMin matches on end time; keep only events starting today or later.
      if (occurrence && new Date(occurrence.item.start) >= from) {
        occurrences.push(occurrence);
      }
    }
    pageToken = data.nextPageToken;
  } while (pageToken);

  return occurrences;
}

function startOfToday(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function toOccurrence(event: CalendarApiEvent): Occurrence | null {
  const start = parseApiDate(event.start);
  if (!start) return null;
  const end = parseApiDate(event.end);

  const title = event.summary ?? "Événement sans titre";
  const description = htmlToText(event.description ?? "");
  return {
    seriesId: event.recurringEventId ?? event.id,
    item: {
      title,
      date: start.toISOString(),
      start: start.toISOString(),
      end: end ? end.toISOString() : "",
      location: event.location ?? "Lieu à confirmer",
      description,
      type: normalizeEventType(title + " " + description, start),
    },
  };
}

/** Timed events carry an RFC 3339 dateTime; all-day events a local YYYY-MM-DD date. */
function parseApiDate(value?: CalendarApiDate): Date | null {
  if (value?.dateTime) {
    const parsed = new Date(value.dateTime);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value?.date ?? "");
  if (!m) return null;
  const [, y, mm, d] = m;
  return new Date(Number(y), Number(mm) - 1, Number(d));
}

/** The API returns descriptions as HTML (links, <br>…); the UI shows plain text. */
function htmlToText(html: string): string {
  if (!html) return "";
  const withBreaks = html.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n");
  const doc = new DOMParser().parseFromString(withBreaks, "text/html");
  return (doc.body.textContent ?? "").trim();
}

function normalizeEventType(value: string, date: Date | null): EventType {
  const type = (value ?? "").toLowerCase().trim();
  if (
    type === "game night" ||
    type === "tournament" ||
    type === "other" ||
    type == "game day"
  )
    return type;
  if (type.includes("tournoi")) return "tournament";
  const hours = date?.getHours();
  if (!hours) return "other";
  if (hours < 18) return "game day";
  if (hours >= 18) return "game night";
  return "other";
}
