import { GamesClient } from "@/components/GamesClient";
import { getGames } from "@/lib/sheets";

export default async function LudobiblePage() {
  const games = await getGames();

  return (
    <section className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Ludothèque</h1>
        <p className="mt-2 text-[#9E9BB8]">Explorez notre ludobible et trouvez le jeu idéal pour votre table.</p>
      </div>
      <GamesClient games={games} />
    </section>
  );
}
