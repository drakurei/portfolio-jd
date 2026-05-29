"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cv } from "@/content/cv";

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".tl-item", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="journey" className="px-6 py-28">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Colonne gauche STICKY : reste fixe pendant que la droite défile */}
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow mb-3">04 — Parcours</p>
          <h2 className="display text-5xl font-semibold sm:text-6xl">
            Expériences <span className="text-gradient italic">terrain</span>
          </h2>
          <p className="mt-6 max-w-xs text-sm text-black/50">
            Du support hospitalier à la sécurité embarquée — un parcours ancré dans le concret.
          </p>
          <div className="mt-8 font-mono text-xs text-black/30">
            {cv.experiences.length} expériences · {cv.formations.length} formations
          </div>
        </div>

        {/* Colonne droite : défile */}
        <div className="relative pl-8">
          <div className="absolute left-1.5 top-1 h-full w-px bg-gradient-to-b from-indigo via-indigo/40 to-transparent" />
          {cv.experiences.map((e) => (
            <div key={e.company} className="tl-item relative mb-10">
              <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-indigo ring-4 ring-indigo/20" />
              <p className="font-mono text-xs text-black/40">
                {e.dates} · {e.type}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{e.title}</h3>
              <p className="text-sm text-indigo-bright">{e.company}</p>
              <p className="mt-2 text-sm leading-relaxed text-black/60">{e.description}</p>
            </div>
          ))}

          <h3 className="mb-5 mt-4 font-mono text-sm uppercase tracking-widest text-indigo-bright">
            Formations
          </h3>
          <div className="space-y-4">
            {cv.formations.map((f) => (
              <div key={f.title} className="tl-item glass glass-hover p-6">
                <p className="font-mono text-xs text-black/40">
                  {f.dates} · {f.level}
                </p>
                <h4 className="mt-1 font-semibold">{f.title}</h4>
                <p className="text-sm text-black/50">{f.school}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
