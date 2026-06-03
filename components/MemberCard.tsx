import type { Member } from "@/data/members";

export function MemberCard({ member }: { member: Member }) {
  return (
    <article className="rounded-xl border border-[#534AB7]/60 bg-[#1A1730] p-4 shadow-[0_0_24px_rgba(83,74,183,0.2)]">
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#3C3489] text-sm font-bold text-[#F0EEF8]">
        {member.name
          .split(" ")
          .slice(0, 2)
          .map((part) => part[0])
          .join("")}
      </div>
      <h3 className="font-semibold text-[#F0EEF8]">{member.name}</h3>
      <p className="text-sm text-[#9E9BB8]">{member.role}</p>
    </article>
  );
}
