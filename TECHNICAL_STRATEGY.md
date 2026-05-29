# TECHNICAL STRATEGY — Architecture & justification de valeur

> Document destiné aux clients de **Jonathan Davy**. Il détaille les décisions
> techniques de cette plateforme et **pourquoi elles justifient le prix** d'une
> prestation high-ticket. Une architecture solide n'est pas un coût : c'est une
> assurance sur la durée de vie et la rentabilité de votre produit.

---

## 1. Stack & rôle de chaque brique

| Couche | Technologie | Pourquoi |
| ------ | ----------- | -------- |
| Framework | **Next.js (App Router)** | SSR/SSG, routing fichier, route handlers, edge — un seul socle du front au back. |
| Langage | **TypeScript** | Sécurité de type = moins de bugs en production, refactors sereins. |
| Style | **Tailwind v4** | Design system tokenisé, cohérence et vélocité. |
| Animation | **GSAP** (ScrollTrigger, SplitText, ScrambleText, MorphSVG) | Le standard industriel du motion web, 60 fps, gratuit en commercial. |
| Scroll | **Lenis** | Smooth scroll inertiel synchronisé à ScrollTrigger pour un rendu « luxe ». |
| Données | **Architecture headless backend-ready (Supabase prévu)** | Contenu découplé, sécurité au niveau base, évolutivité. |
| PDF | **@react-pdf/renderer** | Génération de CV propre côté client, sans service externe. |
| Hébergement | **Vercel** | Déploiement edge mondial, scaling automatique, zéro ops. |

---

## 2. Architecture applicative

```
app/
  layout.tsx        → shell global (shader, grain, nav, smooth scroll)
  template.tsx      → transitions de page animées (GSAP)
  page.tsx          → home « tunnel » (Hero → Stratégie → Teaser → Contact)
  portfolio/        → liste filtrable + GitHub sync
  portfolio/[slug]/ → case studies (Challenge / Stratégie / Résultat)
  cv/               → CV interactif + export PDF + tarifs
  admin/            → console d'édition de contenu
  api/contact/      → validation serveur (Zod)
lib/                → services isolés (github, gsap, pdf, store) → backend-ready
content/            → source de vérité typée (cv, projets, tarifs)
```

**Principe directeur — séparation des responsabilités.** Le contenu (`content/`)
est isolé derrière des interfaces de service (`lib/`). Conséquence : passer du
stockage local à **Supabase** ne change que l'implémentation de 3 fonctions, pas
l'UI. C'est ce qui rend l'évolution **rapide et peu risquée** — donc moins chère
sur la durée.

---

## 3. Performance = revenu

- **SSR / SSG** : le HTML utile est rendu côté serveur → meilleur **LCP** et
  indexation Google complète (SEO natif).
- **Edge delivery (Vercel)** : servi au plus près de l'utilisateur, partout.
- **Animations GPU-friendly** : GSAP anime `transform`/`opacity`, respecte
  `prefers-reduced-motion`, et le shader WebGL est désactivé sur mobile / reduced-motion.
- **Code splitting** : les briques lourdes (PDF, WebGL) sont chargées **à la demande**.

> Repère industriel : **+100 ms** de latence peuvent coûter **~1 %** de conversion
> (Amazon). La performance n'est pas cosmétique, c'est de la marge.

---

## 4. Sécurité (architecture headless)

- **Surface d'attaque réduite** : pas de CMS monolithique exposant des plugins.
- **Validation au boundary** : toute entrée (formulaire contact) est validée par
  **Zod** côté serveur avant traitement.
- **Secrets côté serveur uniquement** : route handlers / variables d'environnement.
  Le navigateur ne voit jamais une clé sensible.
- **Phase Supabase** : *Row Level Security* PostgreSQL — les règles d'accès vivent
  dans la base, pas seulement dans le code.

---

## 5. Évolutivité — ce qui est déjà câblé

L'admin (`/admin`) édite aujourd'hui en local (localStorage + export JSON). La
**phase backend** ne demande aucune refonte :

1. Brancher Supabase dans `lib/admin-store.ts` (load/save → requêtes SQL).
2. Protéger `/admin` via middleware d'authentification.
3. `revalidatePath` pour refléter les changements en temps réel.
4. Activer l'envoi d'emails (Resend) dans `app/api/contact/route.ts` (déjà balisé).

---

## 6. Pourquoi ça justifie le prix

| Sans cette approche | Avec cette architecture |
| ------------------- | ----------------------- |
| Site figé, refonte tous les 18 mois | Plateforme qui évolue par incréments |
| SEO faible (rendu client) | Indexation complète, trafic organique |
| Sécurité dépendante de plugins | Sécurité au niveau données |
| Lenteur = abandons | Performance edge = conversion |
| Dette technique cachée | Code typé, testé au build, maintenable |

**Conclusion :** vous ne payez pas « un site ». Vous investissez dans un actif
numérique performant, sécurisé et évolutif — pensé pour rapporter, pas pour vieillir.

— **Jonathan Davy** · jonathandavy8@gmail.com · 06 01 30 88 41 · 91000 Évry
