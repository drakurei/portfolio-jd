import type { Project, ProjectCategory } from "@/lib/types";

export const CATEGORIES: ProjectCategory[] = ["Full Stack", "UI/UX", "Web3", "Creative"];

export const projects: Project[] = [
  {
    slug: "controle-acces-facial",
    title: "Contrôle d'accès par reconnaissance faciale",
    category: "Full Stack",
    description:
      "Système de contrôle d'accès temps réel conçu pour le Tribunal d'Évry : reconnaissance faciale embarquée, commande d'une gâche électrique, journalisation auditable.",
    stack: ["Python", "OpenCV", "Raspberry Pi", "MySQL", "RGPD"],
    audit:
      "Traitement 100% local (edge) pour la souveraineté des données biométriques — exigence RGPD critique en bâtiment public. OpenCV pour la reconnaissance, MySQL pour une journalisation auditable, enrôlement dynamique sans recompilation, gâche pilotée via GPIO avec fail-safe matériel.",
    challenge:
      "Sécuriser l'accès d'un bâtiment public sensible en temps réel, sans qu'aucune donnée biométrique ne quitte l'appareil — contrainte RGPD absolue.",
    strategy:
      "Architecture edge : toute la reconnaissance s'exécute sur le Raspberry Pi. Pipeline OpenCV optimisé pour le temps réel, base MySQL locale pour l'audit des passages, routine d'enrôlement à chaud.",
    result:
      "Système déployé et fonctionnel, conforme RGPD, avec journalisation complète des accès et ajout de visages sans interruption de service.",
    accent: "#6366f1",
    hero: true,
  },
  {
    slug: "parc-it-hospitalier",
    title: "Déploiement parc IT hospitalier (CHSF)",
    category: "Full Stack",
    description:
      "Industrialisation du déploiement de 88 imprimantes réseau et 12 postes Windows 10 intégrés à Active Directory, en environnement hospitalier sensible.",
    stack: ["Active Directory", "Windows 10", "TCP/IP", "GLPI"],
    audit:
      "Standardisation des plans d'adressage, création scriptée des comptes/UO AD, suivi de parc GLPI pour la traçabilité. Chaque intervention documentée pour l'auditabilité en milieu réglementé.",
    challenge:
      "Déployer un parc important rapidement tout en respectant des protocoles de confidentialité hospitaliers stricts.",
    strategy:
      "Plans d'adressage IP standardisés, scripts de création de comptes et d'unités d'organisation Active Directory, inventaire et suivi via GLPI.",
    result:
      "100 équipements déployés et intégrés au domaine, parc tracé de bout en bout, zéro incident de confidentialité.",
    accent: "#8b5cf6",
    hero: true,
  },
  {
    slug: "portfolio-immersif",
    title: "Plateforme portfolio immersive",
    category: "Creative",
    description:
      "Vitrine full-stack Next.js : moteur GSAP + Lenis, hub GitHub temps réel, console d'admin de contenu et formulaire de consulting validé côté serveur.",
    stack: ["Next.js", "TypeScript", "GSAP", "Lenis", "Tailwind"],
    audit:
      "Architecture headless backend-ready : contenu typé isolé derrière des interfaces de service. SSR pour le LCP, scroll Lenis synchronisé à ScrollTrigger, déployable edge sur Vercel.",
    challenge:
      "Créer une expérience qui prouve, par elle-même, un niveau d'exigence technique et créatif vendable en high-ticket.",
    strategy:
      "Moteur d'animation GSAP (SplitText, ScrambleText, MorphSVG), scroll piloté par Lenis, shaders WebGL, et architecture multi-page backend-ready.",
    result:
      "Un site narratif et performant servant de démonstration vivante de méthode auprès des clients.",
    accent: "#22d3ee",
    hero: true,
  },
  {
    slug: "ui-toolkit-glass",
    title: "Design system glassmorphism",
    category: "UI/UX",
    description:
      "Système de composants réutilisables (glass, bento, motion) pour des interfaces premium cohérentes et accessibles.",
    stack: ["Tailwind", "Figma", "GSAP"],
    audit:
      "Tokens de design centralisés, composants accessibles (WCAG AA), motion réutilisable respectant prefers-reduced-motion.",
    challenge:
      "Garantir la cohérence visuelle et l'accessibilité à travers de multiples interfaces.",
    strategy:
      "Tokens de couleur/spacing/typo centralisés, librairie de composants glass + bento, primitives d'animation partagées.",
    result:
      "Un design system cohérent accélérant la production tout en respectant les standards d'accessibilité.",
    accent: "#a855f7",
  },
];

export const heroProjects = projects.filter((p) => p.hero);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
