import Image from "next/image";
import type { Member } from "@/data/members";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function nameTextSize(name: string) {
  if (name.length > 24) return "text-xs";
  if (name.length > 18) return "text-sm";
  return "text-base";
}

export function MemberNode({ member }: { member: Member }) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-3 shadow-[0_0_16px_rgba(83,74,183,0.15)]">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#3C3489] text-sm font-bold text-[#F0EEF8]">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {initials(member.name)}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p
          className={`break-words font-semibold text-[#F0EEF8] ${nameTextSize(member.name)}`}
        >
          {member.name}
        </p>
        <p className="break-words text-xs text-[#9E9BB8]">{member.role}</p>
      </div>
    </div>
  );
}
