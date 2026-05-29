import type { CvData, Project } from "@/lib/types";
import { cv as defaultCv } from "@/content/cv";
import { offers as defaultOffers, type Offer } from "@/content/pricing";
import { projects as defaultProjects } from "@/content/projects";

// Interfaces de service isolées : backend-ready. Aujourd'hui localStorage ;
// demain remplacer load/save par des appels Supabase sans toucher l'UI admin.
const KEYS = {
  cv: "portfolio-jd-cv-draft",
  offers: "portfolio-jd-offers-draft",
  projects: "portfolio-jd-projects-draft",
} as const;

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return structuredClone(fallback);
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function save<T>(key: string, data: T): void {
  if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(data));
}

export const loadCv = () => load<CvData>(KEYS.cv, defaultCv);
export const saveCv = (d: CvData) => save(KEYS.cv, d);

export const loadOffers = () => load<Offer[]>(KEYS.offers, defaultOffers);
export const saveOffers = (d: Offer[]) => save(KEYS.offers, d);

export const loadProjects = () => load<Project[]>(KEYS.projects, defaultProjects);
export const saveProjects = (d: Project[]) => save(KEYS.projects, d);

export function resetAll() {
  if (typeof window === "undefined") return;
  Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
}

export function exportJson(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
