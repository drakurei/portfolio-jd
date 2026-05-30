import { cv } from "@/content/cv";

const ROWS = [
  { label: "Tél", value: cv.contact.phone, href: `tel:${cv.contact.phone.replace(/\s+/g, "")}` },
  { label: "Email", value: cv.contact.email, href: `mailto:${cv.contact.email}` },
  { label: "Zone", value: cv.contact.address, href: null },
  { label: "LinkedIn", value: cv.contact.linkedin, href: `https://${cv.contact.linkedin}` },
];

export default function ContactCard() {
  return (
    <div className="glass relative overflow-hidden p-6">
      {/* halo pastel */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.6),transparent_70%)] blur-2xl" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-indigo-bright">
            Contact card
          </p>
          <span className="flex items-center gap-1.5 text-[11px] text-black/40">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" /> disponible
          </span>
        </div>

        <p className="display text-2xl font-semibold">{cv.identity.name}</p>
        <p className="mb-5 text-sm text-black/50">{cv.identity.title}</p>

        <dl className="divide-y divide-black/5">
          {ROWS.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-4 py-2.5">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-black/40">
                {r.label}
              </dt>
              <dd className="text-right text-sm text-black/80">
                {r.href ? (
                  <a
                    href={r.href}
                    target={r.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="transition hover:text-indigo-bright"
                  >
                    {r.value}
                  </a>
                ) : (
                  r.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
