import type { Metadata } from "next";
import { fetchRepos } from "@/lib/github";
import PortfolioGrid from "@/components/PortfolioGrid";
import GithubGrid from "@/components/sections/GithubGrid";

export const metadata: Metadata = {
  title: "Portfolio — Jonathan Davy",
  description: "Réalisations full-stack, UI/UX et creative de Jonathan Davy, synchronisées avec GitHub.",
};

export default async function PortfolioPage() {
  const { repos, isMock } = await fetchRepos();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-28">
      <p className="eyebrow mb-3">Portfolio complet</p>
      <h1 className="display mb-12 text-6xl font-semibold sm:text-7xl">
        Le <span className="text-gradient italic">travail</span>, en détail.
      </h1>

      <PortfolioGrid />

      <div className="mt-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">GitHub Sync</p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Dépôts <span className="text-gradient">en temps réel</span>
            </h2>
          </div>
          {isMock && (
            <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 font-mono text-xs text-foreground/40">
              démo · configurez NEXT_PUBLIC_GITHUB_USERNAME
            </span>
          )}
        </div>
        <GithubGrid repos={repos} />
      </div>
    </main>
  );
}
