import Link from "next/link";
import { cv } from "@/content/cv";

const NAV = [
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/cv", label: "CV" },
  { href: "/faq", label: "FAQ" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/contact", label: "Contact" },
];

const LEGAL = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cgu", label: "CGU" },
];

export default function Footer() {
  return (
    <footer className="hairline mt-24 border-x-0 border-b-0 px-6 py-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-2xl font-semibold">Jonathan Davy</p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            Développeur full‑stack — sécurité, réseaux & web premium. Évry (91), disponible à
            distance.
          </p>
          <div className="mt-5 space-y-1 font-mono text-sm text-muted">
            <p>
              <a href={`mailto:${cv.contact.email}`} className="transition hover:text-gold-deep">
                {cv.contact.email}
              </a>
            </p>
            <p>{cv.contact.phone}</p>
            <p>{cv.contact.address}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <p className="eyebrow mb-2">Navigation</p>
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} prefetch={false} className="text-muted transition hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-2 text-sm">
          <p className="eyebrow mb-2">Légal</p>
          {LEGAL.map((l) => (
            <Link key={l.href} href={l.href} prefetch={false} className="text-muted transition hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col items-center justify-between gap-3 border-t border-foreground/10 pt-6 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Jonathan Davy. Tous droits réservés.</p>
        <p className="font-mono">Conçu & développé avec Next.js · GSAP · Lenis</p>
      </div>
    </footer>
  );
}
