import type { GithubRepo } from "@/lib/types";

// Fallback affiché quand NEXT_PUBLIC_GITHUB_USERNAME est vide ou que l'API
// GitHub est indisponible / rate‑limitée. Remplacé par les vrais repos dès
// qu'un username valide est fourni.
export const githubMock: GithubRepo[] = [
  {
    id: 1,
    name: "facial-access-control",
    description:
      "Contrôle d'accès temps réel par reconnaissance faciale (Raspberry Pi + OpenCV).",
    language: "Python",
    languages: ["Python", "Shell"],
    html_url: "https://github.com",
    pushed_at: "2025-04-12T10:00:00Z",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["opencv", "raspberry-pi", "security"],
  },
  {
    id: 2,
    name: "portfolio-JD",
    description: "Portfolio full‑stack immersif — Next.js, GSAP, Lenis.",
    language: "TypeScript",
    languages: ["TypeScript", "CSS"],
    html_url: "https://github.com",
    pushed_at: "2026-05-29T09:00:00Z",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["nextjs", "gsap", "tailwind"],
  },
  {
    id: 3,
    name: "network-toolkit",
    description: "Utilitaires réseau (scan, adressage, diagnostic TCP/IP).",
    language: "Python",
    languages: ["Python"],
    html_url: "https://github.com",
    pushed_at: "2025-11-03T14:00:00Z",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["networking", "tcp-ip"],
  },
];
