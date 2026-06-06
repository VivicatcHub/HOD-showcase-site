import { EventsClient } from "@/components/EventsClient";
import { getAgendaEvents, getEvents } from "@/lib/events";

export default async function EventsPage() {
  const [events, agendaEvents] = await Promise.all([
    getEvents(),
    getAgendaEvents(),
  ]);

  return (
    <section className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Événements</h1>
        <p className="mt-2 text-[#9E9BB8]">
          Toutes les dates à venir de Heaven of Dice.
        </p>
      </div>
      <EventsClient events={events} agendaEvents={agendaEvents} />
    </section>
  );
}
