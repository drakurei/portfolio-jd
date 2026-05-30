"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
}

const NODES: Node[] = [
  { id: "next", label: "Next.js", x: 400, y: 235, color: "#6366f1" },
  { id: "react", label: "React", x: 250, y: 130, color: "#06b6d4" },
  { id: "ts", label: "TypeScript", x: 560, y: 130, color: "#3b82f6" },
  { id: "gsap", label: "GSAP", x: 630, y: 300, color: "#22c55e" },
  { id: "tw", label: "Tailwind", x: 520, y: 380, color: "#14b8a6" },
  { id: "supabase", label: "Supabase", x: 200, y: 330, color: "#10b981" },
  { id: "node", label: "Node.js", x: 140, y: 215, color: "#84cc16" },
  { id: "python", label: "Python", x: 340, y: 395, color: "#f59e0b" },
  { id: "git", label: "Git", x: 660, y: 195, color: "#ec4899" },
];

const EDGES: [string, string][] = [
  ["next", "react"], ["next", "ts"], ["next", "tw"], ["next", "supabase"],
  ["next", "gsap"], ["next", "node"], ["react", "ts"], ["supabase", "node"],
  ["gsap", "tw"], ["python", "supabase"], ["ts", "git"], ["node", "git"],
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;

export default function SkillsGraph() {
  const root = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<string | null>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const st = { trigger: root.current, start: "top 75%" };

      gsap.from(".sg-node", {
        scale: 0,
        opacity: 0,
        transformOrigin: "center",
        duration: 0.6,
        stagger: 0.06,
        ease: "back.out(1.8)",
        scrollTrigger: st,
      });

      if (!reduced) {
        gsap.utils.toArray<SVGLineElement>(".sg-edge").forEach((line) => {
          const len = (line as unknown as SVGGeometryElement).getTotalLength?.() ?? 600;
          gsap.fromTo(
            line,
            { strokeDasharray: len, strokeDashoffset: len },
            { strokeDashoffset: 0, duration: 1, ease: "power2.out", scrollTrigger: st },
          );
        });
      }
    },
    { scope: root },
  );

  const isLit = (edge: [string, string]) => hover && (edge[0] === hover || edge[1] === hover);

  return (
    <section ref={root} id="skills" className="px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow mb-3">03 — Compétences</p>
        <h2 className="display mb-4 text-5xl font-semibold sm:text-6xl">
          Une stack <span className="text-gradient italic">connectée</span>
        </h2>
        <p className="mb-10 max-w-xl text-sm text-foreground/55">
          Pas des pourcentages — des technologies qui s&apos;articulent. Survolez un nœud pour voir
          ses connexions.
        </p>

        <div className="glass overflow-hidden p-4">
          <svg viewBox="0 0 800 460" className="w-full" style={{ height: "auto" }}>
            <defs>
              <linearGradient id="sg-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>

            {EDGES.map(([a, b], i) => {
              const na = byId(a);
              const nb = byId(b);
              const lit = isLit([a, b]);
              return (
                <line
                  key={i}
                  className="sg-edge"
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke="url(#sg-line)"
                  strokeWidth={lit ? 2.5 : 1}
                  strokeOpacity={hover ? (lit ? 0.95 : 0.12) : 0.4}
                  style={{ transition: "stroke-opacity .3s, stroke-width .3s" }}
                />
              );
            })}

            {NODES.map((n) => {
              const active = hover === n.id;
              return (
                <g
                  key={n.id}
                  className="sg-node cursor-pointer"
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  <circle cx={n.x} cy={n.y} r={active ? 13 : 9} fill={n.color}>
                    {active && <animate attributeName="r" values="9;14;9" dur="1.2s" repeatCount="indefinite" />}
                  </circle>
                  <circle cx={n.x} cy={n.y} r={22} fill={n.color} opacity={active ? 0.18 : 0.08} />
                  <text
                    x={n.x}
                    y={n.y - 22}
                    textAnchor="middle"
                    className="fill-[#ececf3] font-mono"
                    fontSize="13"
                    fontWeight={active ? 700 : 500}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
