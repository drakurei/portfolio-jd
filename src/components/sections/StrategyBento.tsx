"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import RevealText from "@/components/RevealText";

interface Block {
  key: string;
  title: string;
  desc: string;
  metrics: { label: string; value: string }[];
  span: string;
}

const BLOCKS: Block[] = [
  {
    key: "trust",
    title: "Performance is Trust",
    desc: "Un site qui s'affiche en moins d'une seconde n'est pas un détail technique : c'est la première promesse tenue. Avant même un mot, la vitesse dit au visiteur « ici, c'est sérieux ». Next.js, rendu serveur, edge — la confiance se gagne au premier paint.",
    metrics: [
      { label: "Conversion", value: "jusqu'à 3×" },
      { label: "LCP", value: "< 1s" },
    ],
    span: "md:col-span-2 md:row-span-2",
  },
  {
    key: "emotion",
    title: "Creative Emotion",
    desc: "Le design plat informe. L'immersion, elle, crée un lien. Le mouvement (GSAP), le rythme du scroll et les micro-interactions installent une émotion que le visiteur associe à votre marque — et qu'il retient.",
    metrics: [
      { label: "Rétention", value: "+ temps passé" },
      { label: "Mémorisation", value: "supérieure" },
    ],
    span: "",
  },
  {
    key: "autonomy",
    title: "Full Stack Autonomy",
    desc: "L'architecture headless (Supabase + Next) vous rend autonome : modifier votre contenu, vos prix, vos projets sans toucher au code ni dépendre de personne.",
    metrics: [
      { label: "Stack", value: "Next + Supabase" },
      { label: "Dette", value: "zéro" },
    ],
    span: "md:col-span-3",
  },
];

export default function StrategyBento() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".strat-block", {
        y: 60,
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
    <section ref={root} id="strategy" className="section-shell px-6 py-28">
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow mb-3">02 — Stratégie & Analyse</p>
        <RevealText as="h2" className="display mb-12 max-w-3xl text-5xl font-semibold sm:text-7xl">
          Je ne code pas des pages. Je construis des{" "}
          <span className="text-gradient italic">leviers business.</span>
        </RevealText>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {BLOCKS.map((b) => (
            <article
              key={b.key}
              className={`strat-block group glass glass-hover relative flex flex-col overflow-hidden p-8 ${b.span}`}
            >
              <h3 className="display text-3xl font-semibold sm:text-4xl">{b.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-black/65">{b.desc}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {b.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-indigo/30 bg-indigo/10 px-3 py-2"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider text-black/40">
                      {m.label}
                    </p>
                    <p className="text-sm font-semibold text-indigo-bright">{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
