export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  /** placeholder = à remplacer par un vrai témoignage */
  placeholder?: boolean;
}

// ⚠️ Placeholders — à remplacer par de VRAIS témoignages clients.
// Ne pas publier de faux avis. Remplis quote/author/role puis retire placeholder.
export const testimonials: Testimonial[] = [
  {
    quote: "[Votre témoignage client ici — résultat obtenu, expérience de collaboration.]",
    author: "[Nom du client]",
    role: "[Poste / Entreprise]",
    placeholder: true,
  },
  {
    quote: "[Deuxième témoignage — qualité, délais, communication.]",
    author: "[Nom du client]",
    role: "[Poste / Entreprise]",
    placeholder: true,
  },
  {
    quote: "[Troisième témoignage — impact business, recommandation.]",
    author: "[Nom du client]",
    role: "[Poste / Entreprise]",
    placeholder: true,
  },
];
