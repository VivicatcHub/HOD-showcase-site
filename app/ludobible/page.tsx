import type { Metadata } from "next";
import { GamesClient } from "@/components/GamesClient";

export const metadata: Metadata = {
  title: "Ludothèque",
  description:
    "Explorez la ludothèque de Heaven of Dice et trouvez le jeu de société idéal pour vous et vos amis.",
};

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
