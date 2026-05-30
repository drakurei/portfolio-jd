import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Témoignages",
  description: "Ils m'ont fait confiance — retours de clients et collaborateurs.",
};

export default function TestimonialsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Témoignages"
        title={<>La <span className="text-gold-deep italic">confiance</span>, ça se prouve.</>}
        intro="Quelques retours sur la collaboration et les résultats obtenus."
      />

      <section className="px-6 pb-28">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="glass flex flex-col p-7">
              <span className="display text-5xl leading-none text-gold/40">“</span>
              <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-foreground/10 pt-4">
                <p className="font-medium">{t.author}</p>
                <p className="text-xs text-gold-deep">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mx-auto mt-8 w-full max-w-5xl text-center text-xs text-muted">
          (Témoignages à venir — vous avez travaillé avec moi ?{" "}
          <Link href="/contact" prefetch={false} className="text-gold-deep underline">
            Partagez votre retour
          </Link>
          .)
        </p>
      </section>
    </main>
  );
}
