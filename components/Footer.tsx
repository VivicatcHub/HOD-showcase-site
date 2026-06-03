import Link from "next/link";
import { HOD_CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#534AB7]/40 bg-[#0D0B1A]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-[#9E9BB8] sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} Heaven of Dice</p>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hover:text-[#F0EEF8]">
            Rejoindre l&apos;association
          </Link>
          <a href={HOD_CONFIG.discordUrl} target="_blank" rel="noreferrer" className="hover:text-[#F0EEF8]">
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
}
