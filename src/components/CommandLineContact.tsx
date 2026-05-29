"use client";

import { useEffect, useRef, useState } from "react";
import { cv } from "@/content/cv";

interface Line {
  prompt: boolean;
  text: string;
}

const LINES: Line[] = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: `${cv.identity.name} — ${cv.identity.title}` },
  { prompt: true, text: "cat contact.txt" },
  { prompt: false, text: cv.contact.phone },
  { prompt: false, text: cv.contact.email },
  { prompt: false, text: cv.contact.address },
  { prompt: false, text: cv.contact.linkedin },
  { prompt: true, text: "open mailto →" },
];

export default function CommandLineContact() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [started, setStarted] = useState(false);

  // Démarre le typing quand le bloc entre dans le viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStarted(true)),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rendered = LINES.map((l) => (l.prompt ? `$ ${l.text}` : `  ${l.text}`));
    if (reduced) {
      setDone(rendered);
      return;
    }
    let li = 0;
    let ci = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (li >= rendered.length) return;
      const full = rendered[li];
      ci++;
      setCurrent(full.slice(0, ci));
      if (ci >= full.length) {
        setDone((d) => [...d, full]);
        setCurrent("");
        li++;
        ci = 0;
        timer = setTimeout(tick, 280);
      } else {
        timer = setTimeout(tick, 32);
      }
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [started]);

  return (
    <div ref={ref} className="glass overflow-hidden font-mono text-sm">
      <div className="flex items-center gap-2 border-b border-black/10 bg-black/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ec4899]" />
        <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
        <span className="h-3 w-3 rounded-full bg-[#10b981]" />
        <span className="ml-3 text-xs text-black/40">jonathan@davy ~ contact</span>
      </div>
      <div className="min-h-[12rem] space-y-1 p-5 leading-relaxed">
        {done.map((l, i) => (
          <p key={i} className={l.startsWith("$") ? "text-indigo-bright" : "text-black/75"}>
            {l}
          </p>
        ))}
        {current && (
          <p className={current.startsWith("$") ? "text-indigo-bright" : "text-black/75"}>
            {current}
            <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-indigo align-middle" />
          </p>
        )}
      </div>
    </div>
  );
}
