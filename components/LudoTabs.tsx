import Link from "next/link";

const tabs = [
  { href: "/ludobible", label: "Jeux de société" },
  { href: "/ludobible/magic", label: "Decks Magic" },
];

export function LudoTabs({ current }: { current: string }) {
  return (
    <nav aria-label="Rayons de la ludothèque">
      <ul className="inline-flex gap-1 rounded-full border border-[#534AB7]/50 bg-[#1A1730] p-1 text-sm">
        {tabs.map((tab) => {
          const active = tab.href === current;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-full px-4 py-1.5 transition ${active ? "bg-[#3C3489] font-semibold text-[#F0EEF8]" : "text-[#9E9BB8] hover:text-[#AEA9EC]"}`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
