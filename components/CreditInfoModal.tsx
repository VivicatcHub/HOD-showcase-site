"use client";

import { useEffect, useRef } from "react";

const xpRules = [
  { action: "1h de participation à un évènement", xp: 1 },
  { action: "1h d'organisation d'un évènement", xp: 2 },
  { action: "1h de gestion du club", xp: 2 },
];

const walls = [
  {
    label: "Mur 0 (par défaut)",
    condition: null,
    tek1: 2,
    tek23: 2,
  },
  {
    label: "Mur 1",
    condition:
      "Organiser un évènement avec au moins 1 autre personne d'Epitech",
    tek1: 3,
    tek23: 4,
  },
  {
    label: "Mur 2",
    condition: "Organiser un évènement avec au moins 1 personne hors IONIS",
    tek1: 4,
    tek23: 6,
  },
];

const maxCeiling = Math.max(...walls.map((wall) => wall.tek23));

function StepHeading({ step, children }: { step: number; children: string }) {
  return (
    <h3 className="mb-3 flex items-center gap-2.5 font-semibold text-[#F0EEF8]">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3C3489] text-xs font-bold text-[#AEA9EC]">
        {step}
      </span>
      {children}
    </h3>
  );
}

function Ceiling({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 text-xs text-[#9E9BB8]">{label}</span>
      <span className="flex gap-1" aria-hidden>
        {Array.from({ length: maxCeiling }, (_, i) => (
          <span
            key={i}
            className={`h-2.5 w-2.5 rounded-full ${i < value ? "bg-[#AEA9EC]" : "border border-[#534AB7]/60"}`}
          />
        ))}
      </span>
      <span className="text-sm font-semibold tabular-nums text-[#F0EEF8]">
        {value} crédit{value > 1 ? "s" : ""}
      </span>
    </div>
  );
}

export function CreditInfoModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="motion-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="credit-info-title"
        onClick={(event) => event.stopPropagation()}
        className="motion-panel max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-[#534AB7]/60 bg-[#1A1730] text-[#F0EEF8] shadow-[0_0_40px_rgba(83,74,183,0.3)] sm:max-h-[85vh] sm:rounded-2xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#534AB7]/30 bg-[#1A1730]/95 px-6 py-4 backdrop-blur sm:px-8">
          <h2 id="credit-info-title" className="text-xl font-bold">
            Comment sont calculés les crédits ?
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#9E9BB8] transition hover:bg-[#3C3489] hover:text-[#F0EEF8] active:scale-95"
          >
            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        <div className="space-y-8 px-6 pb-8 pt-6 text-sm text-[#C9C6DD] sm:px-8">
          <div className="rounded-xl border border-[#534AB7]/40 bg-[#0D0B1A]/40 p-4">
            <p>
              Les crédits ne sont calculés que pour les membres Epitech inscrits
              au club, en <strong className="text-[#F0EEF8]">Tek1</strong>,{" "}
              <strong className="text-[#F0EEF8]">Tek2</strong> ou{" "}
              <strong className="text-[#F0EEF8]">Tek3</strong>.
            </p>
            <ul className="mt-3 space-y-1.5 text-[#9E9BB8]">
              <li className="flex gap-2">
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#534AB7]"
                />
                Membre non-Epitech ou non-inscrit au club : pas de crédit
                (Epitech a son propre crédit).
              </li>
              <li className="flex gap-2">
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#534AB7]"
                />
                Bachelor (Bach) : pas encore calculé, peut-être un jour.
              </li>
            </ul>
          </div>

          <section>
            <StepHeading step={1}>Gagner de l&apos;XP</StepHeading>
            <ul className="grid gap-2 sm:grid-cols-3">
              {xpRules.map((rule) => (
                <li
                  key={rule.action}
                  className="rounded-xl border border-[#534AB7]/40 bg-[#0D0B1A]/40 p-4"
                >
                  <p className="text-2xl font-extrabold tabular-nums text-[#F0EEF8]">
                    {rule.xp} xp
                  </p>
                  <p className="mt-1 text-xs leading-snug text-[#9E9BB8]">
                    {rule.action}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-xl bg-[#3C3489]/50 px-4 py-2.5 text-center font-semibold text-[#F0EEF8]">
              35 xp = 1 crédit.
            </p>
          </section>

          <section>
            <StepHeading step={2}>Les murs de limitation</StepHeading>
            <p className="mb-4 text-[#9E9BB8]">
              Le nombre de crédits gagnables est limité par défaut, mais ce
              plafond augmente en franchissant des « murs » :
            </p>
            <ol className="relative space-y-5 border-l border-[#534AB7]/40 pl-5">
              {walls.map((wall) => (
                <li key={wall.label} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-[#AEA9EC] ring-4 ring-[#1A1730]"
                  />
                  <p className="font-semibold text-[#F0EEF8]">{wall.label}</p>
                  {wall.condition ? (
                    <p className="mt-0.5 text-[#9E9BB8]">
                      Pour le faire tomber : {wall.condition}
                    </p>
                  ) : null}
                  <div className="mt-2.5 space-y-1.5">
                    <Ceiling label="Tek1" value={wall.tek1} />
                    <Ceiling label="Tek2/Tek3" value={wall.tek23} />
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-[#9E9BB8]">
              Chaque mur franchi reste tombé : le plafond ne redescend jamais.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
