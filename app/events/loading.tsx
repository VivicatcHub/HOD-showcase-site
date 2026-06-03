export default function EventsLoading() {
  return (
    <section className="space-y-4 pb-12">
      <div className="h-8 w-48 animate-pulse rounded bg-[#1A1730]" />
      <div className="h-4 w-80 animate-pulse rounded bg-[#1A1730]" />
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-xl bg-[#1A1730]" />
        ))}
      </div>
    </section>
  );
}
