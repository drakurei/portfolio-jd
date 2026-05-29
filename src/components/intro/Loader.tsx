"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { JD_PATHS } from "@/components/JDLogo";

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          // L'intro modifie la mise en page : on recalcule les déclencheurs
          // pour qu'aucune section ne reste masquée.
          ScrollTrigger.refresh();
        },
      });

      if (reduced) {
        tl.set(root.current, { display: "none" });
        return;
      }

      // Étape 1 — morphing des initiales JD (stems -> lettres)
      tl.set([".jd-d", ".jd-j"], { autoAlpha: 1 })
        .to(".jd-d", { duration: 0.9, morphSVG: JD_PATHS.dFinal, ease: "power3.inOut" })
        .to(".jd-j", { duration: 0.9, morphSVG: JD_PATHS.jFinal, ease: "power3.inOut" }, "-=0.7")
        // Étape 2 — scramble "CHARGEMENT" -> "JONATHAN DAVY"
        .to(
          ".jd-tag",
          {
            duration: 1.1,
            scrambleText: { text: "JONATHAN DAVY", chars: "upperCase", revealDelay: 0.2 },
          },
          "-=0.5",
        )
        .to({}, { duration: 0.25 })
        // Étape 3 — "Big Bang" : explosion vers l'extérieur (scale 15) + reveal
        .to(".jd-core", { scale: 15, opacity: 0, duration: 0.9, ease: "power3.in" })
        .to(".radial-wipe", { autoAlpha: 0, duration: 0.6 }, "-=0.55")
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]">
      {/* Couche noire qui se fait "essuyer" radialement pour révéler le site */}
      <div className="radial-wipe absolute inset-0 bg-[#020202]" />

      <div className="jd-core absolute inset-0 flex flex-col items-center justify-center">
        <svg width="220" height="240" viewBox="0 0 110 120" fill="none">
          <defs>
            <linearGradient id="loader-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <filter id="loader-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g
            stroke="url(#loader-grad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#loader-glow)"
          >
            <path className="jd-d" d={JD_PATHS.dStem} style={{ visibility: "hidden" }} />
            <path className="jd-j" d={JD_PATHS.jStem} style={{ visibility: "hidden" }} />
          </g>
        </svg>
        <p className="jd-tag mt-6 font-mono text-xs tracking-[0.4em] text-indigo-bright">
          CHARGEMENT
        </p>
      </div>
    </div>
  );
}
