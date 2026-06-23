"use client";

import { useState } from "react";
import { formatMinutes, formatXP, type MemberXp } from "@/lib/xp";

const categories = [
  { key: "event", label: "Évènements", color: "#F3B562" },
  { key: "prep", label: "Organisation", color: "#7C6FE0" },
  { key: "manage", label: "Gestion", color: "#4FB5A5" },
] as const;

export function MemberXpCard({
  member,
  rank,
}: {
  member: MemberXp;
  rank: number;
}) {
  const [open, setOpen] = useState(false);

  const parts = {
    event: member.totalEventMinutes,
    prep: member.totalPrepMinutes,
    manage: member.totalManageMinutes,
  };
  const barTotal = parts.event + parts.prep + parts.manage || 1;

  const medal =
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;

  return (
    <article className="rounded-xl border border-[#534AB7]/50 bg-[#1A1730] transition hover:border-[#534AB7]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-4 p-4 text-left"
        aria-expanded={open}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3C3489] text-sm font-bold text-[#AEA9EC]">
          {medal ?? rank}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h3 className="font-semibold text-[#F0EEF8]">
              {member.lastName} {member.firstName}
            </h3>
            {member.role ? (
              <span className="text-xs text-[#9E9BB8]">· {member.role}</span>
            ) : null}
          </div>
          <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-[#0D0B1A]">
            {categories.map((category) => {
              const value = parts[category.key];
              if (!value) return null;
              return (
                <span
                  key={category.key}
                  style={{
                    width: `${(value / barTotal) * 100}%`,
                    backgroundColor: category.color,
                  }}
                  title={`${category.label} : ${formatMinutes(value)}`}
                />
              );
            })}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-lg font-bold text-[#F3B562]">
            {formatXP(member.totalMinutes)}
          </p>
          <p className="text-xs text-[#9E9BB8]">
            {member.credits} crédit{member.credits > 1 ? "s" : ""}
          </p>
        </div>
        <span
          className={`shrink-0 text-[#9E9BB8] transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {open ? (
        <div className="border-t border-[#534AB7]/30 px-4 pb-4 pt-3">
          <div className="mb-3 flex flex-wrap gap-3 text-xs">
            {categories.map((category) => (
              <span key={category.key} className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {category.label} : {formatMinutes(parts[category.key])}
              </span>
            ))}
          </div>

          {member.events.length === 0 ? (
            <p className="text-sm text-[#9E9BB8]">
              Aucun détail d&apos;activité.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-[#9E9BB8]">
                    <th className="py-1.5 pr-3 font-semibold">Activité</th>
                    <th className="py-1.5 px-2 text-right font-semibold">
                      Évènement
                    </th>
                    <th className="py-1.5 px-2 text-right font-semibold">
                      Amont
                    </th>
                    <th className="py-1.5 pl-2 text-right font-semibold">
                      Gestion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {member.events.map((entry, index) => (
                    <tr
                      key={`${entry.name}-${index}`}
                      className="border-t border-[#534AB7]/20 text-[#C9C6DD]"
                    >
                      <td className="py-1.5 pr-3">{entry.name}</td>
                      <td className="py-1.5 px-2 text-right">
                        {entry.eventMinutes
                          ? formatMinutes(entry.eventMinutes)
                          : "—"}
                      </td>
                      <td className="py-1.5 px-2 text-right">
                        {entry.prepMinutes
                          ? formatMinutes(entry.prepMinutes)
                          : "—"}
                      </td>
                      <td className="py-1.5 pl-2 text-right">
                        {entry.manageMinutes
                          ? formatMinutes(entry.manageMinutes)
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : null}
    </article>
  );
}
