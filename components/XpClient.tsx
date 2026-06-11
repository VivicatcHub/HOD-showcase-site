"use client";

import { useEffect, useMemo, useState } from "react";
import { MemberXpCard } from "@/components/MemberXpCard";
import { formatMinutes, getMembersXp } from "@/lib/xp";
import type { MemberXp } from "@/lib/xp";

type Sort = "hours" | "credits" | "name";

const sorts: { key: Sort; label: string }[] = [
  { key: "hours", label: "Heures" },
  { key: "name", label: "Nom" },
];

export function XpClient() {
  const [members, setMembers] = useState<MemberXp[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("hours");

  useEffect(() => {
    getMembersXp().then(({ members: data, lastUpdate: date }) => {
      setMembers(data);
      setLastUpdate(date);
      setLoading(false);
    });
  }, []);

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

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-[#1A1730]" />
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <p className="text-[#9E9BB8]">
        Les données d&apos;investissement ne sont pas disponibles pour le
        moment.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {lastUpdate && (
        <div className="flex justify-end">
          <span className="rounded-full bg-[#3C3489] px-2 py-1 text-xs text-[#AEA9EC]">
            Dernière mise à jour le{" "}
            {lastUpdate.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      )}
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
