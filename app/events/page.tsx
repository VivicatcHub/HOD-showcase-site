import type { Metadata } from "next";
import { EventsClient } from "@/components/EventsClient";

export const metadata: Metadata = {
  title: "Événements",
  description:
    "Retrouvez toutes les dates à venir des soirées et tournois organisés par Heaven of Dice.",
};

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
