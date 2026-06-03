import { HOD_CONFIG } from "@/lib/config";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 pb-12 text-center">
      <h1 className="text-3xl font-bold">Contact & Inscription</h1>
      <p className="text-[#9E9BB8]">
        Une question ? Écrivez-nous à <a href={`mailto:${HOD_CONFIG.contactEmail}`} className="text-[#F3B562] hover:underline">{HOD_CONFIG.contactEmail}</a>
      </p>

      <a
        href={HOD_CONFIG.discordUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block rounded-full bg-[#534AB7] px-6 py-3 font-semibold text-[#F0EEF8]"
      >
        Rejoindre le Discord
      </a>

      <div className="overflow-hidden rounded-xl border border-[#534AB7]/60">
        <iframe
          src={HOD_CONFIG.registrationFormUrl}
          title="Formulaire d'inscription HOD"
          className="h-[720px] w-full bg-white"
        />
      </div>
    </section>
  );
}
