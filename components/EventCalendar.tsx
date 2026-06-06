"use client";

import { useMemo, useState } from "react";
import type { EventItem } from "@/lib/events";

const typeStyles: Record<
  EventItem["type"],
  { chip: string; dot: string; label: string }
> = {
  "game day": {
    chip: "bg-[#F3B562]/15 text-[#F3B562] border border-[#F3B562]/40",
    dot: "bg-[#F3B562]",
    label: "Journée jeux",
  },
  "game night": {
    chip: "bg-[#534AB7]/25 text-[#AEA9EC] border border-[#534AB7]/50",
    dot: "bg-[#7C6FE0]",
    label: "Soirée jeux",
  },
  tournament: {
    chip: "bg-[#E8617D]/15 text-[#F2A6B6] border border-[#E8617D]/40",
    dot: "bg-[#E8617D]",
    label: "Tournoi",
  },
  other: {
    chip: "bg-[#4FB5A5]/15 text-[#7FD8CA] border border-[#4FB5A5]/40",
    dot: "bg-[#4FB5A5]",
    label: "Autre",
  },
};

const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function dayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function formatTime(value: string) {
  if (!value) return "";
  return new Date(value).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function EventCalendar({ events }: { events: EventItem[] }) {
  const [cursor, setCursor] = useState(() => {
    const base = events[0] ? new Date(events[0].date) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [selected, setSelected] = useState<EventItem | null>(null);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const event of events) {
      if (!event.date) continue;
      const key = dayKey(new Date(event.date));
      const list = map.get(key);
      if (list) list.push(event);
      else map.set(key, [event]);
    }
    for (const list of map.values()) {
      list.sort((a, b) => +new Date(a.start) - +new Date(b.start));
    }
    return map;
  }, [events]);

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const total = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

    return Array.from({ length: total }, (_, i) => {
      const dayNumber = i - firstWeekday + 1;
      const inMonth = dayNumber >= 1 && dayNumber <= daysInMonth;
      const date = new Date(year, month, dayNumber);
      return { date, inMonth };
    });
  }, [cursor]);

  const todayKey = dayKey(new Date());

  const monthLabel = cursor.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const shiftMonth = (delta: number) =>
    setCursor(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1),
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          className="rounded-full border border-[#534AB7]/50 px-3 py-1 text-sm text-[#F0EEF8] transition hover:bg-[#1A1730]"
          aria-label="Mois précédent"
        >
          ‹
        </button>
        <h2 className="text-lg font-semibold capitalize text-[#F0EEF8]">
          {monthLabel}
        </h2>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="rounded-full border border-[#534AB7]/50 px-3 py-1 text-sm text-[#F0EEF8] transition hover:bg-[#1A1730]"
          aria-label="Mois suivant"
        >
          ›
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#534AB7]/50 bg-[#1A1730]">
        <div className="grid grid-cols-7 border-b border-[#534AB7]/40">
          {weekdays.map((day) => (
            <div
              key={day}
              className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-[#9E9BB8]"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map(({ date, inMonth }, index) => {
            const key = dayKey(date);
            const dayEvents = inMonth ? (eventsByDay.get(key) ?? []) : [];
            const isToday = key === todayKey;
            return (
              <div
                key={index}
                className={`min-h-24 border-b border-r border-[#534AB7]/20 p-1.5 last:border-r-0 ${
                  inMonth ? "" : "bg-[#0D0B1A]/40"
                }`}
              >
                <div
                  className={`mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    isToday
                      ? "bg-[#534AB7] font-bold text-[#F0EEF8]"
                      : inMonth
                        ? "text-[#9E9BB8]"
                        : "text-[#9E9BB8]/40"
                  }`}
                >
                  {date.getDate()}
                </div>
                <div className="space-y-1">
                  {dayEvents.map((event, i) => (
                    <button
                      key={`${event.title}-${i}`}
                      type="button"
                      onClick={() => setSelected(event)}
                      className={`flex w-full items-center gap-1 truncate rounded px-1.5 py-0.5 text-left text-[11px] leading-tight transition hover:brightness-125 ${typeStyles[event.type].chip}`}
                      title={event.title}
                    >
                      <span className="hidden sm:inline">
                        {formatTime(event.start)}
                      </span>
                      <span className="truncate">{event.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-[#9E9BB8]">
        {(Object.keys(typeStyles) as EventItem["type"][]).map((type) => (
          <span key={type} className="flex items-center gap-1.5">
            <span
              className={`h-2.5 w-2.5 rounded-full ${typeStyles[type].dot}`}
            />
            {typeStyles[type].label}
          </span>
        ))}
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0B1A]/80 p-4 backdrop-blur"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <article
            className="w-full max-w-md rounded-xl border border-[#534AB7]/60 bg-[#1A1730] p-5 shadow-[0_0_40px_rgba(83,74,183,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-[#F0EEF8]">
                {selected.title}
              </h3>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full px-2 text-[#9E9BB8] transition hover:text-[#F0EEF8]"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>
            <span
              className={`inline-block rounded-full px-2 py-1 text-xs ${typeStyles[selected.type].chip}`}
            >
              {typeStyles[selected.type].label}
            </span>
            <p className="mt-3 text-sm text-[#9E9BB8]">
              {`Le ${new Date(selected.date).toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}`}
              {selected.start
                ? ` de ${formatTime(selected.start)} à ${formatTime(selected.end)}`
                : ""}
            </p>
            <p className="mt-1 text-sm text-[#9E9BB8]">
              📍 {selected.location}
            </p>
            {selected.description ? (
              <p className="mt-3 whitespace-pre-line text-sm text-[#9E9BB8]">
                {selected.description}
              </p>
            ) : null}
          </article>
        </div>
      ) : null}
    </div>
  );
}
