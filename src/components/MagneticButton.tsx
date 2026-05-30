"use client";

import Link from "next/link";

// Bouton statique (l'effet magnétique a été retiré à la demande : les boutons
// ne bougent plus). On garde la même API pour ne rien casser ailleurs.
export default function MagneticButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** conservé pour compat — non utilisé */
  strength?: number;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`inline-flex items-center gap-3 rounded-full px-8 py-4 font-medium transition-transform duration-200 hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </Link>
  );
}
