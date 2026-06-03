"use client";

import { useMemo, useState } from "react";
import { GameRow } from "@/components/GameRow";
import type { GameItem } from "@/lib/sheets";

export function GamesClient({ games }: { games: GameItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [players, setPlayers] = useState("");

  const categories = useMemo(
    () => ["all", ...new Set(games.map((game) => game.category).filter(Boolean))],
    [games],
  );

  const filtered = useMemo(() => {
    const playerCount = Number.parseInt(players, 10);
    return games.filter((game) => {
      const byName = game.name.toLowerCase().includes(query.toLowerCase());
      const byCategory = category === "all" || game.category === category;
      const byPlayers = Number.isNaN(playerCount) || (playerCount >= game.min_players && playerCount <= game.max_players);
      return byName && byCategory && byPlayers;
    });
  }, [games, query, category, players]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <input
          type="search"
          placeholder="Rechercher un jeu"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="rounded-lg border border-[#534AB7] bg-[#1A1730] px-3 py-2 text-sm text-[#F0EEF8]"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-lg border border-[#534AB7] bg-[#1A1730] px-3 py-2 text-sm text-[#F0EEF8]"
        >
          {categories.map((value) => (
            <option key={value} value={value}>
              {value === "all" ? "Toutes les catégories" : value}
            </option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          placeholder="Nombre de joueurs"
          value={players}
          onChange={(event) => setPlayers(event.target.value)}
          className="rounded-lg border border-[#534AB7] bg-[#1A1730] px-3 py-2 text-sm text-[#F0EEF8]"
        />
      </div>
      <div className="grid gap-3">
        {filtered.length === 0 ? <p className="text-[#9E9BB8]">Aucun jeu ne correspond à votre recherche.</p> : filtered.map((game) => <GameRow key={game.name} game={game} />)}
      </div>
    </div>
  );
}
