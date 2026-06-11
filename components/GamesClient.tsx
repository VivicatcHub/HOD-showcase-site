"use client";

import { useEffect, useMemo, useState } from "react";
import { GameRow } from "@/components/GameRow";
import { getGames } from "@/lib/games";
import type { GameItem } from "@/lib/games";

export function GamesClient() {
  const [games, setGames] = useState<GameItem[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [state, setState] = useState("all");

  useEffect(() => {
    getGames().then(({ games: data, lastUpdate: date }) => {
      setGames(data);
      setLastUpdate(date);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(
    () => [
      "all",
      ...new Set(games.map((game) => game.category).filter(Boolean)),
    ],
    [games],
  );

  const states = useMemo(
    () => ["all", ...new Set(games.map((game) => game.state).filter(Boolean))],
    [games],
  );

  const filtered = useMemo(() => {
    return games.filter((game) => {
      const byName = game.name.toLowerCase().includes(query.toLowerCase());
      const byCategory = category === "all" || game.category === category;
      const byState = state === "all" || game.state === state;
      return byName && byCategory && byState;
    });
  }, [games, query, category, state]);

  if (loading) {
    return (
      <div className="grid gap-3 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-[#1A1730]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lastUpdate && (
        <div className="flex justify-end">
          <span className="rounded-full bg-[#3C3489] px-2 py-1 text-xs text-[#AEA9EC]">
            Dernière mise à jour le{" "}
            {lastUpdate.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      )}
      <div className="grid gap-3 md:grid-cols-3">
        <input
          type="search"
          placeholder="Rechercher un jeu"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="rounded-lg border border-[#534AB7] bg-[#1A1730] px-3 py-2 text-sm text-[#F0EEF8]"
        />
        <select
          value={state}
          onChange={(event) => setState(event.target.value)}
          className="rounded-lg border border-[#534AB7] bg-[#1A1730] px-3 py-2 text-sm text-[#F0EEF8]"
        >
          {states.map((value) => (
            <option key={value} value={value}>
              {value === "all" ? "Toutes les états" : value}
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-lg border border-[#534AB7] bg-[#1A1730] px-3 py-2 text-sm text-[#F0EEF8]"
        >
          {categories.map((value) => (
            <option key={value} value={value}>
              {value === "all" ? "Toutes les appartenances" : value}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="text-[#9E9BB8]">
            Aucun jeu ne correspond à votre recherche.
          </p>
        ) : (
          filtered.map((game) => <GameRow key={game.name} game={game} />)
        )}
      </div>
    </div>
  );
}
