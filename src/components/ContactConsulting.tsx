"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap, useGSAP } from "@/lib/gsap";
import { contactSchema, type ContactInput, BUDGET_OPTIONS } from "@/lib/contact-schema";
import { cv } from "@/content/cv";
import ContactCard from "@/components/ContactCard";

export default function ContactConsulting() {
  const root = useRef<HTMLElement>(null);
  const check = useRef<SVGPathElement>(null);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  useGSAP(
    () => {
      gsap.from(".contact-anim", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  const onSubmit = async (data: ContactInput) => {
    setServerError(null);
    try {
      // Site statique (GitHub Pages) : pas de serveur → on ouvre le client mail
      // pré-rempli. (Upgrade possible : Formspree pour un envoi sans quitter la page.)
      const subject = `Demande d'expertise — ${data.name}${data.company ? ` (${data.company})` : ""}`;
      const body = [
        `Nom : ${data.name}`,
        `Email : ${data.email}`,
        data.company ? `Entreprise : ${data.company}` : null,
        `Budget : ${data.budget}`,
        "",
        data.message,
      ]
        .filter(Boolean)
        .join("\n");
      const mailto = `mailto:${cv.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      const { trackContactClick } = await import("@/lib/stats");
      trackContactClick();
      window.location.href = mailto;
      setSent(true);
      requestAnimationFrame(() => {
        if (!check.current) return;
        const len = check.current.getTotalLength();
        gsap.fromTo(
          check.current,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" },
        );
      });
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Erreur inconnue.");
    }
  };

  return (
    <section ref={root} id="contact" className="section-shell px-6 py-28">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1fr]">
        <div className="contact-anim">
          <p className="eyebrow mb-3">07 — Contact</p>
          <h2 className="display text-5xl font-semibold sm:text-6xl">
            Demande <span className="text-gradient italic">d&apos;expertise</span>
          </h2>
          <p className="mt-6 mb-8 max-w-sm text-foreground/60">
            Un projet, un audit, une mission d&apos;alternance ? Décrivez votre besoin — réponse
            sous 24h.
          </p>
          <ContactCard />
        </div>

        <div className="contact-anim glass p-8">
          {sent ? (
            <div className="flex h-full min-h-[20rem] flex-col items-center justify-center text-center">
              <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                <circle cx="42" cy="42" r="40" stroke="#6366f1" strokeWidth="2" opacity="0.4" />
                <path
                  ref={check}
                  d="M26 43 L38 55 L59 30"
                  stroke="#818cf8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <h3 className="mt-6 text-xl font-semibold">Votre messagerie s&apos;ouvre</h3>
              <p className="mt-2 text-sm text-foreground/50">
                Finalisez l&apos;envoi depuis votre client mail — je reviens vers vous très vite.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <Field label="Nom" error={errors.name?.message}>
                <input className="ipt" {...register("name")} />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input className="ipt" type="email" {...register("email")} />
              </Field>
              <Field label="Entreprise (optionnel)">
                <input className="ipt" {...register("company")} />
              </Field>
              <Field label="Budget" error={errors.budget?.message}>
                <select className="ipt" defaultValue="" {...register("budget")}>
                  <option value="" disabled>
                    Sélectionner…
                  </option>
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b} className="bg-obsidian-800">
                      {b}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Votre besoin" error={errors.message?.message}>
                <textarea rows={4} className="ipt resize-none" {...register("message")} />
              </Field>

              {serverError && <p className="text-sm text-red-400">{serverError}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-indigo px-6 py-3.5 font-medium text-white transition hover:bg-indigo-bright disabled:opacity-50"
              >
                {isSubmitting ? "Envoi…" : "Envoyer la demande"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .ipt {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          color: #ececf3;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .ipt:focus { border-color: rgba(167,139,250,0.7); }
      `}</style>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-foreground/50">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
