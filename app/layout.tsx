import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BRAND_BACKGROUND, asset, iosStartupImages } from "@/lib/brand";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Heaven of Dice",
    template: "%s | Heaven of Dice",
  },
  description:
    "Heaven of Dice est le club étudiant de jeux de société du BDE Epitech Lyon, qui organise soirées découvertes, tournois et rencontres conviviales sur le campus.",
  openGraph: {
    title: "Heaven of Dice",
    description:
      "Le club étudiant du BDE Epitech Lyon où stratégie, convivialité et fun se rencontrent.",
    url: SITE_URL,
    siteName: "Heaven of Dice",
    locale: "fr_FR",
    type: "website",
  },
  icons: {
    icon: [
      { url: asset("/favicon.ico"), sizes: "48x48" },
      { url: asset("/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
      { url: asset("/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
    ],
    apple: { url: asset("/apple-touch-icon.png"), sizes: "180x180" },
  },
  manifest: asset("/site.webmanifest"),
  appleWebApp: {
    capable: true,
    title: "HOD",
    startupImage: iosStartupImages,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "7Ay30b06BlAqiUugRSHbKelxi9Rylf-hq9TzRKuwQwY",
  },
};

export const viewport: Viewport = {
  themeColor: BRAND_BACKGROUND,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${lexend.variable} h-full`}>
      <body className="min-h-full bg-[#0D0B1A] text-[#F0EEF8] antialiased">
        <Navbar />
        <main className="scroll-reveal mx-auto w-full max-w-6xl flex-1 px-4 pt-8 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
