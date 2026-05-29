export interface Offer {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
}

export const offers: Offer[] = [
  {
    name: "Landing Premium",
    price: "à partir de 1 500€",
    tagline: "Une page qui convertit.",
    features: [
      "Design sur-mesure (Obsidian/Indigo)",
      "Animations GSAP & scroll fluide",
      "Optimisation LCP / SEO",
      "Responsive & accessible (WCAG AA)",
    ],
  },
  {
    name: "Site Full Stack",
    price: "à partir de 4 500€",
    tagline: "L'expérience complète.",
    features: [
      "Architecture Next.js multi-page",
      "CMS headless (Supabase)",
      "Intégrations API (GitHub, Stripe…)",
      "Moteur d'animation avancé",
      "Déploiement & monitoring",
    ],
    highlight: true,
  },
  {
    name: "Consulting / Audit",
    price: "sur devis",
    tagline: "Stratégie & performance.",
    features: [
      "Audit technique & UX 360°",
      "Plan d'optimisation chiffré",
      "Accompagnement architecture",
    ],
  },
];
