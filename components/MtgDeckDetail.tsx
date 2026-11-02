"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLoader } from "@/components/BrandLogo";
import {
  CommanderImage,
  ManaPips,
  useCommanderCards,
} from "@/components/CommanderCard";
import { MANA_COLORS, getMtgDecks } from "@/lib/mtgDecks";
import type { MtgDeck } from "@/lib/mtgDecks";

function BackLink() {
  return (
    <Link
      href="/ludobible/magic"
      className="inline-flex items-center gap-1.5 text-sm text-[#9E9BB8] transition hover:text-[#AEA9EC]"
    >
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 3 5 8l5 5" />
      </svg>
      Tous les decks
    </Link>
  );
}

function BracketScale({ value }: { value: string }) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) return <>{value}</>;
  return (
    <span className="flex items-center gap-3">
      <span>{level}</span>
      <span aria-hidden className="flex gap-1">
        {[1, 2, 3, 4, 5].map((step) => (
          <span
            key={step}
            className={`h-1.5 w-4 rounded-full ${step <= level ? "bg-[#AEA9EC]" : "bg-[#534AB7]/40"}`}
          />
        ))}
      </span>
      <span className="sr-only">sur 5</span>
    </span>
  );
}

function TraitList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h2 className="text-base font-semibold text-[#F0EEF8]">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-[#C9C6DD]"
          >
            <span
              aria-hidden
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C6FE0]"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DeckView({ deck }: { deck: MtgDeck }) {
  const cards = useCommanderCards(deck.commanders);
  const ready = cards.flatMap((state) =>
    state.status === "ready" ? [state.card] : [],
  );
  const title =
    cards
      .map((state, index) =>
        state.status === "ready"
          ? state.card.name
          : state.status === "missing"
            ? deck.commanders[index].code
            : null,
      )
      .filter(Boolean)
      .join(" & ") || null;

  useEffect(() => {
    if (title) document.title = `${title} | Heaven of Dice`;
  }, [title]);

  const stats = [
    { label: "Difficulté", value: deck.difficulty },
    { label: "Puissance réelle", value: deck.power },
    {
      label: "Bracket",
      value: deck.bracket && <BracketScale value={deck.bracket} />,
    },
    { label: "Propriétaire", value: deck.owner },
  ].filter((stat) => stat.value);

  return (
    <article>
      <BackLink />
      <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,340px)_1fr] lg:gap-14">
        <div className="space-y-4">
          {deck.commanders.map((ref, index) => (
            <figure key={ref.code} className="motion-panel">
              <CommanderImage
                refCode={ref.code}
                state={cards[index]}
                large
                className="mx-auto max-w-[340px] shadow-[0_0_40px_rgba(83,74,183,0.35)]"
              />
              <figcaption className="mt-2 flex justify-between gap-3 text-xs text-[#9E9BB8]">
                <span>{ref.code}</span>
                {cards[index].status === "ready" && (
                  <a
                    href={cards[index].card.scryfallUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#AEA9EC] underline-offset-4 hover:underline"
                  >
                    Voir sur Scryfall
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="space-y-10 md:pt-4">
          <header className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {title ?? (
                <span className="inline-block h-9 w-2/3 rounded bg-[#1A1730] align-middle motion-safe:animate-pulse" />
              )}
            </h1>
            {ready.length > 0 && (
              <p className="text-sm text-[#9E9BB8]">
                {[...new Set(ready.map((card) => card.typeLine))].join(" · ")}
              </p>
            )}
            <div className="flex items-center gap-2.5 text-sm text-[#C9C6DD]">
              <ManaPips colors={deck.colors} size="md" />
              <span>
                {deck.colors.length === 0
                  ? "Incolore"
                  : MANA_COLORS.filter((color) =>
                      deck.colors.includes(color.code),
                    )
                      .map((color) => color.label)
                      .join(", ")}
              </span>
            </div>
          </header>

          {stats.length > 0 && (
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#534AB7]/50 bg-[#534AB7]/30 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#1A1730] px-4 py-3">
                  <dt className="text-xs text-[#9E9BB8]">{stat.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#F0EEF8]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {deck.howToPlay && (
            <section>
              <h2 className="text-base font-semibold text-[#F0EEF8]">
                Comment il se joue
              </h2>
              <p className="mt-3 max-w-[65ch] leading-relaxed text-[#C9C6DD]">
                {deck.howToPlay}
              </p>
            </section>
          )}

          <div className="grid gap-8 sm:grid-cols-2">
            <TraitList title="Points forts" items={deck.strengths} />
            <TraitList title="Points faibles" items={deck.weaknesses} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function MtgDeckDetail() {
  const id = useSearchParams().get("id");
  const [deck, setDeck] = useState<MtgDeck | null | undefined>(undefined);

  useEffect(() => {
    getMtgDecks().then((decks) =>
      setDeck(decks.find((item) => item.id === id) ?? null),
    );
  }, [id]);

  if (deck === undefined) {
    return <BrandLoader label="Chargement du deck…" />;
  }

  if (deck === null) {
    return (
      <div className="space-y-4">
        <BackLink />
        <p className="rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-5 text-[#9E9BB8]">
          Ce deck est introuvable. Il a peut-être été retiré ou renommé dans la
          ludothèque.
        </p>
      </div>
    );
  }

  return <DeckView deck={deck} />;
}
