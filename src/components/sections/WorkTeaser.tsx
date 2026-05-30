"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { heroProjects } from "@/content/projects";
import ProjectCover from "@/components/ProjectCover";

export default function WorkTeaser() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".work-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" className="px-6 py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">03 — Projets héros</p>
            <h2 className="display text-5xl font-semibold sm:text-6xl">
              Travaux <span className="text-gold-deep italic">sélectionnés</span>
            </h2>
          </div>
          <Link href="/portfolio" prefetch={false} className="btn-ghost hidden sm:inline-flex">
            Tout voir →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {heroProjects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              prefetch={false}
              className="work-card glass glass-hover group flex flex-col overflow-hidden"
            >
              <div className="h-48 w-full shrink-0">
                <ProjectCover slug={p.slug} index={i + 1} category={p.category} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="display text-xl font-semibold leading-snug">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-gold-deep">
                  Voir le case study
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:hidden">
          <Link href="/portfolio" prefetch={false} className="btn-gold">
            Découvrir le portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
