import type { Metadata } from "next";
import { XpClient } from "@/components/XpClient";
import { getMembersXp, XpLastUpdate } from "@/lib/xp";

export const metadata: Metadata = {
  title: "Investissement des membres | Heaven of Dice",
  description:
    "Heures d'investissement des membres de Heaven of Dice : évènements, organisation et gestion de l'association.",
};

export default async function XpPage() {
  const members = await getMembersXp();

  return (
    <section className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Investissement des membres</h1>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="mt-2 text-[#9E9BB8]">
            Le temps passé par chaque membre pour faire vivre l&apos;association
            : animation des évènements, organisation en amont et gestion de
            l&apos;asso.
          </p>
          {XpLastUpdate ? (
            <span className="rounded-full bg-[#3C3489] px-2 py-1 text-xs text-[#AEA9EC]">
              Dernière mise à jour le{" "}
              {XpLastUpdate.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          ) : null}
        </div>
      </div>
      {members.length === 0 ? (
        <p className="text-[#9E9BB8]">
          Les données d&apos;investissement ne sont pas disponibles pour le
          moment.
        </p>
      ) : (
        <XpClient members={members} />
      )}
    </section>
  );
}
