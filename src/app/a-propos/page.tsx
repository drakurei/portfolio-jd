import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { cv } from "@/content/cv";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Jonathan Davy, développeur full‑stack à Évry : parcours, valeurs et expertise (cybersécurité, réseaux, web).",
};

const VALUES = [
  { t: "Exigence", d: "Le détail fait la différence. Chaque pixel, chaque ms de chargement compte." },
  { t: "Concret", d: "Des projets réels en milieu exigeant (hospitalier, judiciaire) : je livre, je documente." },
  { t: "Sécurité", d: "Une culture cybersécurité de fond : protéger la donnée, dès la conception." },
  { t: "Transparence", d: "Devis clairs, points réguliers, code propre et maintenable. Pas de boîte noire." },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="À propos"
        title={<>Bâtir l&apos;<span className="text-gold-deep italic">audace</span> digitale.</>}
        intro={cv.profile}
      />

      <section className="px-6 pb-20">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.t} className="glass p-6">
              <h3 className="display text-xl font-semibold">{v.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-6">Parcours</p>
            <div className="space-y-6">
              {cv.experiences.map((e) => (
                <div key={e.company} className="hairline rounded-2xl border-x-0 border-t-0 pb-5">
                  <p className="font-mono text-xs text-muted">{e.dates} · {e.type}</p>
                  <h3 className="mt-1 font-semibold">{e.title}</h3>
                  <p className="text-sm text-gold-deep">{e.company}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{e.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-6">Formations & certifications</p>
            <div className="space-y-4">
              {cv.formations.map((f) => (
                <div key={f.title} className="glass p-5">
                  <p className="font-mono text-xs text-muted">{f.dates} · {f.level}</p>
                  <h4 className="mt-1 font-semibold">{f.title}</h4>
                  <p className="text-sm text-muted">{f.school}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {cv.certifications.map((c) => (
                <span key={c} className="chip px-4 py-2 text-sm text-muted">{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-5xl">
          <Link href="/cv" prefetch={false} className="btn-gold">Voir le CV complet</Link>
        </div>
      </section>
    </main>
  );
}
