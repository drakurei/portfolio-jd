export interface FaqItem {
  q: string;
  a: string;
}

export const faq: FaqItem[] = [
  {
    q: "Quels types de projets réalisez‑vous ?",
    a: "Sites vitrines et landing pages premium, applications web full‑stack (Next.js), intégrations d'API, ainsi que des missions réseaux / cybersécurité. Du petit site élégant au projet sur‑mesure complet.",
  },
  {
    q: "Quels sont vos délais ?",
    a: "Une landing premium prend généralement 1 à 2 semaines ; un site full‑stack 3 à 6 semaines selon le périmètre. Je communique un planning clair dès le cadrage.",
  },
  {
    q: "Comment se déroule un projet ?",
    a: "1) Cadrage & audit de votre besoin · 2) Proposition (design + devis) · 3) Design & développement avec points réguliers · 4) Recette & mise en ligne · 5) Suivi. Vous validez à chaque étape.",
  },
  {
    q: "Quelles technologies utilisez‑vous ?",
    a: "Next.js / TypeScript / Tailwind pour le web, GSAP & Lenis pour les animations, Supabase pour le back‑end headless. Le choix s'adapte toujours à l'objectif et au budget.",
  },
  {
    q: "Proposez‑vous la maintenance ?",
    a: "Oui : corrections, évolutions et mises à jour. L'architecture headless permet aussi de modifier le contenu en autonomie, sans toucher au code.",
  },
  {
    q: "Comment fonctionnent les tarifs et le paiement ?",
    a: "Tarifs transparents à partir d'un montant clair selon la prestation (voir la page Tarifs), devis détaillé avant de commencer, paiement échelonné (acompte puis solde à la livraison).",
  },
  {
    q: "Travaillez‑vous à distance ?",
    a: "Oui, en France et à l'international. Basé à Évry (91), je travaille avec mes clients principalement à distance, avec des points visio réguliers.",
  },
];
