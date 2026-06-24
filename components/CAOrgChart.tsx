import {
  bureauLeadership,
  bureauRoles,
  bureauSuppleant,
  poles,
} from "@/data/members";
import { MemberNode } from "@/components/MemberNode";

export function CAOrgChart() {
  const leadership = [
    bureauLeadership.president,
    bureauLeadership.chancelier,
  ].filter((member) => member !== undefined);

  const filledRoles = bureauRoles.filter((slot) => slot.member);
  const filledPoles = poles.filter((pole) => pole.captain);

  return (
    <section className="rounded-2xl border border-[#534AB7]/60 bg-[#1A1730]/40 p-6">
      <h2 className="mb-4 text-2xl font-bold">
        Membres du Conseil d&apos;Administration
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-4">
          <h3 className="mb-3 text-lg font-semibold text-[#F0EEF8]">
            Membres du Bureau
          </h3>

          {leadership.length > 0 && (
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              {leadership.map((member) => (
                <MemberNode key={member.name} member={member} />
              ))}
            </div>
          )}

          <div className="space-y-3">
            {filledRoles.map((slot) => (
              <div key={slot.role}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#9E9BB8]">
                  {slot.role}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <MemberNode member={slot.member!} />
                  {slot.suppleant && <MemberNode member={slot.suppleant} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-4">
          <h3 className="mb-3 text-lg font-semibold text-[#F0EEF8]">
            Gestion des Pôles
          </h3>
          <div className="space-y-3">
            {filledPoles.map((pole) => (
              <div key={pole.name}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#9E9BB8]">
                  {pole.name}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <MemberNode member={pole.captain!} />
                  {pole.suppleant && <MemberNode member={pole.suppleant} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {bureauSuppleant && (
        <div className="mt-6 max-w-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#9E9BB8]">
            Suppléant du Bureau
          </p>
          <MemberNode member={bureauSuppleant} />
        </div>
      )}
    </section>
  );
}
