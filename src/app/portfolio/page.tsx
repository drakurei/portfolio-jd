import type { Metadata } from "next";
import { fetchRepos } from "@/lib/github";
import PortfolioGrid from "@/components/PortfolioGrid";
import GithubGrid from "@/components/sections/GithubGrid";
import RevealText from "@/components/RevealText";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Réalisations full‑stack, UI/UX et créatives de Jonathan Davy, synchronisées avec GitHub.",
};

export default async function PortfolioPage() {
  const { repos, isMock } = await fetchRepos();

  return (
    <main>
      {/* Hero plein écran avec vidéo neo.mp4 en fond + voile clair luxe */}
      <section className="relative flex h-[68vh] min-h-[420px] items-end overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(1.06) contrast(1.1) saturate(1.05)" }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          {/* chemin avec basePath (Next ne préfixe pas les <source> bruts) */}
          <source src="/portfolio-jd/neo.mp4" type="video/mp4" />
        </video>
        {/* Voile léger : la vidéo respire. Dégradé localisé en bas pour la lisibilité du titre. */}
        <div className="absolute inset-0 bg-[#faf8f3]/20" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#faf8f3] via-[#faf8f3]/75 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(191,160,106,0.22),transparent_60%)]" />

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14">
          <p className="eyebrow mb-4">Portfolio complet</p>
          <RevealText as="h1" className="display text-6xl font-semibold sm:text-8xl">
            Le <span className="text-gold-deep italic">travail</span>, en détail.
          </RevealText>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <PortfolioGrid />

        <div className="mt-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">GitHub Sync</p>
              <h2 className="display text-3xl font-semibold sm:text-4xl">
                Dépôts <span className="text-gradient">en temps réel</span>
              </h2>
            </div>
            {isMock && (
              <span className="chip px-4 py-2 font-mono text-xs text-muted">
                démo · configurez NEXT_PUBLIC_GITHUB_USERNAME
              </span>
            )}
          </div>
          <GithubGrid repos={repos} />
        </div>
      </div>
    </main>
  );
}
