"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BrandLoader } from "@/components/BrandLogo";
import {
  CommanderImage,
  ManaPips,
  useCommanderCards,
} from "@/components/CommanderCard";
import {
  DIFFICULTY_ORDER,
  MANA_COLORS,
  getCommanderCard,
  getMtgDecks,
} from "@/lib/mtgDecks";
import type { ManaColor, MtgDeck } from "@/lib/mtgDecks";

const sortByOrder = (values: string[], order: string[]) =>
  [...values].sort((a, b) => {
    const rank = (value: string) =>
      order.includes(value) ? order.indexOf(value) : order.length;
    return rank(a) - rank(b) || a.localeCompare(b, "fr", { numeric: true });
  });

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs transition active:scale-95 ${active ? "border-[#AEA9EC] bg-[#3C3489] text-[#F0EEF8]" : "border-[#534AB7]/50 text-[#9E9BB8] hover:border-[#534AB7] hover:text-[#F0EEF8]"}`}
    >
      {children}
    </button>
  );
}

function DeckTile({ deck }: { deck: MtgDeck }) {
  const cards = useCommanderCards(deck.commanders);
  const names = cards
    .map((state, index) =>
      state.status === "ready"
        ? state.card.name
        : state.status === "missing"
          ? deck.commanders[index].code
          : null,
    )
    .filter(Boolean);
  const partners = deck.commanders.length > 1;

  return (
    <Link
      href={`/ludobible/magic/deck/?id=${deck.id}`}
      className="group block rounded-xl focus-visible:outline-offset-4"
    >
      <div className={`relative ${partners ? "mr-[12%]" : ""}`}>
        {partners && (
          <CommanderImage
            refCode={deck.commanders[1].code}
            state={cards[1]}
            className="absolute inset-0 translate-x-[14%] rotate-[5deg] opacity-80 transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[20%] group-hover:rotate-[8deg] group-hover:opacity-100"
          />
        )}
        <CommanderImage
          refCode={deck.commanders[0].code}
          state={cards[0]}
          className="relative transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:shadow-[0_0_32px_rgba(124,111,224,0.45)]"
        />
      </div>
      <div className="mt-3 space-y-1.5">
        <h3 className="font-semibold leading-snug text-[#F0EEF8] transition group-hover:text-[#AEA9EC]">
          {names.length > 0 ? (
            names.join(" & ")
          ) : (
            <span className="inline-block h-4 w-3/4 rounded bg-[#1A1730] align-middle motion-safe:animate-pulse" />
          )}
        </h3>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#9E9BB8]">
          <ManaPips colors={deck.colors} />
          {deck.difficulty && <span>{deck.difficulty}</span>}
          {deck.bracket && (
            <>
              <span aria-hidden>·</span>
              <span>Bracket {deck.bracket}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export function MtgDecksClient() {
  const [decks, setDecks] = useState<MtgDeck[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [colors, setColors] = useState<ManaColor[]>([]);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [bracket, setBracket] = useState<string | null>(null);
  const [cardNames, setCardNames] = useState<Record<string, string>>({});

  useEffect(() => {
    getMtgDecks().then((data) => {
      setDecks(data);
      setLoading(false);
      // Card names come from Scryfall; collect them so search can match them.
      data.forEach((deck) =>
        deck.commanders.forEach((ref) =>
          getCommanderCard(ref).then((card) => {
            if (card) {
              setCardNames((previous) => ({
                ...previous,
                [ref.code]: card.name,
              }));
            }
          }),
        ),
      );
    });
  }, []);

  const difficulties = useMemo(
    () =>
      sortByOrder(
        [...new Set(decks.map((deck) => deck.difficulty).filter(Boolean))],
        DIFFICULTY_ORDER,
      ),
    [decks],
  );

  const brackets = useMemo(
    () =>
      sortByOrder(
        [...new Set(decks.map((deck) => deck.bracket).filter(Boolean))],
        [],
      ),
    [decks],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return decks.filter((deck) => {
      const byText =
        !needle ||
        [
          ...deck.commanders.map((ref) => ref.code),
          ...deck.commanders.map((ref) => cardNames[ref.code] ?? ""),
          deck.owner,
          deck.howToPlay,
          ...deck.strengths,
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      const byColors = colors.every((color) => deck.colors.includes(color));
      const byDifficulty = !difficulty || deck.difficulty === difficulty;
      const byBracket = !bracket || deck.bracket === bracket;
      return byText && byColors && byDifficulty && byBracket;
    });
  }, [decks, query, colors, difficulty, bracket, cardNames]);

  const hasFilters =
    query !== "" || colors.length > 0 || difficulty !== null || bracket;

  const resetFilters = () => {
    setQuery("");
    setColors([]);
    setDifficulty(null);
    setBracket(null);
  };

  if (loading) {
    return <BrandLoader label="Chargement des decks…" />;
  }

  if (decks.length === 0) {
    return (
      <p className="rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-5 text-[#9E9BB8]">
        Aucun deck n&apos;est référencé pour le moment. Repasse bientôt !
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4 rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-4 sm:p-5">
        <input
          type="search"
          placeholder="Rechercher un commandant, un propriétaire, une mécanique…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-lg border border-[#534AB7] bg-[#0D0B1A]/60 px-3 py-2 text-sm text-[#F0EEF8] placeholder:text-[#9E9BB8]"
        />
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <fieldset className="flex items-center gap-3">
            <legend className="sr-only">Couleurs</legend>
            <span aria-hidden className="text-xs text-[#9E9BB8]">
              Couleurs
            </span>
            <div className="flex gap-1.5">
              {MANA_COLORS.map((color) => {
                const active = colors.includes(color.code);
                return (
                  <button
                    key={color.code}
                    type="button"
                    aria-pressed={active}
                    aria-label={color.label}
                    title={color.label}
                    onClick={() =>
                      setColors((previous) =>
                        active
                          ? previous.filter((code) => code !== color.code)
                          : [...previous, color.code],
                      )
                    }
                    className={`h-7 w-7 rounded-full transition active:scale-90 ${active ? "scale-110 ring-2 ring-[#AEA9EC] ring-offset-2 ring-offset-[#1A1730]" : "opacity-70 ring-1 ring-white/25 hover:opacity-100"}`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
          </fieldset>
          {difficulties.length > 0 && (
            <fieldset className="flex flex-wrap items-center gap-2">
              <legend className="sr-only">Difficulté</legend>
              <span aria-hidden className="mr-1 text-xs text-[#9E9BB8]">
                Difficulté
              </span>
              {difficulties.map((value) => (
                <FilterPill
                  key={value}
                  active={difficulty === value}
                  onClick={() =>
                    setDifficulty((previous) =>
                      previous === value ? null : value,
                    )
                  }
                >
                  {value}
                </FilterPill>
              ))}
            </fieldset>
          )}
          {brackets.length > 0 && (
            <fieldset className="flex flex-wrap items-center gap-2">
              <legend className="sr-only">Bracket</legend>
              <span aria-hidden className="mr-1 text-xs text-[#9E9BB8]">
                Bracket
              </span>
              {brackets.map((value) => (
                <FilterPill
                  key={value}
                  active={bracket === value}
                  onClick={() =>
                    setBracket((previous) =>
                      previous === value ? null : value,
                    )
                  }
                >
                  {value}
                </FilterPill>
              ))}
            </fieldset>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-[#534AB7]/30 pt-3 text-xs text-[#9E9BB8]">
          <span aria-live="polite">
            {filtered.length} deck{filtered.length > 1 ? "s" : ""} sur{" "}
            {decks.length}
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[#AEA9EC] underline-offset-4 hover:underline"
            >
              Effacer les filtres
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-[#9E9BB8]">
          Aucun deck ne correspond à ces filtres.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((deck) => (
            <DeckTile key={deck.id} deck={deck} />
          ))}
        </div>
      )}
    </div>
  );
}
