const ROLES = [
  "FULL STACK",
  "FRONTEND",
  "BACKEND",
  "CYBERSÉCURITÉ",
  "RÉSEAUX",
  "NEXT.JS",
  "PYTHON",
];

function Row() {
  return (
    <span className="inline-flex items-center">
      {ROLES.map((r) => (
        <span key={r} className="inline-flex items-center">
          <span className="display px-8 text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold text-foreground/15">
            {r}
          </span>
          <span className="text-indigo-bright text-3xl sm:text-5xl">✦</span>
        </span>
      ))}
    </span>
  );
}

export default function RoleMarquee() {
  return (
    <section aria-hidden="true" className="relative overflow-hidden border-y border-white/5 py-10">
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </section>
  );
}
