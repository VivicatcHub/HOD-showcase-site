import { EventsClient } from "@/components/EventsClient";
import { getEvents } from "@/lib/sheets";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <section className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Événements</h1>
        <p className="mt-2 text-[#9E9BB8]">Toutes les dates à venir et passées de Heaven of Dice.</p>
      </div>
      <EventsClient events={events} />
    </section>
  );
}
