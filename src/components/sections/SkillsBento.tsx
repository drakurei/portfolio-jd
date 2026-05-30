"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cv } from "@/content/cv";

// Bento asymétrique : certaines catégories occupent plus de place.
const SPAN: Record<string, string> = {
  Développement: "md:col-span-2 md:row-span-2",
  Réseaux: "md:col-span-2",
};

export default function SkillsBento() {
  const root = useRef<HTMLElement>(null);
  const cats = Object.entries(cv.skills);

  useGSAP(
    () => {
      gsap.from(".bento-skill", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="skills" className="px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow mb-3">03 — Compétences</p>
        <h2 className="display mb-12 text-5xl font-extrabold sm:text-6xl">
          Le <span className="text-gradient">stack</span>
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[minmax(150px,auto)]">
          {cats.map(([cat, skills]) => (
            <article
              key={cat}
              className={`bento-skill border-beam glass flex flex-col p-6 ${SPAN[cat] ?? ""}`}
            >
              <h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-indigo-bright">
                {cat}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s.name}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-foreground/80"
                    title={s.level}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
