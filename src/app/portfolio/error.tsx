"use client";

import Link from "next/link";

export default function PortfolioError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-4">Erreur</p>
      <h1 className="display text-4xl font-extrabold sm:text-5xl">
        Un imprévu sur cette page.
      </h1>
      <p className="mt-4 max-w-md text-foreground/55">
        Le contenu n&apos;a pas pu se charger. {error?.message ? `(${error.message})` : ""}
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-indigo px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-bright"
        >
          Réessayer
        </button>
        <Link
          href="/"
          prefetch={false}
          className="rounded-full border border-white/15 px-6 py-3 text-sm text-foreground/70 transition hover:text-foreground"
        >
          Accueil
        </Link>
      </div>
    </main>
  );
}
