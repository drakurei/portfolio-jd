"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { JD_PATHS } from "@/components/JDLogo";

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  // Filet de sécurité : quoi qu'il arrive (GSAP en échec, asset bloqué…),
  // le loader disparaît au bout de 2,6 s — il ne masque JAMAIS le contenu durablement.
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2600);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finish = () => {
        setDone(true);
        ScrollTrigger.refresh();
      };

      if (reduced) {
        finish();
        return;
      }

      const tl = gsap.timeline({ onComplete: finish });
      tl.set([".jd-d", ".jd-j"], { autoAlpha: 1 })
        .to(".jd-d", { duration: 0.55, morphSVG: JD_PATHS.dFinal, ease: "power3.inOut" })
        .to(".jd-j", { duration: 0.55, morphSVG: JD_PATHS.jFinal, ease: "power3.inOut" }, "-=0.4")
        .to(
          ".jd-tag",
          { duration: 0.6, scrambleText: { text: "JONATHAN DAVY", chars: "upperCase", revealDelay: 0.1 } },
          "-=0.35",
        )
        .to({}, { duration: 0.1 })
        .to(".jd-core", { scale: 12, opacity: 0, duration: 0.55, ease: "power3.in" })
        .to(".radial-wipe", { autoAlpha: 0, duration: 0.45 }, "-=0.4");
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]">
      <div className="radial-wipe absolute inset-0 bg-[#faf8f3]" />

      <div className="jd-core absolute inset-0 flex flex-col items-center justify-center">
        <svg width="220" height="240" viewBox="0 0 110 120" fill="none">
          <defs>
            <linearGradient id="loader-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d8c08a" />
              <stop offset="55%" stopColor="#bfa06a" />
              <stop offset="100%" stopColor="#9a7b3f" />
            </linearGradient>
            <filter id="loader-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="b" />
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
        <p className="jd-tag mt-6 font-mono text-xs tracking-[0.4em] text-gold-deep">CHARGEMENT</p>
      </div>
    </div>
  );
}
