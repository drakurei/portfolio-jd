"use client";

import { useRef } from "react";
import Tilt from "react-parallax-tilt";
import { gsap, useGSAP } from "@/lib/gsap";
import { formatPushed } from "@/lib/github";
import type { GithubRepo } from "@/lib/types";

export default function GithubGrid({ repos }: { repos: GithubRepo[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".repo-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <Tilt
          key={repo.id}
          tiltMaxAngleX={6}
          tiltMaxAngleY={6}
          glareEnable
          glareMaxOpacity={0.12}
          glareColor="#6366f1"
          glarePosition="all"
        >
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-card glass glass-hover flex h-full flex-col p-6"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-mono text-base font-semibold text-foreground">{repo.name}</h3>
              <span className="text-foreground/30">↗</span>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/55">
              {repo.description ?? "—"}
            </p>
            <div className="mt-5 flex items-center gap-4 text-xs text-foreground/40">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo" />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">★ {repo.stargazers_count}</span>
              <span className="flex items-center gap-1">⑂ {repo.forks_count}</span>
              <span className="ml-auto font-mono">maj {formatPushed(repo.pushed_at)}</span>
            </div>
          </a>
        </Tilt>
      ))}
    </div>
  );
}
