import type { Metadata } from "next";
import { HOD_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact & Inscription",
  description:
    "Rejoignez Heaven of Dice : formulaire d'inscription, contact par email et lien vers notre serveur Discord.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-10 pb-12">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold">Contact &amp; Inscription</h1>
        <p className="mx-auto max-w-xl text-[#9E9BB8]">
          Envie de nous rejoindre ou une simple question ? Remplissez le
          formulaire ci-dessous, écrivez-nous, ou faites un tour sur notre
          Discord.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${HOD_CONFIG.contactEmail}`}
          className="group flex items-center gap-4 rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-5 transition hover:border-[#534AB7] hover:bg-[#211D3A]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3C3489] text-lg">
            ✉️
          </span>
          <span className="min-w-0">
            <span className="block text-sm text-[#9E9BB8]">Email</span>
            <span className="block truncate font-semibold text-[#F0EEF8] transition group-hover:text-[#F3B562]">
              {HOD_CONFIG.contactEmail}
            </span>
          </span>
        </a>

        <a
          href={HOD_CONFIG.discordUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-4 rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-5 transition hover:border-[#534AB7] hover:bg-[#211D3A]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3C3489] text-lg">
            💬
          </span>
          <span className="min-w-0">
            <span className="block text-sm text-[#9E9BB8]">Discord</span>
            <span className="block truncate font-semibold text-[#F0EEF8] transition group-hover:text-[#AEA9EC]">
              Rejoindre la communauté
            </span>
          </span>
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#534AB7]/50 bg-[#1A1730] shadow-[0_0_40px_rgba(83,74,183,0.25)]">
        <div className="flex items-center justify-between gap-3 border-b border-[#534AB7]/40 px-5 py-4">
          <div className="flex items-center gap-2">
            <span aria-hidden className="text-[#F3B562]">
              📝
            </span>
            <h2 className="font-semibold text-[#F0EEF8]">
              Formulaire d&apos;inscription
            </h2>
          </div>
          <a
            href={HOD_CONFIG.registrationFormUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#AEA9EC] transition hover:text-[#F0EEF8]"
          >
            Ouvrir dans un onglet ↗
          </a>
        </div>
        <div className="bg-white p-2 sm:p-4">
          <iframe
            src={HOD_CONFIG.registrationFormUrl}
            title="Formulaire d'inscription HOD"
            className="h-[760px] w-full rounded-lg"
          >
            Chargement du formulaire…
          </iframe>
        </div>
      </div>
    </section>
  );
}
