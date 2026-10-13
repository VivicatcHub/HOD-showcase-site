import Image from "next/image";
import Link from "next/link";
import { OrgChart } from "@/components/OrgChart";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { HOD_CONFIG } from "@/lib/config";
import logo from "@/public/logo.png";

export default function Home() {
  return (
    <div className="space-y-12 pb-12">
      <section className="hero-grain rounded-2xl border border-[#534AB7]/60 bg-[#1A1730] px-6 py-12 sm:px-12 sm:py-16">
        <div className="relative z-10 flex flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
          <div className="max-w-xl space-y-5 text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              Heaven of Dice
            </h1>
            <p className="text-lg text-[#AEA9EC]">
              Le club étudiant du BDE Epitech Lyon où stratégie, convivialité et
              fun se rencontrent.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href={HOD_CONFIG.registrationFormUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#F3B562] px-6 py-2.5 font-semibold text-[#1A1730] transition hover:brightness-110 active:scale-[0.97]"
              >
                Formulaire d&apos;inscription
              </a>
              <a
                href={HOD_CONFIG.discordUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#534AB7] px-6 py-2.5 font-semibold text-[#F0EEF8] transition hover:bg-[#211D3A] active:scale-[0.97]"
              >
                Rejoindre Discord
              </a>
            </div>
          </div>
          <div className="motion-die relative h-44 w-44 shrink-0 md:h-72 md:w-72">
            <div className="motion-halo absolute inset-0 rounded-full bg-[#9D5CFF] opacity-35 blur-3xl" />
            <Image
              src={logo}
              alt="Logo Heaven of Dice"
              fill
              className="object-contain drop-shadow-[0_0_25px_rgba(157,92,255,0.45)]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">À propos</h2>
        <p className="max-w-4xl text-[#9E9BB8]">
          Heaven of Dice rassemble les passionnés de jeux de société sur le
          campus. Nous organisons des soirées découvertes, des tournois et des
          rencontres conviviales tout au long de l&apos;année.
        </p>
      </section>

      <OrgChart />

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Événements à venir</h2>
          <Link
            href="/events"
            className="text-sm text-[#F3B562] hover:underline"
          >
            Voir tout
          </Link>
        </div>
        <UpcomingEvents />
      </section>

      <section className="rounded-xl border border-[#F3B562]/50 bg-[#1A1730] p-6 text-center">
        <h2 className="text-balance text-xl font-extrabold tracking-tight sm:text-3xl">
          Prêt·e à lancer les dés ?
        </h2>
        <p className="mt-2 text-[#9E9BB8]">
          Inscris-toi au club et rejoins notre communauté Discord.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href={HOD_CONFIG.registrationFormUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#F3B562] px-5 py-2 font-semibold text-[#1A1730] transition hover:brightness-110 active:scale-[0.97]"
          >
            Formulaire d&apos;inscription
          </a>
          <a
            href={HOD_CONFIG.discordUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#534AB7] px-5 py-2 font-semibold text-[#F0EEF8] transition hover:bg-[#211D3A] active:scale-[0.97]"
          >
            Rejoindre Discord
          </a>
        </div>
      </section>
    </div>
  );
}
