"use client";

import { useRef } from "react";
import Tilt from "react-parallax-tilt";
import { gsap, useGSAP } from "@/lib/gsap";
import { heroProjects } from "@/content/projects";
import MagneticButton from "@/components/MagneticButton";

export default function WorkTeaser() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !track.current) return;

      const amount = () => track.current!.scrollWidth - window.innerWidth;

      // Distorsion : skew des cartes selon la vélocité du scroll
      const skewSetter = gsap.quickTo(".teaser-card", "skewX", { duration: 0.5, ease: "power3" });
      const rgbSetter = gsap.quickSetter(".teaser-card", "--rgb", "px");

      gsap.to(track.current, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + amount(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const v = self.getVelocity();
            skewSetter(gsap.utils.clamp(-14, 14, v / -260));
            (rgbSetter as (v: number) => void)(gsap.utils.clamp(0, 8, Math.abs(v) / 400));
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".teaser-visual").forEach((v) => {
        gsap.to(v, {
          backgroundPositionX: "30%",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + amount(),
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" className="relative h-screen overflow-hidden">
      <div className="absolute left-6 top-24 z-10">
        <p className="eyebrow mb-3">03 — Projets héros</p>
        <h2 className="display text-5xl font-semibold sm:text-7xl">
          Travaux <span className="text-gradient italic">sélectionnés</span>
        </h2>
      </div>

      <div ref={track} className="flex h-full items-center gap-8 pl-6 will-change-transform">
        <div className="w-[26vw] shrink-0" aria-hidden />

        {heroProjects.map((p, i) => (
          <Tilt
            key={p.slug}
            tiltMaxAngleX={7}
            tiltMaxAngleY={7}
            glareEnable
            glareMaxOpacity={0.15}
            glareColor="#6366f1"
            className="shrink-0"
          >
            <article className="teaser-card glass glass-hover flex h-[62vh] w-[80vw] max-w-md flex-col overflow-hidden md:w-[440px]">
              <div
                className="teaser-visual relative h-44 w-full"
                style={{
                  background: `linear-gradient(120deg, ${p.accent}33, transparent 70%), radial-gradient(circle at 70% 30%, ${p.accent}55, transparent 60%)`,
                  backgroundSize: "140% 140%",
                }}
              >
                <span className="absolute left-5 top-5 font-mono text-6xl font-bold text-black/10">
                  0{i + 1}
                </span>
                <span className="absolute right-5 top-5 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-medium text-indigo-bright backdrop-blur-sm">
                  {p.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-2xl font-semibold">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-black/60">{p.description}</p>
                <a
                  href={`/portfolio/${p.slug}`}
                  className="group mt-5 inline-flex items-center gap-2 self-start text-sm text-indigo-bright"
                >
                  Case study
                  <span className="transition group-hover:translate-x-1">→</span>
                </a>
              </div>
            </article>
          </Tilt>
        ))}

        {/* Panneau CTA fullscreen final */}
        <div className="flex h-full w-screen shrink-0 flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow mb-5">La suite</p>
          <MagneticButton
            href="/portfolio"
            strength={0.5}
            className="border border-indigo/40 bg-indigo/10 text-2xl text-indigo-bright hover:bg-indigo/20 sm:text-4xl !px-12 !py-8"
          >
            DÉCOUVRIR LE PORTFOLIO COMPLET
            <span>→</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
