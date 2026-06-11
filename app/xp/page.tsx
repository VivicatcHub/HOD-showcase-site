import type { Metadata } from "next";
import { XpClient } from "@/components/XpClient";

export const metadata: Metadata = {
  title: "Investissement des membres | Heaven of Dice",
  description:
    "Heures d'investissement des membres de Heaven of Dice : évènements, organisation et gestion de l'association.",
};

export default function XpPage() {
  return (
    <section className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Investissement des membres</h1>
        <p className="mt-2 text-[#9E9BB8]">
          Le temps passé par chaque membre pour faire vivre l&apos;association
          : animation des évènements, organisation en amont et gestion de
          l&apos;asso.
        </p>
      </div>
      <XpClient />
    </section>
  );
}
