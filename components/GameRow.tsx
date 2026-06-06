import type { GameItem } from "@/lib/games";

export function GameRow({ game }: { game: GameItem }) {
  return (
    <article className="rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-[#F0EEF8]">{game.name}</h3>
        <span className="rounded-full bg-[#3C3489] px-2 py-1 text-xs text-[#AEA9EC]">
          {game.state}
        </span>
      </div>
      <p className="mt-2 text-sm text-[#9E9BB8]">
        Appartenant à {game.category}
        <i>
          {game.notes === "" ? "" : " - Notes : "}
          {game.notes}
        </i>
      </p>
    </article>
  );
}
