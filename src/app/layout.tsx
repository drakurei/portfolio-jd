import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import FilmGrain from "@/components/FilmGrain";
import ShaderBackground from "@/components/ShaderBackground";
import Sidebar from "@/components/Sidebar";
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
  title: "Jonathan Davy — Développeur Full Stack",
  description:
    "Portfolio de Jonathan Davy : développement full‑stack, cybersécurité et réseaux. Réalisations, audit stratégique et demande d'expertise.",
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
        <Sidebar />
        <PageViewTracker />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
