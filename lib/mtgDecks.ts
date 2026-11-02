import { HOD_CONFIG } from "@/lib/config";
import { fetchSheetRows } from "@/lib/fetchSheet";

export type ManaColor = "W" | "U" | "B" | "R" | "G";

export const MANA_COLORS: { code: ManaColor; label: string; hex: string }[] = [
  { code: "W", label: "Blanc", hex: "#F4EBC9" },
  { code: "U", label: "Bleu", hex: "#4A90D9" },
  { code: "B", label: "Noir", hex: "#3A3346" },
  { code: "R", label: "Rouge", hex: "#E05A43" },
  { code: "G", label: "Vert", hex: "#3E9E62" },
];

export const DIFFICULTY_ORDER = ["Facile", "Moyen", "Difficile"];

export type CommanderRef = {
  code: string;
  set: string;
  number: string;
};

export type MtgDeck = {
  id: string;
  commanders: CommanderRef[];
  colors: ManaColor[];
  difficulty: string;
  strengths: string[];
  weaknesses: string[];
  power: string;
  bracket: string;
  owner: string;
  howToPlay: string;
};

export type ScryfallCard = {
  name: string;
  typeLine: string;
  lang: string;
  image: string | null;
  largeImage: string | null;
  scryfallUrl: string;
};

const COLOR_WORDS: Record<string, ManaColor> = {
  blanc: "W",
  bleu: "U",
  noir: "B",
  rouge: "R",
  vert: "G",
};

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();

const splitList = (value = "") =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

function parseColors(value = ""): ManaColor[] {
  const found = new Set(
    splitList(value)
      .map((word) => COLOR_WORDS[normalize(word)])
      .filter(Boolean),
  );
  return MANA_COLORS.map((color) => color.code).filter((code) =>
    found.has(code),
  );
}

// "FIC#0001" → set "fic", collector number "1" (Scryfall drops leading zeros).
function parseCommander(code: string): CommanderRef | null {
  const match = code.trim().match(/^([A-Za-z0-9]+)\s*#\s*(\S+)$/);
  if (!match) return null;
  return {
    code: code.trim().toUpperCase(),
    set: match[1].toLowerCase(),
    number: match[2].replace(/^0+(?=\d)/, "").toLowerCase(),
  };
}

const deckId = (commanders: CommanderRef[]) =>
  commanders.map((ref) => `${ref.set}-${ref.number}`).join("_");

export async function getMtgDecks(): Promise<MtgDeck[]> {
  try {
    const rows = await fetchSheetRows<Record<string, string>>(
      HOD_CONFIG.mtgDecksSheetName,
    );

    return rows.flatMap((row) => {
      const commanders = splitList(row["Commandant(s)"])
        .map(parseCommander)
        .filter((ref): ref is CommanderRef => ref !== null);
      if (commanders.length === 0) return [];

      return [
        {
          id: deckId(commanders),
          commanders,
          colors: parseColors(row["Coloritées"]),
          difficulty: row["Difficultée de Jeu"]?.trim() ?? "",
          strengths: splitList(row["Points Forts"]),
          weaknesses: splitList(row["Points Faibles"]),
          power: row["Puissance Réelle"]?.trim() ?? "",
          bracket: row.Bracket?.trim() ?? "",
          owner: row["Propriétaire"]?.trim() ?? "",
          howToPlay: row["Comment il se joue"]?.trim() ?? "",
        },
      ];
    });
  } catch {
    return [];
  }
}

type ScryfallFace = {
  name: string;
  printed_name?: string;
  type_line?: string;
  printed_type_line?: string;
  image_uris?: Record<string, string>;
};

type ScryfallResponse = ScryfallFace & {
  lang: string;
  scryfall_uri: string;
  card_faces?: ScryfallFace[];
};

const cardCache = new Map<string, Promise<ScryfallCard | null>>();
let queue: Promise<unknown> = Promise.resolve();

// Scryfall asks clients to space requests by 50–100 ms.
function throttled<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task);
  queue = run
    .catch(() => undefined)
    .then(() => new Promise((resolve) => setTimeout(resolve, 80)));
  return run;
}

async function fetchScryfall(path: string): Promise<ScryfallResponse | null> {
  const response = await fetch(`https://api.scryfall.com/cards/${path}`, {
    headers: { Accept: "application/json" },
  });
  return response.ok ? response.json() : null;
}

function toCard(data: ScryfallResponse): ScryfallCard {
  const face = data.card_faces?.[0];
  const images = data.image_uris ?? face?.image_uris;
  const named = data.printed_name ? data : (face ?? data);
  return {
    name: named.printed_name ?? data.name,
    typeLine:
      named.printed_type_line ?? named.type_line ?? data.type_line ?? "",
    lang: data.lang,
    image: images?.normal ?? null,
    largeImage: images?.large ?? images?.normal ?? null,
    scryfallUrl: data.scryfall_uri,
  };
}

// French printing first, English otherwise.
export function getCommanderCard(
  ref: CommanderRef,
): Promise<ScryfallCard | null> {
  const key = `${ref.set}/${ref.number}`;
  let pending = cardCache.get(key);
  if (!pending) {
    pending = throttled(async () => {
      const path = `${ref.set}/${encodeURIComponent(ref.number)}`;
      const data =
        (await fetchScryfall(`${path}/fr`)) ?? (await fetchScryfall(path));
      return data ? toCard(data) : null;
    }).catch(() => null);
    cardCache.set(key, pending);
  }
  return pending;
}
