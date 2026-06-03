import Link from "next/link";
import { MemberCard } from "@/components/MemberCard";
import { bureauMembers, caMembers } from "@/data/members";
import { HOD_CONFIG } from "@/lib/config";
import { getEvents } from "@/lib/sheets";

export default async function Home() {
  const events = await getEvents();
  const now = new Date();
  const upcoming = events.filter((event) => new Date(event.date) >= now).slice(0, 3);

  return (
    <div className="space-y-12 pb-12">
      <section className="hero-grain rounded-2xl border border-[#534AB7]/60 bg-[#1A1730] px-6 py-16 text-center">
        <div className="relative z-10 mx-auto max-w-3xl space-y-4">
          <div className="mx-auto w-fit rounded-full border border-[#534AB7] bg-[#0D0B1A]/80 p-4">
            <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-label="Logo dé" role="img">
              <rect x="8" y="8" width="32" height="32" rx="8" fill="#3C3489" stroke="#AEA9EC" strokeWidth="2" />
              <circle cx="18" cy="18" r="2.5" fill="#F3B562" />
              <circle cx="30" cy="24" r="2.5" fill="#F3B562" />
              <circle cx="18" cy="30" r="2.5" fill="#F3B562" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Heaven of Dice</h1>
          <p className="text-lg text-[#AEA9EC]">Le club étudiant où stratégie, convivialité et fun se rencontrent.</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">À propos</h2>
        <p className="max-w-4xl text-[#9E9BB8]">
          Heaven of Dice rassemble les passionnés de jeux de société sur le campus. Nous organisons des soirées découvertes,
          des tournois et des rencontres conviviales tout au long de l&apos;année.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Bureau</h2>
          <div className="grid gap-3">{bureauMembers.map((member) => <MemberCard key={member.name} member={member} />)}</div>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold">Conseil d&apos;Administration</h2>
          <div className="grid gap-3">{caMembers.map((member) => <MemberCard key={member.name} member={member} />)}</div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Événements à venir</h2>
          <Link href="/events" className="text-sm text-[#F3B562] hover:underline">
            Voir tout
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[#534AB7] p-4 text-[#9E9BB8]">
            Aucun événement à venir pour le moment. Mettez à jour la feuille Google Sheets pour les afficher.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            {upcoming.map((event, index) => (
              <article key={`${event.title}-${event.date}-${index}`} className="rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-4">
                <p className="text-xs text-[#9E9BB8]">{new Date(event.date).toLocaleDateString("fr-FR")}</p>
                <h3 className="mt-2 font-semibold">{event.title}</h3>
                <p className="mt-1 text-sm text-[#9E9BB8]">{event.location}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-xl border border-[#F3B562]/50 bg-[#1A1730] p-6 text-center">
        <h2 className="text-2xl font-bold">Prêt·e à lancer les dés ?</h2>
        <p className="mt-2 text-[#9E9BB8]">Inscris-toi à l&apos;association et rejoins notre communauté Discord.</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a href={HOD_CONFIG.registrationFormUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[#F3B562] px-5 py-2 font-semibold text-[#1A1730]">
            Formulaire d&apos;inscription
          </a>
          <a href={HOD_CONFIG.discordUrl} target="_blank" rel="noreferrer" className="rounded-full border border-[#534AB7] px-5 py-2 font-semibold text-[#F0EEF8]">
            Rejoindre Discord
          </a>
        </div>
      </section>
    </div>
  );
}
