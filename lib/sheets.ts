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
      min_players: Number.parseInt(row.min_players ?? "0", 10) || 0,
      max_players: Number.parseInt(row.max_players ?? "0", 10) || 0,
      duration_min: Number.parseInt(row.duration_min ?? "0", 10) || 0,
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
