import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { cv } from "@/content/cv";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données (RGPD) du site de Jonathan Davy.",
};

const BLOCKS: { h: string; p: React.ReactNode }[] = [
  {
    h: "Responsable du traitement",
    p: <>Les données collectées via ce site sont traitées par {cv.identity.name} ({cv.contact.email}).</>,
  },
  {
    h: "Données collectées",
    p: <>Ce site ne contient pas de backend : aucune donnée n&apos;est stockée sur un serveur. Le formulaire de contact ouvre votre logiciel de messagerie (mailto) — vous restez maître de l&apos;envoi. Des statistiques de visite sont mesurées localement dans votre navigateur (localStorage) et ne sont pas transmises.</>,
  },
  {
    h: "Finalité",
    p: <>Les informations que vous nous transmettez par e‑mail servent uniquement à répondre à votre demande et à établir une éventuelle relation commerciale.</>,
  },
  {
    h: "Cookies",
    p: <>Aucun cookie de suivi publicitaire n&apos;est déposé. Le site n&apos;utilise pas d&apos;outil de tracking tiers. [À compléter si des outils analytics sont ajoutés.]</>,
  },
  {
    h: "Vos droits (RGPD)",
    p: <>Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition sur vos données. Pour l&apos;exercer : {cv.contact.email}.</>,
  },
  {
    h: "Hébergement",
    p: <>Site hébergé par GitHub Pages (GitHub, Inc., États‑Unis).</>,
  },
];

export default function ConfidentialitePage() {
  return (
    <main>
      <PageHero eyebrow="Légal" title="Politique de confidentialité" />
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
