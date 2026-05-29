// Statistiques locales (sans backend) : vues de page + clics contact.
// Stockées en localStorage. Backend-ready : remplacer get/track par des
// appels Supabase (table analytics) sans changer les composants.
export interface SiteStats {
  views: number;
  byPath: Record<string, number>;
  contactClicks: number;
}

const KEY = "portfolio-jd-stats";

const empty: SiteStats = { views: 0, byPath: {}, contactClicks: 0 };

export function getStats(): SiteStats {
  if (typeof window === "undefined") return { ...empty };
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...empty, ...(JSON.parse(raw) as Partial<SiteStats>) } : { ...empty };
  } catch {
    return { ...empty };
  }
}

function save(s: SiteStats) {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(s));
}

export function trackView(path: string) {
  const s = getStats();
  s.views += 1;
  s.byPath[path] = (s.byPath[path] ?? 0) + 1;
  save(s);
}

export function trackContactClick() {
  const s = getStats();
  s.contactClicks += 1;
  save(s);
}

export function resetStats() {
  save({ ...empty, byPath: {} });
}
