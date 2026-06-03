"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/EventCard";
import type { EventItem } from "@/lib/sheets";

const filters = ["all", "game night", "tournament", "other"] as const;

export function EventsClient({ events }: { events: EventItem[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");

  const filtered = useMemo(
    () => (filter === "all" ? events : events.filter((event) => event.type === filter)),
    [events, filter],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-full px-3 py-1 text-sm ${filter === value ? "bg-[#534AB7] text-[#F0EEF8]" : "bg-[#1A1730] text-[#9E9BB8]"}`}
          >
            {value === "all" ? "Tous" : value === "game night" ? "Soirée jeux" : value === "tournament" ? "Tournois" : "Autres"}
          </button>
        ))}
      </div>
      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <p className="text-[#9E9BB8]">Aucun événement trouvé.</p>
        ) : (
          filtered.map((event, index) => <EventCard key={`${event.title}-${event.date}-${index}`} event={event} />)
        )}
      </div>
    </div>
  );
}
