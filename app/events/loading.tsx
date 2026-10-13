import { BrandLoader } from "@/components/BrandLogo";

export default function EventsLoading() {
  return (
    <section className="pb-12">
      <BrandLoader label="Chargement des événements…" />
    </section>
  );
}
