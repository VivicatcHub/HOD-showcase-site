"use client";

import { useEffect, useMemo, useState } from "react";
import { EventCard } from "@/components/EventCard";
import { EventCalendar } from "@/components/EventCalendar";
import { getAgendaEvents, getEvents } from "@/lib/events";
import type { EventItem } from "@/lib/events";

const filters = [
  "all",
  "game day",
  "game night",
  "tournament",
  "other",
] as const;

type View = "list" | "agenda";

export function EventsClient() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [agendaEvents, setAgendaEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [view, setView] = useState<View>("list");

  useEffect(() => {
    Promise.all([getEvents(), getAgendaEvents()]).then(([ev, agenda]) => {
      setEvents(ev);
      setAgendaEvents(agenda);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const source = view === "list" ? events : agendaEvents;
    return filter === "all"
      ? source
      : source.filter((event) => event.type === filter);
  }, [events, agendaEvents, view, filter]);

  if (loading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-xl bg-[#1A1730]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full px-3 py-1 text-sm ${filter === value ? "bg-[#534AB7] text-[#F0EEF8]" : "bg-[#1A1730] text-[#9E9BB8]"}`}
            >
              {value === "all"
                ? "Tous"
                : value === "game night"
                  ? "Soirée jeux"
                  : value == "game day"
                    ? "Journée jeux"
                    : value === "tournament"
                      ? "Tournois"
                      : "Autres"}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-full bg-[#1A1730] p-1">
          {(["list", "agenda"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setView(value)}
              className={`rounded-full px-3 py-1 text-sm transition ${view === value ? "bg-[#534AB7] text-[#F0EEF8]" : "text-[#9E9BB8] hover:text-[#F0EEF8]"}`}
            >
              {value === "list" ? "Liste" : "Agenda"}
            </button>
          ))}
        </div>
      </div>
      {view === "list" ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.length === 0 ? (
            <p className="text-[#9E9BB8]">Aucun événement trouvé.</p>
          ) : (
            filtered.map((event, index) => (
              <EventCard
                key={`${event.title}-${event.date}-${index}`}
                event={event}
              />
            ))
          )}
        </div>
      ) : (
        <EventCalendar events={filtered} />
      )}
    </div>
  );
}
