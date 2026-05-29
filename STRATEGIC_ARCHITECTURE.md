# STRATEGIC ARCHITECTURE — Pourquoi ce site convertit

> Argumentaire client de Jonathan Davy. Ce document explique, preuves à l'appui,
> pourquoi les choix d'architecture de ce site en font une machine à convertir —
> et pourquoi ils valent leur prix.

---

## 1. Next.js + GSAP : le combo qui maximise la conversion

**La promesse :** vitesse + émotion. Deux leviers de conversion combinés.

- **Next.js (SSR/SSG, edge)** sert le contenu utile instantanément. Or la vitesse
  est directement corrélée au taux de conversion : Google montre qu'au‑delà de
  **3 s de chargement, plus de la moitié des visiteurs mobiles abandonnent**, et
  Amazon a chiffré qu'**100 ms de latence en moins ≈ +1 % de ventes**. Un site
  lent ne convertit pas, quel que soit son design.
- **GSAP** ajoute la couche émotionnelle : un parcours animé, rythmé, qui *raconte*
  au lieu de lister. L'attention est captée, guidée, maintenue jusqu'au call‑to‑action.

**Pourquoi « jusqu'à 4× » est crédible :** la conversion est multiplicative.
Si la performance double le nombre de visiteurs qui restent, et que la narration
animée double le taux de ceux qui passent à l'action, l'effet combiné se multiplie.
Un site générique laisse ces deux leviers sur la table.

> Note d'intégrité : ce sont des ordres de grandeur issus d'études publiques
> (Google/Amazon), pas une garantie contractuelle. Le gain réel dépend du trafic
> et de l'offre — mais la mécanique, elle, est éprouvée.

---

## 2. Psychologie des couleurs — analyse de la direction artistique

Palette : **Noir absolu (#000) · Blanc cassé (#f0f0f0) · Indigo/Violet électrique (#6366f1)**.

| Couleur | Effet psychologique | Rôle ici |
| ------- | ------------------- | -------- |
| **Noir** | Luxe, exclusivité, sérieux. Réduit le bruit visuel, concentre l'attention. | Fond dominant → positionne le service en « premium ». |
| **Blanc cassé** | Clarté, honnêteté, respiration. Moins agressif que le blanc pur. | Texte → lisibilité et confiance. |
| **Indigo/Violet** | Créativité + autorité technique. Le violet associe la rigueur (bleu) à l'innovation (rouge). | **Uniquement sur l'interactif** → l'œil apprend que « violet = action ». |

**Principe clé :** l'accent est *rare*. En réservant l'indigo aux seuls éléments
cliquables, on crée un **réflexe visuel** : le prospect sait instantanément où agir.
Moins de charge cognitive = plus de conversions.

---

## 3. La fluidité du scroll réduit le rebond

Le taux de rebond explose quand l'expérience est saccadée, lente ou désorientante.
Notre moteur de scroll (Lenis, `lerp: 0.05`) synchronisé à GSAP crée une **inertie
contrôlée** qui :

- **donne une sensation de qualité** dès la première molette — la première
  impression se joue en moins d'une seconde ;
- **guide le regard** d'une section à la suivante (pinning, scroll horizontal,
  reveals), supprimant le « mur de texte » qui fait fuir ;
- **récompense l'exploration** par des micro‑interactions (hover, distorsion,
  parallaxe), ce qui allonge le temps de session.

Plus de temps passé = plus de mémorisation = moins de rebond. Là encore, l'ampleur
(« jusqu'à −60 % ») dépend du contexte, mais la direction est constante : **un scroll
fluide et narratif retient, un scroll brut fait fuir.**

---

## 4. Ce que ça signifie pour votre projet

Vous n'achetez pas « un beau site ». Vous achetez une **architecture de conversion** :
- trouvée par Google (SSR/SEO),
- rapide donc non‑abandonnée (edge, LCP optimisé),
- mémorable donc différenciante (motion design),
- claire donc actionnable (psychologie des couleurs),
- évolutive donc durable (headless, backend‑ready).

Chaque décision technique sert une métrique business. C'est exactement la méthode
que j'appliquerai à votre produit.

— **Jonathan Davy** · jonathandavy8@gmail.com · 06 01 30 88 41 · 91000 Évry
