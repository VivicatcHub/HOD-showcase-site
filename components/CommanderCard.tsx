"use client";

import { useEffect, useState } from "react";
import { MANA_COLORS, getCommanderCard } from "@/lib/mtgDecks";
import type { CommanderRef, ManaColor, ScryfallCard } from "@/lib/mtgDecks";

type CardState =
  | { status: "loading" }
  | { status: "missing" }
  | { status: "ready"; card: ScryfallCard };

export function useCommanderCards(refs: CommanderRef[]) {
  const key = refs.map((ref) => ref.code).join(",");
  const [states, setStates] = useState<Record<string, CardState>>({});

  useEffect(() => {
    let cancelled = false;
    refs.forEach((ref) => {
      getCommanderCard(ref).then((card) => {
        if (cancelled) return;
        setStates((previous) => ({
          ...previous,
          [ref.code]: card ? { status: "ready", card } : { status: "missing" },
        }));
      });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return refs.map(
    (ref) => states[ref.code] ?? ({ status: "loading" } as CardState),
  );
}

// Magic cards have ~4.7% corner radii relative to their width.
export const CARD_SHAPE = "aspect-[488/680] rounded-[4.7%/3.4%]";

export function CommanderImage({
  refCode,
  state,
  large = false,
  className = "",
}: {
  refCode: string;
  state: CardState;
  large?: boolean;
  className?: string;
}) {
  if (state.status === "ready" && (state.card.largeImage ?? state.card.image)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={(large ? state.card.largeImage : state.card.image) ?? ""}
        alt={state.card.name}
        width={large ? 672 : 488}
        height={large ? 936 : 680}
        loading={large ? "eager" : "lazy"}
        className={`${CARD_SHAPE} w-full bg-[#1A1730] object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${CARD_SHAPE} flex w-full flex-col items-center justify-center gap-2 border border-[#534AB7]/50 bg-[#1A1730] p-4 text-center ${state.status === "loading" ? "motion-safe:animate-pulse" : ""} ${className}`}
    >
      {state.status === "missing" ? (
        <>
          <span className="text-sm font-semibold text-[#F0EEF8]">
            {refCode}
          </span>
          <span className="text-xs text-[#9E9BB8]">
            Carte introuvable sur Scryfall
          </span>
        </>
      ) : (
        <span className="sr-only">Chargement de la carte {refCode}</span>
      )}
    </div>
  );
}

export function ManaPips({
  colors,
  size = "sm",
}: {
  colors: ManaColor[];
  size?: "sm" | "md";
}) {
  const label =
    colors.length === 0
      ? "Incolore"
      : MANA_COLORS.filter((color) => colors.includes(color.code))
          .map((color) => color.label)
          .join(", ");

  return (
    <span role="img" aria-label={label} className="inline-flex gap-1">
      {MANA_COLORS.filter((color) => colors.includes(color.code)).map(
        (color) => (
          <span
            key={color.code}
            className={`${size === "md" ? "h-4 w-4" : "h-3 w-3"} rounded-full ring-1 ring-white/25`}
            style={{ backgroundColor: color.hex }}
          />
        ),
      )}
    </span>
  );
}
