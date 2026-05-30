export interface Service {
  num: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    num: "01",
    title: "Sites & landing premium",
    tagline: "Des interfaces qui convertissent.",
    description:
      "Conception et développement de sites vitrines et landing pages sur‑mesure : design soigné, animations fluides (GSAP), performance et SEO. Du concept au déploiement.",
    deliverables: [
      "Design sur‑mesure & système de composants",
      "Animations & smooth scroll",
      "Optimisation performance / LCP / SEO",
      "Responsive & accessible (WCAG)",
      "Déploiement (Vercel / GitHub Pages)",
    ],
  },
  {
    num: "02",
    title: "Développement full‑stack",
    tagline: "Du front au back, un seul interlocuteur.",
    description:
      "Applications web complètes : architecture Next.js, intégration d'API, base de données et authentification. Headless, évolutif, sans dette technique.",
    deliverables: [
      "Architecture Next.js (App Router)",
      "CMS headless / base de données (Supabase)",
      "Intégrations API (GitHub, Stripe, e‑mail…)",
      "Espace d'administration",
      "Tests & mise en production",
    ],
  },
  {
    num: "03",
    title: "Réseaux & cybersécurité",
    tagline: "Des fondations solides et sûres.",
    description:
      "Audit et sécurisation : réseaux (TCP/IP, Active Directory), bonnes pratiques de sécurité, protection des données et conformité RGPD. Issu d'un parcours BTS CIEL.",
    deliverables: [
      "Audit réseau & infrastructure",
      "Sécurisation des accès & des données",
      "Conformité RGPD",
      "Support & maintenance",
    ],
  },
  {
    num: "04",
    title: "Conseil & audit",
    tagline: "Une vision technique au service du business.",
    description:
      "Audit technique et UX de l'existant, plan d'optimisation chiffré, accompagnement sur les choix d'architecture. Pour décider juste, avant d'investir.",
    deliverables: [
      "Audit technique & UX 360°",
      "Plan d'optimisation priorisé",
      "Recommandations d'architecture",
      "Accompagnement",
    ],
  },
];
