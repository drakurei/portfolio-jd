"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects, CATEGORIES } from "@/content/projects";
import type { ProjectCategory } from "@/lib/types";
import ProjectCover from "@/components/ProjectCover";

type Filter = ProjectCategory | "Tous";

export default function PortfolioGrid() {
  const root = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("Tous");
  const filters: Filter[] = ["Tous", ...CATEGORIES];
  const shown = filter === "Tous" ? projects : projects.filter((p) => p.category === filter);

  useGSAP(
    () => {
      gsap.from(".pf-row", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root, dependencies: [filter] },
  );

  return (
    <div ref={root}>
      <div className="mb-14 flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              filter === f
                ? "border-gold bg-gold text-white"
                : "border-foreground/15 text-muted hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {shown.map((p, i) => {
          const reversed = i % 2 === 1;
          return (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              prefetch={false}
              data-cursor
              className="pf-row group grid grid-cols-1 items-center gap-8 md:grid-cols-5"
            >
              {/* Cover thématique ~60% */}
              <div
                className={`relative h-64 overflow-hidden rounded-2xl md:h-80 md:col-span-3 ${
                  reversed ? "md:order-2" : ""
                }`}
              >
                <ProjectCover slug={p.slug} index={i + 1} category={p.category} />
              </div>

              {/* Infos ~40% */}
              <div className={`md:col-span-2 ${reversed ? "md:order-1" : ""}`}>
                <h3 className="display text-3xl font-semibold leading-tight sm:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{p.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.slice(0, 5).map((t) => (
                    <span key={t} className="chip px-3 py-1 text-xs text-gold-deep">
                      {t}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold-deep">
                  Voir le case study
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
