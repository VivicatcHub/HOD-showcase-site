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

  return (
    <article className="rounded-xl border border-[#534AB7]/50 bg-[#1A1730] transition hover:border-[#534AB7]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-4 p-4 text-left sm:gap-5 sm:p-5"
        aria-expanded={open}
      >
        <span
          className={`w-10 shrink-0 text-center text-3xl font-extrabold leading-none tabular-nums ${rank <= 3 ? "text-[#AEA9EC]" : "text-[#534AB7]"}`}
        >
          {rank}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-[#F0EEF8]">
            {member.lastName} {member.firstName}
          </h3>
          {member.role ? (
            <p className="truncate text-xs text-[#9E9BB8]">{member.role}</p>
          ) : null}
          <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-[#0D0B1A]">
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
          <p className="text-2xl font-extrabold leading-none tabular-nums text-[#F0EEF8]">
            {formatXP(member.totalMinutes)}
          </p>
          <p className="mt-1 text-xs text-[#9E9BB8]">
            {member.credits} crédit{member.credits > 1 ? "s" : ""}
          </p>
        </div>
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={`shrink-0 text-[#9E9BB8] transition ${open ? "rotate-180" : ""}`}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      <div className="disclosure" data-open={open} inert={!open}>
        <div>
          <div className="border-t border-[#534AB7]/30 px-4 pb-5 pt-4 sm:px-5">
            {member.events.length === 0 ? (
              <p className="text-sm text-[#9E9BB8]">
                Aucun détail d&apos;activité.
              </p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-3">
                {categories.map((category) => {
                  const field =
                    category.key === "event"
                      ? "eventMinutes"
                      : category.key === "prep"
                        ? "prepMinutes"
                        : "manageMinutes";
                  const rows = member.events.filter(
                    (entry) => entry[field] > 0,
                  );
                  return (
                    <div key={category.key}>
                      <div
                        className="flex items-baseline justify-between gap-2 border-b pb-2"
                        style={{ borderColor: category.color }}
                      >
                        <span className="text-sm font-semibold text-[#F0EEF8]">
                          {category.label}
                        </span>
                        <span className="text-sm font-bold tabular-nums text-[#F0EEF8]">
                          {formatMinutes(parts[category.key])}
                        </span>
                      </div>
                      {rows.length === 0 ? (
                        <p className="pt-2 text-xs text-[#9E9BB8]">
                          Rien pour l&apos;instant.
                        </p>
                      ) : (
                        <ul className="pt-1 text-sm">
                          {rows.map((entry, index) => (
                            <li
                              key={`${entry.name}-${index}`}
                              className="flex justify-between gap-2 py-1 text-[#C9C6DD]"
                            >
                              <span className="min-w-0 truncate">
                                {entry.name}
                              </span>
                              <span className="shrink-0 tabular-nums">
                                {formatMinutes(entry[field])}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
