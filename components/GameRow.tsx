import type { GameItem } from "@/lib/sheets";

export function GameRow({ game }: { game: GameItem }) {
  return (
    <article className="rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-[#F0EEF8]">{game.name}</h3>
        <span className={`rounded-full px-2 py-1 text-xs ${game.available ? "bg-emerald-900/50 text-emerald-200" : "bg-zinc-800 text-zinc-300"}`}>
          {game.available ? "Disponible" : "Indisponible"}
        </span>
      </div>
      <p className="mt-2 text-sm text-[#9E9BB8]">
        {game.min_players}–{game.max_players} joueurs · {game.duration_min} min · {game.category}
      </p>
    </article>
  );
}
