import type { EventItem } from "@/lib/sheets";

const labels: Record<EventItem["type"], string> = {
  "game night": "Soirée jeux",
  tournament: "Tournoi",
  other: "Autre",
};

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-[#F0EEF8]">{event.title}</h3>
        <span className="rounded-full bg-[#3C3489] px-2 py-1 text-xs text-[#AEA9EC]">{labels[event.type]}</span>
      </div>
      <p className="text-sm text-[#9E9BB8]">{new Date(event.date).toLocaleDateString("fr-FR")} · {event.location}</p>
      <p className="mt-2 text-sm text-[#9E9BB8]">{event.description}</p>
    </article>
  );
}
