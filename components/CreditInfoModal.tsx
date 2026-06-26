"use client";

import { useEffect } from "react";

const xpRules = [
  { action: "1h de participation à un évènement", xp: "1 xp" },
  { action: "1h d'organisation d'un évènement", xp: "2 xp" },
  { action: "1h de gestion de l'association", xp: "2 xp" },
];

const walls = [
  {
    label: "Mur 0 (par défaut)",
    condition: "—",
    tek1: "2",
    tek23: "2",
  },
  {
    label: "Mur 1",
    condition: "Organiser un évènement avec au moins 1 autre personne d'Epitech",
    tek1: "3",
    tek23: "4",
  },
  {
    label: "Mur 2",
    condition: "Organiser un évènement avec au moins 1 personne hors IONIS",
    tek1: "4",
    tek23: "6",
  },
];

export function CreditInfoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Calcul des crédits"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-6 text-[#F0EEF8]"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#F3B562]">
            Comment sont calculés les crédits ?
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-full px-2 py-1 text-[#9E9BB8] hover:bg-[#3C3489] hover:text-[#F0EEF8]"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5 text-sm text-[#C9C6DD]">
          <p>
            Les crédits ne sont calculés que pour les membres Epitech inscrits
            à l&apos;association, en <strong className="text-[#F0EEF8]">Tek1</strong>,{" "}
            <strong className="text-[#F0EEF8]">Tek2</strong> ou{" "}
            <strong className="text-[#F0EEF8]">Tek3</strong>.
          </p>

          <ul className="list-disc space-y-1 pl-5 text-[#9E9BB8]">
            <li>Membre non-Epitech ou non-inscrit à l&apos;asso : pas de crédit (Epitech a son propre crédit).</li>
            <li>Bachelor (Bach) : pas encore calculé, peut-être un jour.</li>
          </ul>

          <div>
            <h3 className="mb-2 font-semibold text-[#F0EEF8]">
              1. Gagner de l&apos;XP
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-[#9E9BB8]">
                    <th className="border-b border-[#534AB7]/30 py-1.5 pr-3 font-semibold">
                      Action
                    </th>
                    <th className="border-b border-[#534AB7]/30 py-1.5 pl-3 text-right font-semibold">
                      XP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {xpRules.map((rule) => (
                    <tr key={rule.action} className="border-b border-[#534AB7]/20">
                      <td className="py-1.5 pr-3">{rule.action}</td>
                      <td className="py-1.5 pl-3 text-right text-[#F3B562]">
                        {rule.xp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[#9E9BB8]">
              <strong className="text-[#F0EEF8]">35 xp = 1 crédit.</strong>
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-[#F0EEF8]">
              2. Les murs de limitation
            </h3>
            <p className="mb-2 text-[#9E9BB8]">
              Le nombre de crédits gagnables est limité par défaut, mais ce
              plafond augmente en franchissant des « murs » :
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-[#9E9BB8]">
                    <th className="border-b border-[#534AB7]/30 py-1.5 pr-3 font-semibold">
                      Mur
                    </th>
                    <th className="border-b border-[#534AB7]/30 py-1.5 px-3 font-semibold">
                      Condition pour le faire tomber
                    </th>
                    <th className="border-b border-[#534AB7]/30 py-1.5 px-3 text-right font-semibold">
                      Plafond Tek1
                    </th>
                    <th className="border-b border-[#534AB7]/30 py-1.5 pl-3 text-right font-semibold">
                      Plafond Tek2/Tek3
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {walls.map((wall) => (
                    <tr key={wall.label} className="border-b border-[#534AB7]/20">
                      <td className="py-1.5 pr-3 font-medium text-[#F0EEF8]">
                        {wall.label}
                      </td>
                      <td className="py-1.5 px-3 text-[#9E9BB8]">
                        {wall.condition}
                      </td>
                      <td className="py-1.5 px-3 text-right text-[#F3B562]">
                        {wall.tek1}
                      </td>
                      <td className="py-1.5 pl-3 text-right text-[#F3B562]">
                        {wall.tek23}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-[#9E9BB8]">
              Chaque mur franchi reste tombé : le plafond ne redescend jamais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
