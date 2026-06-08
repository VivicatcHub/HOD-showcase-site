"use client";

import { useMemo, useState } from "react";
import { MemberXpCard } from "@/components/MemberXpCard";
import { formatMinutes, type MemberXp } from "@/lib/xp";

type Sort = "hours" | "credits" | "name";

const sorts: { key: Sort; label: string }[] = [
  { key: "hours", label: "Heures" },
  { key: "name", label: "Nom" },
];

export function XpClient({ members }: { members: MemberXp[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("hours");

  const totals = useMemo(() => {
    const minutes = members.reduce((sum, m) => sum + m.totalMinutes, 0);
    const events = members.reduce((sum, m) => sum + m.events.length, 0);
    return { minutes, events };
  }, [members]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = members.filter((member) =>
      `${member.firstName} ${member.lastName} ${member.role}`
        .toLowerCase()
        .includes(q),
    );

    const sorted = [...list];
    if (sort === "hours") {
      sorted.sort((a, b) => b.totalMinutes - a.totalMinutes);
    } else if (sort === "credits") {
      sorted.sort((a, b) => b.credits - a.credits);
    } else {
      sorted.sort((a, b) =>
        `${a.lastName} ${a.firstName}`.localeCompare(
          `${b.lastName} ${b.firstName}`,
          "fr",
        ),
      );
    }
    return sorted;
  }, [members, query, sort]);

  /** Rank by hours regardless of the active sort, so medals stay meaningful. */
  const rankByMember = useMemo(() => {
    const ordered = [...members].sort(
      (a, b) => b.totalMinutes - a.totalMinutes,
    );
    const map = new Map<MemberXp, number>();
    ordered.forEach((member, index) => map.set(member, index + 1));
    return map;
  }, [members]);

  const stats = [
    { label: "Membres", value: String(members.length) },
    { label: "Heures cumulées", value: formatMinutes(totals.minutes) },
    { label: "Activités enregistrées", value: String(totals.events) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#534AB7]/40 bg-[#1A1730] p-4 text-center"
          >
            <p className="text-2xl font-bold text-[#F3B562]">{stat.value}</p>
            <p className="text-xs uppercase tracking-wide text-[#9E9BB8]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          type="search"
          placeholder="Rechercher un membre"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full max-w-xs rounded-lg border border-[#534AB7] bg-[#1A1730] px-3 py-2 text-sm text-[#F0EEF8]"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#9E9BB8]">Trier&nbsp;:</span>
          <div className="flex gap-1 rounded-full bg-[#1A1730] p-1">
            {sorts.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setSort(option.key)}
                className={`rounded-full px-3 py-1 text-sm transition ${sort === option.key ? "bg-[#534AB7] text-[#F0EEF8]" : "text-[#9E9BB8] hover:text-[#F0EEF8]"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-[#9E9BB8]">Aucun membre trouvé.</p>
        ) : (
          filtered.map((member) => (
            <MemberXpCard
              key={`${member.lastName}-${member.firstName}`}
              member={member}
              rank={rankByMember.get(member) ?? 0}
            />
          ))
        )}
      </div>
    </div>
  );
}
