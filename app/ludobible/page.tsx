import { GamesClient } from "@/components/GamesClient";

export default function LudobiblePage() {
  return (
    <section className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Ludothèque</h1>
        <p className="mt-2 text-[#9E9BB8]">
          Explorez notre ludothèque et trouvez le jeu idéal pour vous et vos
          amis.
        </p>
      </div>
      <GamesClient />
    </section>
  );
}
