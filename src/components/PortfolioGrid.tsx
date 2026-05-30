"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects, CATEGORIES } from "@/content/projects";
import type { ProjectCategory } from "@/lib/types";

type Filter = ProjectCategory | "Tous";

export default function PortfolioGrid() {
  const root = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("Tous");
  const filters: Filter[] = ["Tous", ...CATEGORIES];
  const shown = filter === "Tous" ? projects : projects.filter((p) => p.category === filter);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.from(".pf-row", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      if (reduced) return;
      // Parallaxe sur les covers
      gsap.utils.toArray<HTMLElement>(".pf-cover-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
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
                ? "border-indigo bg-indigo text-white"
                : "border-black/10 text-black/50 hover:text-black/80"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-20">
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
              {/* Cover ~60% avec parallaxe */}
              <div
                className={`relative h-64 overflow-hidden rounded-2xl border border-black/5 md:h-80 md:col-span-3 ${
                  reversed ? "md:order-2" : ""
                }`}
              >
                <div
                  className="pf-cover-img absolute inset-x-0 -top-[12%] h-[124%] w-full"
                  style={{
                    background: `linear-gradient(125deg, ${p.accent}40, transparent 60%), radial-gradient(circle at 70% 30%, ${p.accent}66, transparent 60%), #ffffff`,
                  }}
                />
                <span className="absolute left-6 top-6 font-mono text-7xl font-bold text-black/5">
                  0{i + 1}
                </span>
                <span className="absolute right-5 top-5 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-medium text-indigo-bright backdrop-blur-sm">
                  {p.category}
                </span>
              </div>

              {/* Infos ~40% */}
              <div className={`md:col-span-2 ${reversed ? "md:order-1" : ""}`}>
                <h3 className="display text-3xl font-semibold sm:text-4xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-black/60">{p.description}</p>

                {/* Stack révélé au survol (animation fluide en cascade) */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.slice(0, 5).map((t, j) => (
                    <span
                      key={t}
                      className="pf-tag translate-y-2 rounded-full border border-indigo/25 bg-indigo/5 px-3 py-1 text-xs text-indigo-bright opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                      style={{ transitionDelay: `${j * 60}ms` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-2 text-sm text-black/70">
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
