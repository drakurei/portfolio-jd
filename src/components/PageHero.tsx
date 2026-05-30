import RevealText from "@/components/RevealText";

export default function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <section className="px-6 pt-40 pb-10">
      <div className="mx-auto w-full max-w-5xl">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <RevealText as="h1" className="display text-5xl font-semibold leading-tight sm:text-7xl">
          {title}
        </RevealText>
        {intro && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
        <div className="mt-10 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
      </div>
    </section>
  );
}
