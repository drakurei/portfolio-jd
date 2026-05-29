"use client";

import { useEffect, useState } from "react";
import type { CvData, Project, ProjectCategory, SkillLevel } from "@/lib/types";
import type { Offer } from "@/content/pricing";
import { CATEGORIES } from "@/content/projects";
import {
  loadCv,
  saveCv,
  loadOffers,
  saveOffers,
  loadProjects,
  saveProjects,
  resetAll,
  exportJson,
} from "@/lib/admin-store";
import { getStats, resetStats, type SiteStats } from "@/lib/stats";
import AdminTerminal from "@/components/AdminTerminal";

const LEVELS: SkillLevel[] = ["Débutant", "Intermédiaire", "Avancé"];
type Tab = "cv" | "tarifs" | "projets" | "stats" | "terminal";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("cv");
  const [cv, setCv] = useState<CvData | null>(null);
  const [offers, setOffers] = useState<Offer[] | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setCv(loadCv());
    setOffers(loadOffers());
    setProjects(loadProjects());
    setStats(getStats());
  }, []);

  if (!cv || !offers || !projects) return null;

  const persist = () => {
    saveCv(cv);
    saveOffers(offers);
    saveProjects(projects);
    setSaved(true);
  };
  const dirty = () => setSaved(false);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Console Admin</p>
          <h1 className="text-3xl font-bold">Édition du contenu</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={persist} className="btn-primary">
            {saved ? "Enregistré ✓" : "Enregistrer"}
          </button>
          <button onClick={() => exportJson("cv.json", cv)} className="btn-ghost">
            Export CV
          </button>
          <button onClick={() => exportJson("pricing.json", offers)} className="btn-ghost">
            Export Tarifs
          </button>
          <button onClick={() => exportJson("projects.json", projects)} className="btn-ghost">
            Export Projets
          </button>
          <button
            onClick={() => {
              resetAll();
              setCv(loadCv());
              setOffers(loadOffers());
              setProjects(loadProjects());
              dirty();
            }}
            className="btn-ghost"
          >
            Réinitialiser
          </button>
        </div>
      </header>

      <p className="mb-8 rounded-xl border border-black/10 bg-black/5 p-4 text-sm text-black/50">
        Mode sans backend : modifications sauvegardées dans le navigateur (localStorage).
        Exportez le JSON et remplacez les fichiers de <code className="text-indigo-bright">src/content/</code>{" "}
        pour publier. La phase backend branchera Supabase + auth sur cette même interface.
      </p>

      <div className="mb-8 flex gap-2">
        {(["cv", "tarifs", "projets", "stats", "terminal"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-sm capitalize transition ${
              tab === t ? "bg-indigo text-white" : "border border-black/10 text-black/50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "cv" && (
        <>
          <Section title="Identité">
            <Input label="Titre" value={cv.identity.title} onChange={(v) => { setCv({ ...cv, identity: { ...cv.identity, title: v } }); dirty(); }} />
            <Input label="Tagline" value={cv.identity.tagline} onChange={(v) => { setCv({ ...cv, identity: { ...cv.identity, tagline: v } }); dirty(); }} />
            <Textarea label="Profil" value={cv.profile} onChange={(v) => { setCv({ ...cv, profile: v }); dirty(); }} />
          </Section>
          <Section title="Coordonnées">
            <Input label="Téléphone" value={cv.contact.phone} onChange={(v) => { setCv({ ...cv, contact: { ...cv.contact, phone: v } }); dirty(); }} />
            <Input label="Email" value={cv.contact.email} onChange={(v) => { setCv({ ...cv, contact: { ...cv.contact, email: v } }); dirty(); }} />
            <Input label="Adresse" value={cv.contact.address} onChange={(v) => { setCv({ ...cv, contact: { ...cv.contact, address: v } }); dirty(); }} />
            <Input label="LinkedIn" value={cv.contact.linkedin} onChange={(v) => { setCv({ ...cv, contact: { ...cv.contact, linkedin: v } }); dirty(); }} />
          </Section>
          <Section title="Compétences">
            {Object.entries(cv.skills).map(([cat, skills]) => (
              <div key={cat} className="mb-6">
                <h3 className="mb-3 font-mono text-sm uppercase tracking-widest text-indigo-bright">{cat}</h3>
                <div className="space-y-2">
                  {skills.map((sk, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <input className="ipt flex-1" value={sk.name} onChange={(e) => { const c = structuredClone(cv); c.skills[cat][i].name = e.target.value; setCv(c); dirty(); }} />
                      <select className="ipt w-44" value={sk.level} onChange={(e) => { const c = structuredClone(cv); c.skills[cat][i].level = e.target.value as SkillLevel; setCv(c); dirty(); }}>
                        {LEVELS.map((l) => <option key={l} value={l} className="bg-obsidian-800">{l}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Section>
        </>
      )}

      {tab === "tarifs" && (
        <Section title="Offres & Tarifs">
          {offers.map((o, i) => (
            <div key={i} className="mb-5 rounded-xl border border-black/10 p-4">
              <Input label="Nom" value={o.name} onChange={(v) => { const c = structuredClone(offers); c[i].name = v; setOffers(c); dirty(); }} />
              <Input label="Prix" value={o.price} onChange={(v) => { const c = structuredClone(offers); c[i].price = v; setOffers(c); dirty(); }} />
              <Input label="Accroche" value={o.tagline} onChange={(v) => { const c = structuredClone(offers); c[i].tagline = v; setOffers(c); dirty(); }} />
            </div>
          ))}
        </Section>
      )}

      {tab === "projets" && (
        <Section title="Projets">
          {projects.map((p, i) => (
            <div key={p.slug} className="mb-5 rounded-xl border border-black/10 p-4">
              <Input label="Titre" value={p.title} onChange={(v) => { const c = structuredClone(projects); c[i].title = v; setProjects(c); dirty(); }} />
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wider text-black/50">Catégorie</span>
                <select className="ipt w-full" value={p.category} onChange={(e) => { const c = structuredClone(projects); c[i].category = e.target.value as ProjectCategory; setProjects(c); dirty(); }}>
                  {CATEGORIES.map((cat) => <option key={cat} value={cat} className="bg-obsidian-800">{cat}</option>)}
                </select>
              </label>
              <Textarea label="Description" value={p.description} onChange={(v) => { const c = structuredClone(projects); c[i].description = v; setProjects(c); dirty(); }} />
            </div>
          ))}
        </Section>
      )}

      {tab === "stats" && stats && (
        <Section title="Statistiques (locales)">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-black/10 bg-black/5 p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-black/40">Vues totales</p>
              <p className="mt-1 text-3xl font-bold text-indigo-bright">{stats.views}</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-black/5 p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-black/40">Clics contact</p>
              <p className="mt-1 text-3xl font-bold text-indigo-bright">{stats.contactClicks}</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-black/5 p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-black/40">Pages suivies</p>
              <p className="mt-1 text-3xl font-bold text-indigo-bright">
                {Object.keys(stats.byPath).length}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 font-mono text-sm uppercase tracking-widest text-indigo-bright">
              Vues par page
            </p>
            <div className="space-y-2">
              {Object.entries(stats.byPath).length === 0 && (
                <p className="text-sm text-black/40">Aucune donnée pour l&apos;instant.</p>
              )}
              {Object.entries(stats.byPath).map(([path, n]) => (
                <div key={path} className="flex items-center justify-between text-sm">
                  <span className="font-mono text-black/70">{path}</span>
                  <span className="text-indigo-bright">{n}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              resetStats();
              setStats(getStats());
            }}
            className="btn-ghost mt-6"
          >
            Réinitialiser les stats
          </button>

          <p className="mt-4 text-xs text-black/40">
            Mesure locale (ce navigateur). En phase backend, ces compteurs viendront de Supabase
            pour un suivi global.
          </p>
        </Section>
      )}

      {tab === "terminal" && (
        <Section title="Terminal — push CV">
          <p className="mb-4 text-sm text-black/50">
            Modifiez et déployez votre CV en ligne de commande. Ex :{" "}
            <code className="text-indigo-bright">cv.set title &quot;Architecte Full Stack&quot;</code>{" "}
            puis <code className="text-indigo-bright">push</code>.
          </p>
          <AdminTerminal />
        </Section>
      )}

      <style>{`
        .ipt { border-radius:.6rem; border:1px solid rgba(20,20,40,.12); background:rgba(255,255,255,.8); padding:.55rem .8rem; font-size:.9rem; color:#1b1b2b; outline:none; }
        .ipt:focus { border-color:rgba(124,58,237,.6); }
        .btn-primary { border-radius:9999px; background:#6366f1; padding:.6rem 1.2rem; font-size:.85rem; color:#fff; }
        .btn-ghost { border-radius:9999px; border:1px solid rgba(20,20,40,.18); padding:.6rem 1.2rem; font-size:.85rem; color:#5b5b6e; }
      `}</style>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass mb-6 p-6">
      <h2 className="mb-5 text-xl font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-black/50">{label}</span>
      <input className="ipt w-full" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-black/50">{label}</span>
      <textarea rows={4} className="ipt w-full resize-none" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
