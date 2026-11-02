import type { Metadata } from "next";
import { LudoTabs } from "@/components/LudoTabs";
import { MtgDecksClient } from "@/components/MtgDecksClient";

export const metadata: Metadata = {
  title: "Decks Magic",
  description:
    "Les decks Magic: The Gathering Commander de la ludothèque Heaven of Dice, filtrables par couleurs, difficulté et bracket.",
};

export default function MtgDecksPage() {
  return (
    <section className="space-y-6 pb-12">
      <div className="space-y-4">
        <LudoTabs current="/ludobible/magic" />
        <div>
          <h1 className="text-3xl font-bold">Decks Magic</h1>
          <p className="mt-2 text-[#9E9BB8]">
            Les decks Commander de la ludothèque. Filtre par couleurs,
            difficulté ou bracket, puis clique sur un deck pour savoir comment
            il se joue.
          </p>
        </div>
      </div>
      <MtgDecksClient />
    </section>
  );
}
