"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/lib/events";
import type { EventItem } from "@/lib/events";

export function UpcomingEvents() {
  const [upcoming, setUpcoming] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents().then((events) => {
      const now = new Date();
      setUpcoming(events.filter((e) => new Date(e.date) >= now).slice(0, 3));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid gap-3 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl bg-[#1A1730]" />
        ))}
      </div>
    );
  }

  if (upcoming.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-[#534AB7] p-4 text-[#9E9BB8]">
        Aucun événement à venir pour le moment.
      </p>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {upcoming.map((event, index) => (
        <article
          key={`${event.title}-${event.date}-${index}`}
          className="rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-4"
        >
          <p className="text-xs text-[#9E9BB8]">
            {`Le ${new Date(event.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })} de ${new Date(event.start).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })} à ${new Date(event.end).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </p>
          <h3 className="mt-2 font-semibold">{event.title}</h3>
          <p className="mt-1 text-sm text-[#9E9BB8]">{event.location}</p>
        </article>
      ))}
    </div>
  );
}
