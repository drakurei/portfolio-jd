import type { GithubRepo } from "@/lib/types";
import { githubMock } from "@/content/github.mock";

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim();

interface GithubApiRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  pushed_at: string;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork: boolean;
}

/**
 * Récupère les dépôts publics. Sans username configuré, ou en cas d'erreur /
 * rate‑limit de l'API GitHub publique, retourne un jeu de données mock pour que
 * l'UI ne casse jamais. Backend‑ready : brancher un token côté serveur plus tard.
 */
export async function fetchRepos(): Promise<{ repos: GithubRepo[]; isMock: boolean }> {
  if (!USERNAME) return { repos: githubMock, isMock: true };

  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=12&sort=pushed`,
      { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 3600 } },
    );
    if (!res.ok) return { repos: githubMock, isMock: true };

    const data = (await res.json()) as GithubApiRepo[];
    const repos: GithubRepo[] = data
      .filter((r) => !r.fork)
      .slice(0, 9)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        language: r.language,
        html_url: r.html_url,
        pushed_at: r.pushed_at,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        topics: r.topics ?? [],
      }));

    return repos.length ? { repos, isMock: false } : { repos: githubMock, isMock: true };
  } catch {
    return { repos: githubMock, isMock: true };
  }
}

export function formatPushed(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fr-FR", { month: "short", year: "numeric" }).format(
      new Date(iso),
    );
  } catch {
    return iso;
  }
}
