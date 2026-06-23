import Papa from "papaparse";
import { getSheetCsvUrl, HOD_CONFIG } from "@/lib/config";

export type XpEventEntry = {
  name: string;
  /** Temps passé sur l'évènement. */
  eventMinutes: number;
  /** Temps passé à l'organisation en amont. */
  prepMinutes: number;
  /** Temps de gestion de l'asso. */
  manageMinutes: number;
};

export type MemberXp = {
  lastName: string;
  firstName: string;
  role: string;
  credits: number;
  /** Total d'heure d'investissement tout confondu. */
  totalMinutes: number;
  totalEventMinutes: number;
  totalPrepMinutes: number;
  totalManageMinutes: number;
  events: XpEventEntry[];
};

/** Parse a "DD/MM/YYYY" date as written in the sheet. */
function parseFrDate(value: string): Date | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec((value ?? "").trim());
  if (!m) return null;
  return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
}

/** Render a minute count as "12h" or "12h30". */
export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!minutes) return "0h";
  return rest ? `${hours}h${String(rest).padStart(2, "0")}` : `${hours}h`;
}

export function formatXP(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!minutes) return "0 xp";
  return rest
    ? `${hours}.${String(rest / 0.6 - (rest % 0.6))} xp`
    : `${hours} xp`;
}

/** Strip accents + uppercase so header matching is resilient to wording. */
function normalize(value: string): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toUpperCase();
}

/** Parse "166:00" / "1:30" (h:mm) or a plain hour number into minutes. */
function toMinutes(value: string): number {
  const v = (value ?? "").trim();
  if (!v) return 0;
  const m = /^(\d+):(\d{1,2})$/.exec(v);
  if (m) return Number(m[1]) * 60 + Number(m[2]);
  const n = Number(v.replace(",", "."));
  return Number.isFinite(n) ? Math.round(n * 60) : 0;
}

export async function getMembersXp(
  sheetName: string = HOD_CONFIG.xpSheetNames[
    HOD_CONFIG.xpSheetNames.length - 1
  ],
): Promise<{
  members: MemberXp[];
  lastUpdate: Date | null;
}> {
  try {
    const res = await fetch(getSheetCsvUrl(sheetName, HOD_CONFIG.xpSheetId), {
      cache: "no-store",
    });
    if (!res.ok) return { members: [], lastUpdate: null };

    const csv = await res.text();
    const rows = Papa.parse<string[]>(csv, { skipEmptyLines: false }).data;

    // Locate the header row (the one whose first cell is exactly "NOM").
    const headerIndex = rows.findIndex((row) =>
      row.some((cell) => normalize(cell) === "NOM"),
    );
    if (headerIndex === -1) return { members: [], lastUpdate: null };

    const header = rows[headerIndex].map(normalize);
    const find = (predicate: (h: string) => boolean) =>
      header.findIndex(predicate);

    const cols = {
      last: find((h) => h === "NOM"),
      first: find((h) => h === "PRENOM"),
      role: find((h) => h === "ROLE"),
      credits: find((h) => h.includes("CREDIT")),
      total: find((h) => h.includes("XP")),
      eventName: find((h) => h.includes("NOM DE L") && h.includes("EVENEMENT")),
      eventTime: find((h) => h.includes("TEMPS PASSE SUR")),
      prepTime: find((h) => h.includes("ORGANISATION")),
      manageTime: find((h) => h.includes("GESTION")),
      maj: find((h) => h === "MAJ"),
    };

    const cell = (row: string[], index: number) =>
      index >= 0 ? (row[index] ?? "").trim() : "";

    let lastUpdate: Date | null = null;
    const members: MemberXp[] = [];
    let current: MemberXp | null = null;

    for (const row of rows.slice(headerIndex + 1)) {
      const last = cell(row, cols.last);

      // A filled last name starts a new member; that first row is its TOTAL row.
      if (last) {
        const maj = parseFrDate(cell(row, cols.maj));
        if (maj && (!lastUpdate || maj > lastUpdate)) lastUpdate = maj;
        current = {
          lastName: last,
          firstName: cell(row, cols.first),
          role: cell(row, cols.role),
          credits: Number(cell(row, cols.credits).replace(",", ".")) || 0,
          totalMinutes: toMinutes(cell(row, cols.total)),
          totalEventMinutes: toMinutes(cell(row, cols.eventTime)),
          totalPrepMinutes: toMinutes(cell(row, cols.prepTime)),
          totalManageMinutes: toMinutes(cell(row, cols.manageTime)),
          events: [],
        };
        members.push(current);
        continue;
      }

      if (!current) continue;

      const eventName = cell(row, cols.eventName);
      if (!eventName || normalize(eventName) === "TOTAL") continue;

      current.events.push({
        name: eventName,
        eventMinutes: toMinutes(cell(row, cols.eventTime)),
        prepMinutes: toMinutes(cell(row, cols.prepTime)),
        manageMinutes: toMinutes(cell(row, cols.manageTime)),
      });
    }

    return {
      members: members
        .sort((a, b) => b.totalMinutes - a.totalMinutes)
        .filter((event) => event.lastName != "EXEMPLE"),
      lastUpdate,
    };
  } catch {
    return { members: [], lastUpdate: null };
  }
}
