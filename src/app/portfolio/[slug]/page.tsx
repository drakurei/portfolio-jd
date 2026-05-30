import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.title} — Case Study` : "Case Study" };
}

const STEPS = [
  { key: "challenge", label: "Challenge", num: "01" },
  { key: "strategy", label: "Stratégie", num: "02" },
  { key: "result", label: "Résultat", num: "03" },
] as const;

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-28">
      <Link href="/portfolio" prefetch={false} className="text-sm text-foreground/50 transition hover:text-foreground/80">
        ← Portfolio
      </Link>

      <p className="eyebrow mb-3 mt-8">{p.category}</p>
      <h1 className="display text-5xl font-semibold sm:text-7xl">{p.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-foreground/65">{p.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.stack.map((t) => (
          <span
            key={t}
            className="rounded-full border border-indigo/30 bg-indigo/10 px-3 py-1 text-xs text-indigo-bright"
          >
            {t}
          </span>
        ))}
      </div>

      <div
        className="mt-12 h-64 w-full rounded-2xl"
        style={{
          background: `linear-gradient(120deg, ${p.accent}44, transparent 70%), radial-gradient(circle at 70% 30%, ${p.accent}66, transparent 60%)`,
        }}
      />

      <div className="mt-16 space-y-12">
        {STEPS.map((s) => (
          <section key={s.key} className="grid grid-cols-1 gap-4 md:grid-cols-[120px_1fr]">
            <div>
              <p className="font-mono text-sm text-indigo-bright">{s.num}</p>
              <h2 className="text-xl font-semibold">{s.label}</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed">{p[s.key]}</p>
          </section>
        ))}
      </div>

      <div className="mt-16 glass p-8">
        <p className="eyebrow mb-2">Choix d&apos;architecture</p>
        <p className="text-sm leading-relaxed text-foreground/75">{p.audit}</p>
      </div>
    </main>
  );
}
