"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const INTERACTIVE = "a, button, input, select, textarea, label, [data-cursor], [role='button']";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("has-custom-cursor");
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });

    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "power3" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "power3" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.4, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest?.(INTERACTIVE)) {
        gsap.to(ring.current, { scale: 1.9, borderColor: "rgba(124,58,237,0.9)", backgroundColor: "rgba(124,58,237,0.12)", duration: 0.25 });
        gsap.to(dot.current, { scale: 0.4, duration: 0.25 });
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest?.(INTERACTIVE)) {
        gsap.to(ring.current, { scale: 1, borderColor: "rgba(99,102,241,0.55)", backgroundColor: "transparent", duration: 0.25 });
        gsap.to(dot.current, { scale: 1, duration: 0.25 });
      }
    };

    const onDown = () => gsap.to(ring.current, { scale: 0.85, duration: 0.15 });
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.2 });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] h-9 w-9 rounded-full border border-indigo/55"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-indigo-bright"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
