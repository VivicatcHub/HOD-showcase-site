import { GamesClient } from "@/components/GamesClient";
import { getGames, GamesLastUpdate } from "@/lib/games";

export default async function LudobiblePage() {
  const games = await getGames();

  return (
    <section className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Ludothèque</h1>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="mt-2 text-[#9E9BB8]">
            Explorez notre ludothèque et trouvez le jeu idéal pour vous et vos
            amis.
          </p>
          <span className="rounded-full bg-[#3C3489] px-2 py-1 text-xs text-[#AEA9EC]">
            Dernière mise à jour le{" "}
            {GamesLastUpdate.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <GamesClient games={games} />
    </section>
  );
}
