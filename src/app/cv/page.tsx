import type { Metadata } from "next";
import About from "@/components/sections/About";
import SkillsBento from "@/components/sections/SkillsBento";
import Journey from "@/components/sections/Journey";
import Pricing from "@/components/sections/Pricing";
import CvDownloadButton from "@/components/CvDownloadButton";
import CommandLineContact from "@/components/CommandLineContact";
import RevealText from "@/components/RevealText";

export const metadata: Metadata = {
  title: "CV — Jonathan Davy",
  description: "CV interactif de Jonathan Davy : compétences, parcours, certifications. Export PDF.",
};

export default function CvPage() {
  return (
    <main className="grid-bg">
      <section className="px-6 pt-36 pb-4">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">Curriculum Vitae</p>
            <RevealText as="h1" className="display text-6xl font-semibold sm:text-7xl">
              Le <span className="text-gold-deep italic">parcours</span>.
            </RevealText>
          </div>
          <CvDownloadButton />
        </div>
      </section>

      <About />
      <SkillsBento />
      <Journey />

      <section className="px-6 py-20">
        <div className="mx-auto w-full max-w-3xl">
          <p className="eyebrow mb-6">Contact — terminal</p>
          <CommandLineContact />
        </div>
      </section>

      <Pricing />
    </main>
  );
}
