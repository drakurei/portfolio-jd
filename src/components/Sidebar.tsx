"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SECTION_IDS } from "@/lib/sections";
import JDLogo from "@/components/JDLogo";

export default function Sidebar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const logoRef = useRef<HTMLDivElement>(null);

  // Logo "floating shadow" — parallaxe sur le mouvement de la souris
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 14;
      const dy = (e.clientY / window.innerHeight - 0.5) * 14;
      if (logoRef.current) {
        logoRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
        logoRef.current.style.filter = `drop-shadow(${-dx}px ${-dy}px 12px rgba(99,102,241,0.6))`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let observer: IntersectionObserver | undefined;
    if (isHome) {
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
        { rootMargin: "-45% 0px -45% 0px" },
      );
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer!.observe(el);
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [isHome, pathname]);

  const currentId = isHome ? active : pathname.startsWith("/portfolio") ? "portfolio" : pathname.startsWith("/cv") ? "cv" : "";

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Réduire la navigation" : "Ouvrir la navigation"}
        className="fixed right-5 top-6 z-[80] flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 backdrop-blur-xl transition hover:border-indigo/50"
      >
        <span className="flex flex-col gap-1">
          <span className={`h-0.5 w-4 bg-[#1b1b2b] transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`h-0.5 w-4 bg-[#1b1b2b] transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-4 bg-[#1b1b2b] transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </span>
      </button>

      <aside
        className={`fixed right-0 top-0 z-[75] flex h-screen w-60 flex-col justify-between py-10 pr-7 pl-8 transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-[120%]"
        }`}
      >
        {/* Liquid blur panel */}
        <div className="pointer-events-none absolute inset-y-4 right-3 left-2 -z-10 rounded-3xl border border-black/[0.08] bg-white/70 shadow-[0_20px_60px_-30px_rgba(99,102,241,0.5)] backdrop-blur-2xl [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]" />

        <Link href="/" prefetch={false} className="flex items-center gap-2">
          <div ref={logoRef} className="transition-[filter] duration-300 will-change-transform">
            <JDLogo size={34} idSuffix="-nav" />
          </div>
        </Link>

        <nav className="flex flex-col gap-4">
          {NAV.map((item) => {
            const isActive = currentId === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                prefetch={false}
                className="group flex items-center gap-3"
              >
                <span className={`font-mono text-[10px] transition ${isActive ? "text-indigo-bright" : "text-black/30"}`}>
                  {item.index}
                </span>
                <span className={`text-sm transition ${isActive ? "font-medium text-[#1b1b2b]" : "text-black/45 group-hover:text-black/75"}`}>
                  {item.label}
                </span>
                <span className={`ml-auto h-px transition-all ${isActive ? "w-6 bg-indigo" : "w-2 bg-black/20"}`} />
              </Link>
            );
          })}
        </nav>

        {/* Reading progress bar verticale */}
        <div className="flex items-center gap-3">
          <div className="relative h-24 w-px bg-black/10">
            <div
              className="absolute left-0 top-0 w-px bg-gradient-to-b from-indigo-bright to-indigo"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-black/30 tabular-nums">
            {String(Math.round(progress * 100)).padStart(2, "0")}%
          </span>
        </div>
      </aside>
    </>
  );
}
