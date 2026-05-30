"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { offers } from "@/content/pricing";

export default function Pricing() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".offer-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="pricing" className="px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow mb-3">Prestations</p>
        <h2 className="display mb-12 text-5xl font-semibold sm:text-6xl">
          Tarifs <span className="text-gradient italic">transparents</span>
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {offers.map((o) => (
            <article
              key={o.name}
              className={`offer-card glass glass-hover flex flex-col p-7 ${
                o.highlight ? "border-indigo/50 ring-1 ring-indigo/30" : ""
              }`}
            >
              {o.highlight && (
                <span className="mb-4 self-start rounded-full bg-indigo px-3 py-1 text-[11px] font-medium text-white">
                  Populaire
                </span>
              )}
              <h3 className="text-xl font-semibold">{o.name}</h3>
              <p className="mt-1 text-sm text-foreground/50">{o.tagline}</p>
              <p className="mt-4 text-2xl font-bold text-indigo-bright">{o.price}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {o.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-foreground/70">
                    <span className="text-indigo-bright">→</span>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
