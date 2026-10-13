import { poles, president } from "@/data/members";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function OrgChart() {
  const filledPoles = poles.filter((pole) => pole.captain);

  return (
    <section className="rounded-2xl border border-[#534AB7]/60 bg-[#1A1730]/40 p-6 sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="text-2xl font-bold">L&apos;équipe du club</h2>
        {president && (
          <div className="flex items-center gap-4 rounded-2xl border border-[#534AB7] bg-[#1A1730] px-5 py-4 shadow-[0_0_40px_rgba(83,74,183,0.3)] md:min-w-80">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#534AB7] text-lg font-extrabold text-[#F0EEF8]">
              {initials(president.name)}
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-[#F0EEF8]">
                {president.name}
              </p>
              <p className="text-sm text-[#AEA9EC]">{president.role} du club</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {filledPoles.map((pole) => (
          <div
            key={pole.name}
            className="flex flex-col rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-5 transition hover:border-[#534AB7] hover:bg-[#211D3A]"
          >
            <p className="text-lg font-semibold leading-snug text-[#F0EEF8]">
              {pole.name}
            </p>
            <div className="mt-4 space-y-3 border-t border-[#534AB7]/30 pt-4">
              {[pole.captain, pole.suppleant].map(
                (member) =>
                  member && (
                    <div
                      key={member.name}
                      className="flex items-baseline justify-between gap-3"
                    >
                      <span className="min-w-0 break-words text-sm font-semibold text-[#F0EEF8]">
                        {member.name}
                      </span>
                      <span className="shrink-0 rounded-full bg-[#3C3489] px-2 py-0.5 text-xs text-[#AEA9EC]">
                        {member.role}
                      </span>
                    </div>
                  ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
