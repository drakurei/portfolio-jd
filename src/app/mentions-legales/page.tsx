import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { cv } from "@/content/cv";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site de Jonathan Davy.",
};

export default function MentionsLegalesPage() {
  return (
    <main>
      <PageHero eyebrow="Légal" title="Mentions légales" />
      <section className="px-6 pb-28">
        <div className="mx-auto w-full max-w-3xl space-y-8 text-sm leading-relaxed text-muted">
          <div>
            <h2 className="display mb-2 text-xl font-semibold text-foreground">Éditeur du site</h2>
            <p>
              {cv.identity.name} — Développeur web indépendant.<br />
              Statut juridique : <span className="text-foreground/80">[à compléter — ex : micro‑entrepreneur]</span><br />
              SIRET : <span className="text-foreground/80">[numéro SIRET à compléter]</span><br />
              Adresse : {cv.contact.address}<br />
              E‑mail : {cv.contact.email} — Téléphone : {cv.contact.phone}
            </p>
          </div>
          <div>
            <h2 className="display mb-2 text-xl font-semibold text-foreground">Directeur de la publication</h2>
            <p>{cv.identity.name}.</p>
          </div>
          <div>
            <h2 className="display mb-2 text-xl font-semibold text-foreground">Hébergement</h2>
            <p>
              Ce site est hébergé par <span className="text-foreground/80">GitHub Pages — GitHub, Inc.</span>,
              88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États‑Unis.
            </p>
          </div>
          <div>
            <h2 className="display mb-2 text-xl font-semibold text-foreground">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus (textes, visuels, code) présents sur ce site est, sauf
              mention contraire, la propriété de {cv.identity.name}. Toute reproduction sans
              autorisation est interdite.
            </p>
          </div>
          <div>
            <h2 className="display mb-2 text-xl font-semibold text-foreground">Contact</h2>
            <p>Pour toute question : {cv.contact.email}.</p>
          </div>
          <p className="text-xs text-muted/70">
            Dernière mise à jour : [date]. Les éléments entre crochets sont à compléter par l&apos;éditeur.
          </p>
        </div>
      </section>
    </main>
  );
}
