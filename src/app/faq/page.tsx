import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { faq } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes : projets, délais, process, technologies, tarifs et maintenance.",
};

export default function FaqPage() {
  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        title={<>Vos questions, mes <span className="text-gold-deep italic">réponses</span>.</>}
        intro="Tout ce qu'il faut savoir avant de démarrer un projet ensemble."
      />

      <section className="px-6 pb-28">
        <div className="mx-auto w-full max-w-3xl space-y-3">
          {faq.map((item) => (
            <details key={item.q} className="glass group p-6 [&_summary]:cursor-pointer">
              <summary className="flex items-center justify-between gap-4 font-medium marker:content-['']">
                <span>{item.q}</span>
                <span className="text-gold-deep transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="mx-auto mt-10 w-full max-w-3xl">
          <Link href="/contact" prefetch={false} className="btn-gold">Une autre question ? Écrivez‑moi</Link>
        </div>
      </section>
    </main>
  );
}
