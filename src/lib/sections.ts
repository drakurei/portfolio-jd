export interface NavItem {
  id: string;
  label: string;
  index: string;
  href: string;
  section?: boolean; // ancre dans la home (observable)
}

export const NAV: NavItem[] = [
  { id: "hero", label: "Accueil", index: "01", href: "/#hero", section: true },
  { id: "strategy", label: "Stratégie", index: "02", href: "/#strategy", section: true },
  { id: "work", label: "Projets", index: "03", href: "/#work", section: true },
  { id: "contact", label: "Contact", index: "04", href: "/#contact", section: true },
  { id: "portfolio", label: "Portfolio", index: "05", href: "/portfolio" },
  { id: "cv", label: "CV", index: "06", href: "/cv" },
];

export const SECTION_IDS = NAV.filter((n) => n.section).map((n) => n.id);
