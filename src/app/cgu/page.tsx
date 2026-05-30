import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { cv } from "@/content/cv";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "Conditions Générales d'Utilisation du site de Jonathan Davy.",
};

const BLOCKS: { h: string; p: React.ReactNode }[] = [
  { h: "1. Objet", p: <>Les présentes CGU régissent l&apos;utilisation du site {cv.contact.linkedin ? "" : ""} de {cv.identity.name}. En naviguant sur le site, vous acceptez ces conditions.</> },
  { h: "2. Accès au site", p: <>Le site est accessible gratuitement. {cv.identity.name} s&apos;efforce d&apos;assurer sa disponibilité mais ne saurait être tenu responsable d&apos;une interruption.</> },
  { h: "3. Propriété intellectuelle", p: <>Les contenus du site sont protégés. Toute reproduction sans accord écrit est interdite.</> },
  { h: "4. Responsabilité", p: <>Les informations sont fournies à titre indicatif. {cv.identity.name} ne saurait être tenu responsable d&apos;un usage qui en serait fait. Les liens externes n&apos;engagent pas l&apos;éditeur.</> },
  { h: "5. Prestations", p: <>Toute prestation fait l&apos;objet d&apos;un devis détaillé accepté avant le début des travaux. Les conditions commerciales (acompte, délais, livrables) y sont précisées. [Conditions de vente détaillées à compléter.]</> },
  { h: "6. Droit applicable", p: <>Les présentes CGU sont soumises au droit français. Tout litige relève des tribunaux compétents.</> },
  { h: "7. Contact", p: <>{cv.contact.email}</> },
];

export default function CguPage() {
  return (
    <main>
      <PageHero eyebrow="Légal" title="Conditions Générales d'Utilisation" />
      <section className="px-6 pb-28">
        <div className="mx-auto w-full max-w-3xl space-y-8 text-sm leading-relaxed text-muted">
          {BLOCKS.map((b) => (
            <div key={b.h}>
              <h2 className="display mb-2 text-xl font-semibold text-foreground">{b.h}</h2>
              <p>{b.p}</p>
            </div>
          ))}
          <p className="text-xs text-muted/70">Dernière mise à jour : [date].</p>
        </div>
      </section>
    </main>
  );
}
