import type { Metadata } from "next";
import { Suspense } from "react";
import { BrandLoader } from "@/components/BrandLogo";
import { MtgDeckDetail } from "@/components/MtgDeckDetail";

export const metadata: Metadata = {
  title: "Deck Magic",
  description:
    "Fiche d'un deck Magic: The Gathering Commander de la ludothèque Heaven of Dice.",
};

export default function MtgDeckPage() {
  return (
    <section className="pb-12">
      <Suspense fallback={<BrandLoader label="Chargement du deck…" />}>
        <MtgDeckDetail />
      </Suspense>
    </section>
  );
}
