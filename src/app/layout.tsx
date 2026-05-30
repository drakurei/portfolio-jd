import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import FilmGrain from "@/components/FilmGrain";
import ShaderBackground from "@/components/ShaderBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageViewTracker from "@/components/PageViewTracker";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drakurei.github.io/portfolio-jd"),
  title: {
    default: "Jonathan Davy — Développeur Full Stack",
    template: "%s · Jonathan Davy",
  },
  description:
    "Jonathan Davy — développeur full‑stack (sécurité, réseaux, web premium). Sites sur‑mesure, performants et élégants. Évry (91).",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Jonathan Davy — Développeur Full Stack",
    description:
      "Sites web premium sur‑mesure : performance, design émotionnel, architecture full‑stack.",
    siteName: "Jonathan Davy",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ShaderBackground />
        <FilmGrain />
        <CustomCursor />
        <Navbar />
        <PageViewTracker />
        <SmoothScrollProvider>
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
