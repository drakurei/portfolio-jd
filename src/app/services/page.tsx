import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Ce que je fais : sites & landing premium, développement full‑stack, réseaux & cybersécurité, conseil et audit.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Ce que je fais"
        title={<>Des <span className="text-gold-deep italic">services</span>, pas des prestations standard.</>}
        intro="Je conçois et développe des expériences web premium, du design à la mise en production — avec une exigence de performance, de sécurité et de soin du détail."
      />

      <section className="px-6 pb-28">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5">
          {services.map((s) => (
            <article key={s.num} className="glass glass-hover grid grid-cols-1 gap-6 p-8 md:grid-cols-[auto_1fr_1fr]">
              <span className="display text-4xl text-gold/40">{s.num}</span>
              <div>
                <h2 className="display text-2xl font-semibold">{s.title}</h2>
                <p className="mt-1 text-sm text-gold-deep">{s.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{s.description}</p>
              </div>
              <ul className="space-y-2 md:border-l md:border-foreground/10 md:pl-6">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex gap-2 text-sm text-muted">
                    <span className="text-gold-deep">—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-5xl flex-wrap items-center gap-4">
          <Link href="/tarifs" prefetch={false} className="btn-gold">
            Voir les tarifs
          </Link>
          <Link href="/contact" prefetch={false} className="btn-ghost">
            Discuter de votre projet
          </Link>
        </div>
      </section>
    </main>
  );
}
