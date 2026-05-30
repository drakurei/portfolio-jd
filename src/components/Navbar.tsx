"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import JDLogo from "@/components/JDLogo";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          prefetch={false}
          aria-label="Accueil"
          className="flex items-center gap-3 rounded-full px-3 py-1.5"
        >
          <JDLogo size={30} idSuffix="-nav" />
          <span className="display text-lg font-semibold tracking-tight">Jonathan Davy</span>
        </Link>

        {/* Liens desktop */}
        <nav className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              prefetch={false}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                isActive(l.href)
                  ? "bg-foreground/[0.06] text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Toggle mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="glass flex h-10 w-10 items-center justify-center rounded-full md:hidden"
        >
          <span className="flex flex-col gap-1">
            <span className={`h-0.5 w-4 bg-foreground transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-0.5 w-4 bg-foreground transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-4 bg-foreground transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {open && (
        <nav className="glass mx-6 flex flex-col gap-1 rounded-2xl p-3 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              prefetch={false}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-2.5 text-sm transition ${
                isActive(l.href) ? "bg-foreground/[0.06] text-foreground" : "text-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
