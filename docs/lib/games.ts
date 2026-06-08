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

export let GamesLastUpdate = new Date("01/01/2000");

export async function getGames(): Promise<GameItem[]> {
  try {
    const rows = await fetchSheetRows<Record<string, string>>(
      HOD_CONFIG.gamesSheetName,
    );

    if (rows[0].MAJ) {
      GamesLastUpdate = new Date(rows[0].MAJ);
    }

    return rows.map((row) => {
      const name = (row.Nom ?? "Jeu sans nom") as string;
      const etat = (row.Etat as StateType) ?? "Inconnu";
      const appartenance = (row.Appartenance ?? "HOD") as string;
      const notes = (row.Notes ?? "") as string;

      return {
        name: name,
        state: etat,
        category: appartenance,
        notes: notes,
      };
    });
  } catch {
    return [];
  }
}
