"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cv } from "@/content/cv";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".bento-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="section-shell px-6 py-28">
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow mb-3">02 — Profil</p>
        <h2 className="display mb-12 max-w-3xl text-5xl font-semibold sm:text-6xl">
          Un profil <span className="text-gradient italic">hybride</span> : sécurité, réseaux & dev.
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[minmax(0,1fr)]">
          <div className="bento-card glass glass-hover md:col-span-2 md:row-span-2 p-8">
            <p className="text-lg leading-relaxed text-black/80">{cv.profile}</p>
          </div>

          <div className="bento-card glass glass-hover p-6">
            <p className="eyebrow mb-2">Localisation</p>
            <p className="text-2xl font-semibold">{cv.contact.address}</p>
            <p className="mt-1 text-sm text-black/50">{cv.identity.age} ans</p>
          </div>

          <div className="bento-card glass glass-hover p-6">
            <p className="eyebrow mb-3">Langues</p>
            <ul className="space-y-2">
              {cv.languages.map((l) => (
                <li key={l.name} className="flex items-center justify-between text-sm">
                  <span className="text-black/80">{l.name}</span>
                  <span className="font-mono text-indigo-bright">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bento-card glass glass-hover md:col-span-3 p-6">
            <p className="eyebrow mb-4">Certifications</p>
            <div className="flex flex-wrap gap-3">
              {cv.certifications.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm text-black/70"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
