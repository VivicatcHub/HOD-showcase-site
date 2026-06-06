"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/ca", label: "C.A." },
  { href: "/events", label: "Événements" },
  { href: "/ludobible", label: "Ludothèque" },
  { href: "/xp", label: "Investissement" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#534AB7]/50 bg-[#0D0B1A]/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-bold tracking-wide text-[#F0EEF8]"
        >
          <span aria-hidden className="text-[#F3B562]">
            🎲
          </span>
          Heaven of Dice
        </Link>
        <button
          type="button"
          className="rounded border border-[#534AB7] px-3 py-1 text-sm text-[#F0EEF8] md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Ouvrir le menu"
        >
          Menu
        </button>
        <ul className="hidden items-center gap-5 text-sm text-[#F0EEF8] md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition hover:text-[#AEA9EC]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {open ? (
        <ul className="space-y-2 border-t border-[#534AB7]/50 px-4 py-3 text-sm text-[#F0EEF8] md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded px-2 py-1 hover:bg-[#1A1730]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
