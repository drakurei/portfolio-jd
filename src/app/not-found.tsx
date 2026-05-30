import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-extrabold leading-none text-foreground/[0.04] text-[40vw]"
      >
        404
      </span>
      <div className="relative">
        <p className="eyebrow mb-5">Erreur 404</p>
        <h1 className="display text-5xl font-semibold sm:text-7xl">
          Cette page s&apos;est <span className="text-gradient">évaporée</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-muted">
          Le lien est peut‑être ancien ou erroné. Revenons sur du solide.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" prefetch={false} className="btn-gold">Retour à l&apos;accueil</Link>
          <Link href="/portfolio" prefetch={false} className="btn-ghost">Voir le portfolio</Link>
        </div>
      </div>
    </main>
  );
}
