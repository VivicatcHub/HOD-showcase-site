import { EventsClient } from "@/components/EventsClient";

export default function EventsPage() {
  return (
    <section className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Événements</h1>
        <p className="mt-2 text-[#9E9BB8]">
          Toutes les dates à venir de Heaven of Dice.
        </p>
      </div>
      <EventsClient />
    </section>
  );
}
