import { HOD_CONFIG } from "@/lib/config";
import { fetchSheetRows } from "@/lib/fetchSheet";

export type StateType =
  | "Neuf"
  | "Bon"
  | "Moyen"
  | "Mauvais"
  | "Perdu"
  | "Inconnu";

export type GameItem = {
  name: string;
  state: StateType;
  category: string;
  notes: string;
};

export async function getGames(): Promise<{
  games: GameItem[];
  lastUpdate: Date | null;
}> {
  try {
    const rows = await fetchSheetRows<Record<string, string>>(
      HOD_CONFIG.gamesSheetName,
    );

    let lastUpdate: Date | null = null;
    if (rows[0]?.MAJ) {
      lastUpdate = new Date(rows[0].MAJ);
    }

    const games = rows.map((row) => ({
      name: (row.Nom ?? "Jeu sans nom") as string,
      state: (row.Etat as StateType) ?? "Inconnu",
      category: (row.Appartenance ?? "HOD") as string,
      notes: (row.Notes ?? "") as string,
    }));

    return { games, lastUpdate };
  } catch {
    return { games: [], lastUpdate: null };
  }
}
