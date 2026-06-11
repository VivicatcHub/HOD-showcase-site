import { HOD_CONFIG } from "@/lib/config";
import { RRule, RRuleSet } from "rrule";

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
  const parsed = await loadCalendar();
  const from = startOfToday();

  const events: EventItem[] = [];
  for (const event of parsed) {
    const occurrence = nextOccurrence(event, from);
    if (occurrence) events.push(toEventItem(event, occurrence));
  }

  return events.sort((a, b) => +new Date(a.date) - +new Date(b.date));
}

/** Every future occurrence, with recurring events expanded up to one year
 *  ahead (e.g. "every Saturday" -> ~52 occurrences). */
export async function getAgendaEvents(): Promise<EventItem[]> {
  const parsed = await loadCalendar();
  const from = startOfToday();
  const to = new Date(from);
  to.setFullYear(to.getFullYear() + 1);

  const events: EventItem[] = [];
  for (const event of parsed) {
    for (const occurrence of occurrencesBetween(event, from, to)) {
      events.push(toEventItem(event, occurrence));
    }
  }

  return events.sort((a, b) => +new Date(a.date) - +new Date(b.date));
}

async function loadCalendar(): Promise<ParsedEvent[]> {
  try {
    const icalUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(
      HOD_CONFIG.eventsCalendarId,
    )}/public/basic.ics`;

    // Google Calendar ICS has no CORS headers — proxy the request through corsproxy.io
    const res = await fetch(
      `https://corsproxy.io/?${encodeURIComponent(icalUrl)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];

    const icalText = await res.text();
    const parsed: ParsedEvent[] = [];

    const lines = icalText.split(/\r?\n/);
    const unfolded: string[] = [];
    for (var line of lines) {
      line = line.replaceAll("\\", "");
      if (line.startsWith(" ") || line.startsWith("\t")) {
        if (unfolded.length) {
          unfolded[unfolded.length - 1] += line.slice(1);
        }
      } else {
        unfolded.push(line);
      }
    }

    let inEvent = false;
    let buffer: string[] = [];
    for (const line of unfolded) {
      if (line === "BEGIN:VEVENT") {
        inEvent = true;
        buffer = [];
        continue;
      }
      if (line === "END:VEVENT") {
        inEvent = false;
        const ev = parseEventBuffer(buffer);
        if (ev) parsed.push(ev);
        buffer = [];
        continue;
      }
      if (inEvent) buffer.push(line);
    }

    return parsed;
  } catch (err) {
    console.log(err);
    return [];
  }
}

function startOfToday(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function nextOccurrence(event: ParsedEvent, from: Date): Date | null {
  if (event.rset) return event.rset.after(from, true);
  return event.start >= from ? event.start : null;
}

function occurrencesBetween(event: ParsedEvent, from: Date, to: Date): Date[] {
  if (event.rset) return event.rset.between(from, to, true);
  return event.start >= from && event.start <= to ? [event.start] : [];
}

function toEventItem(event: ParsedEvent, occurrence: Date): EventItem {
  const end = event.durationMs
    ? new Date(occurrence.getTime() + event.durationMs)
    : null;
  return {
    title: event.title,
    date: occurrence.toISOString(),
    start: occurrence.toISOString(),
    end: end ? end.toISOString() : "",
    location: event.location,
    description: event.description,
    type: normalizeEventType(event.title + " " + event.description, occurrence),
  };
}

type ParsedEvent = {
  title: string;
  location: string;
  description: string;
  start: Date;
  durationMs: number;
  /** Recurrence set when the event repeats, otherwise null. */
  rset: RRuleSet | null;
};

function parseEventBuffer(buf: string[]): ParsedEvent | null {
  const map: Record<string, string> = {};
  for (const line of buf) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).split(";")[0];
    const value = line.slice(idx + 1);
    map[key] = (map[key] ? map[key] + "\n" : "") + value;
  }

  const title = map.SUMMARY ?? "Événement sans titre";
  const location = map.LOCATION ?? "Lieu à confirmer";
  const description = map.DESCRIPTION ?? "";

  const dtstartDate = parseICalDate(map.DTSTART ?? "");
  const dtendDate = parseICalDate(map.DTEND ?? "");
  if (!dtstartDate) return null;

  const durationMs = dtendDate
    ? Math.max(0, dtendDate.getTime() - dtstartDate.getTime())
    : 0;

  let rset: RRuleSet | null = null;
  if (map.RRULE) {
    try {
      rset = new RRuleSet();
      const ruleOptions = RRule.parseString(map.RRULE);
      ruleOptions.dtstart = dtstartDate;
      rset.rrule(new RRule(ruleOptions));

      if (map.RDATE) {
        map.RDATE.split(/[,\n]/)
          .map((s) => s.trim())
          .forEach((d) => {
            const dateObj = parseICalDate(d);
            if (dateObj) rset!.rdate(dateObj);
          });
      }

      if (map.EXDATE) {
        map.EXDATE.split(/[,\n]/)
          .map((s) => s.trim())
          .forEach((d) => {
            const dateObj = parseICalDate(d);
            if (dateObj) rset!.exdate(dateObj);
          });
      }
    } catch (err) {
      rset = null;
    }
  }

  return { title, location, description, start: dtstartDate, durationMs, rset };
}

function parseICalDate(value?: string): Date | null {
  if (!value) return null;
  const v = value.trim();

  let m =
    /^([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2})Z$/.exec(v);
  if (m) {
    const [, y, mm, d, hh, min, ss] = m;
    return new Date(
      Date.UTC(
        Number(y),
        Number(mm) - 1,
        Number(d),
        Number(hh),
        Number(min),
        Number(ss),
      ),
    );
  }

  m = /^([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})Z$/.exec(v);
  if (m) {
    const [, y, mm, d, hh, min] = m;
    return new Date(
      Date.UTC(
        Number(y),
        Number(mm) - 1,
        Number(d),
        Number(hh),
        Number(min),
        0,
      ),
    );
  }

  m = /^([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2})$/.exec(v);
  if (m) {
    const [, y, mm, d, hh, min, ss] = m;
    return new Date(
      Number(y),
      Number(mm) - 1,
      Number(d),
      Number(hh),
      Number(min),
      Number(ss),
    );
  }

  m = /^([0-9]{4})([0-9]{2})([0-9]{2})$/.exec(v);
  if (m) {
    const [, y, mm, d] = m;
    return new Date(Number(y), Number(mm) - 1, Number(d));
  }

  const parsed = new Date(v);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
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
