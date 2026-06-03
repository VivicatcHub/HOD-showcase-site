import { HOD_CONFIG } from "@/lib/config";
import { fetchSheetRows } from "@/lib/fetchSheet";

export type EventType = "game night" | "tournament" | "other";

export type EventItem = {
  title: string;
  date: string;
  location: string;
  description: string;
  type: EventType;
};

export type GameItem = {
  name: string;
  min_players: number;
  max_players: number;
  duration_min: number;
  category: string;
  available: boolean;
};

export async function getEvents(): Promise<EventItem[]> {
  try {
    const rows = await fetchSheetRows<Record<string, string>>(HOD_CONFIG.eventsSheetName);

    return rows
      .map((row) => ({
        title: row.title ?? "Événement sans titre",
        date: row.date ?? "",
        location: row.location ?? "Lieu à confirmer",
        description: row.description ?? "",
        type: normalizeType(row.type),
      }))
      .filter((event) => event.date)
      .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  } catch {
    return [];
  }
}

export async function getGames(): Promise<GameItem[]> {
  try {
    const rows = await fetchSheetRows<Record<string, string>>(HOD_CONFIG.gamesSheetName);

    return rows.map((row) => ({
      name: row.name ?? "Jeu sans nom",
      min_players: parseInteger(row.min_players),
      max_players: parseInteger(row.max_players),
      duration_min: parseInteger(row.duration_min),
      category: row.category ?? "Autre",
      available: ["true", "vrai", "1", "oui"].includes((row.available ?? "").toLowerCase()),
    }));
  } catch {
    return [];
  }
}

function normalizeType(value?: string): EventType {
  const type = (value ?? "").toLowerCase().trim();
  if (type === "game night" || type === "tournament" || type === "other") return type;
  if (type.includes("tournoi")) return "tournament";
  if (type.includes("soir") || type.includes("game")) return "game night";
  return "other";
}

function parseInteger(value?: string): number {
  const parsed = Number.parseInt(value ?? "0", 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}
