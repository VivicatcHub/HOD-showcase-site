import type { GameItem } from "@/lib/games";

export function GameRow({ game }: { game: GameItem }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[#534AB7]/50 bg-[#1A1730] transition hover:border-[#534AB7]">
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug text-[#F0EEF8]">
            {game.name}
          </h3>
          <p className="mt-1 text-xs text-[#9E9BB8]">
            Appartenant à {game.category}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${["Mauvais", "Perdu", "Inconnu"].includes(game.state) ? "border-[#534AB7]/50 text-[#9E9BB8]" : "border-[#AEA9EC]/60 text-[#AEA9EC]"}`}
        >
          {game.state}
        </span>
      </div>
      {game.notes ? (
        <p className="mt-auto border-t border-[#534AB7]/30 bg-[#0D0B1A]/40 px-4 py-2 text-xs text-[#C9C6DD]">
          {game.notes}
        </p>
      ) : null}
    </article>
  );
}
