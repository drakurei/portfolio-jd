"use client";

import { useState } from "react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { projects, CATEGORIES } from "@/content/projects";
import type { ProjectCategory } from "@/lib/types";

type Filter = ProjectCategory | "Tous";

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<Filter>("Tous");
  const filters: Filter[] = ["Tous", ...CATEGORIES];
  const shown = filter === "Tous" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-3">
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {shown.map((p) => (
          <Tilt
            key={p.slug}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareEnable
            glareMaxOpacity={0.12}
            glareColor="#6366f1"
          >
            <Link
              href={`/portfolio/${p.slug}`}
              className="glass glass-hover flex h-full flex-col overflow-hidden"
            >
              <div
                className="relative h-40 w-full"
                style={{
                  background: `linear-gradient(120deg, ${p.accent}33, transparent 70%), radial-gradient(circle at 70% 30%, ${p.accent}55, transparent 60%)`,
                }}
              >
                <span className="absolute right-4 top-4 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-medium text-indigo-bright backdrop-blur-sm">
                  {p.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-black/55">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.slice(0, 4).map((t) => (
                    <span key={t} className="font-mono text-[11px] text-black/40">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </Tilt>
        ))}
      </div>
    </div>
  );
}
