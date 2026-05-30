"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import CvDownloadButton from "@/components/CvDownloadButton";

export default function FinaleCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".finale-line", {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 py-32"
    >
      {/* Texte fantôme en fond */}
      <span className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-extrabold uppercase leading-none text-foreground/[0.03] text-[18vw]">
        DAVY
      </span>
      {/* halo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.22),transparent_70%)] blur-3xl" />

      <div className="relative text-center">
        <h2 className="display text-[clamp(2.6rem,9vw,7.5rem)] font-extrabold leading-[0.95]">
          <span className="block overflow-hidden">
            <span className="finale-line block">LET&apos;S BUILD</span>
          </span>
          <span className="block overflow-hidden">
            <span className="finale-line block text-gradient">THE FUTURE.</span>
          </span>
        </h2>

        <div className="finale-line mt-10 flex flex-wrap items-center justify-center gap-4">
          <CvDownloadButton />
          <Link
            href="/cv"
            prefetch={false}
            className="rounded-full border border-white/15 px-6 py-3 text-sm text-foreground/75 transition hover:border-indigo/50 hover:text-foreground"
          >
            Voir le CV interactif
          </Link>
        </div>
      </div>
    </section>
  );
}
