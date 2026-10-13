import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <section className="relative isolate flex flex-col items-center gap-6 py-16 text-center sm:py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(closest-side,rgba(180,12,252,0.22),transparent)]"
      />
      <BrandLogo
        size="lg"
        priority
        className="motion-die h-36 w-36 drop-shadow-[0_0_30px_rgba(228,132,252,0.5)] sm:h-44 sm:w-44"
      />
      <p className="bg-gradient-to-b from-[#E484FC] via-[#B40CFC] to-[#6C249C] bg-clip-text text-8xl font-extrabold leading-none tracking-tight text-transparent sm:text-9xl">
        404
      </p>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Ce dé a roulé hors du plateau</h1>
        <p className="max-w-md text-[#9E9BB8]">
          La page que tu cherches n&apos;existe pas ou a été déplacée.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-full bg-[#F3B562] px-6 py-2.5 font-semibold text-[#1A1730] transition hover:brightness-110 active:scale-[0.97]"
      >
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
