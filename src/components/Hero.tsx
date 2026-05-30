"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, ScrambleTextPlugin } from "@/lib/gsap";
import MagneticButton from "@/components/MagneticButton";
import { cv } from "@/content/cv";

void ScrambleTextPlugin;

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Parallaxe fond
      gsap.to(".hero-bg", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      if (reduced || !title.current) {
        gsap.set([".hero-sub", ".hero-cue"], { opacity: 1 });
        return;
      }

      const split = SplitText.create(title.current, { type: "chars, words", charsClass: "h-char" });

      const intro = gsap.timeline({ delay: 3.6 });
      intro
        .from(split.chars, {
          yPercent: 120,
          opacity: 0,
          rotateX: -90,
          stagger: 0.03,
          duration: 0.8,
          ease: "power4.out",
        })
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.7 }, "-=0.3")
        .from(".hero-cue", { opacity: 0, duration: 0.5 }, "-=0.2");

      // Déconstruction (glitch) au scroll — fromTo + immediateRender:false pour
      // ne pas écraser l'état initial (sinon le titre reste à opacity 0 en haut).
      gsap.fromTo(
        split.chars,
        { yPercent: 0, xPercent: 0, rotate: 0, opacity: 1 },
        {
          yPercent: () => gsap.utils.random(-160, 160),
          xPercent: () => gsap.utils.random(-40, 40),
          rotate: () => gsap.utils.random(-25, 25),
          opacity: 0,
          ease: "none",
          immediateRender: false,
          stagger: { amount: 0.3, from: "random" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
        },
      );

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="hero" className="section-shell overflow-hidden">
      <div className="hero-bg absolute inset-0 -z-10">
        {/* Fond clair luxe + halos champagne/or subtils */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,rgba(191,160,106,0.22),transparent_60%),radial-gradient(ellipse_at_18%_15%,rgba(230,215,184,0.35),transparent_55%),radial-gradient(ellipse_at_85%_20%,rgba(216,192,138,0.22),transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[conic-gradient(from_180deg_at_50%_120%,transparent_0deg,rgba(191,160,106,0.12)_20deg,transparent_40deg,rgba(230,215,184,0.12)_60deg,transparent_80deg)] opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#faf8f3]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-12">
        <p className="hero-sub eyebrow mb-7">{cv.identity.title}</p>
        <h1
          ref={title}
          className="display display-tight text-gradient text-[clamp(2.6rem,8.5vw,7rem)] font-bold [perspective:600px]"
        >
          BÂTIR L&apos;AUDACE DIGITALE
        </h1>
        <p className="hero-sub mx-auto mt-8 max-w-xl text-balance text-foreground/60">
          {cv.identity.tagline}
        </p>
        <div className="hero-sub mt-10">
          <MagneticButton
            href="/#strategy"
            className="bg-indigo text-white hover:bg-indigo-bright"
          >
            Entrer dans l&apos;univers
            <span>→</span>
          </MagneticButton>
        </div>
      </div>

      <div className="hero-cue absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">Scroll</span>
        <div className="mx-auto mt-2 h-10 w-px bg-gradient-to-b from-indigo to-transparent" />
      </div>
    </section>
  );
}
