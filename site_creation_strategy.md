# Site Creation Strategy — Analyse & choix stratégiques

> Pourquoi ce site est structuré ainsi, et comment chaque décision sert un objectif :
> **transformer un visiteur en client high-ticket**. Document d'analyse de Jonathan Davy.

---

## 1. Le constat de départ

Un freelance qui vend des prestations premium ne se vend pas avec un « CV en ligne ».
Il se vend avec une **démonstration de méthode**. Le site lui-même doit être la
première preuve de compétence : s'il est lent, générique ou buggé, le discours
« je fais du haut de gamme » s'effondre.

**Décision fondatrice :** le site n'est pas une vitrine, c'est un *artefact de vente*.

---

## 2. Architecture de l'information (pourquoi ces pages)

| Page | Rôle dans le tunnel de vente |
| ---- | ---------------------------- |
| `/` (tunnel immersif) | **Capter & qualifier.** Choc visuel (intro), promesse (Hero), preuve de méthode (Bento Stratégie), désir (teaser projets), passage à l'action (Contact). |
| `/portfolio` | **Convaincre par la preuve.** Filtrage par expertise + sync GitHub = transparence et crédibilité technique. |
| `/portfolio/[slug]` | **Rassurer sur le ROI.** Format Challenge → Stratégie → Résultat : on vend un résultat business, pas du code. |
| `/cv` | **Légitimer.** Parcours, compétences, certifications, export PDF — pour les recruteurs/clients qui veulent du concret. |
| `/admin` | **Prouver le full-stack.** Une console d'édition montre qu'on maîtrise le back, pas seulement le front. |

Chaque page répond à une **objection** différente du prospect : « est-ce beau ? »,
« est-ce vrai ? », « ça donne quoi pour moi ? », « qui es-tu ? », « sais-tu coder ? ».

---

## 3. Le tunnel d'accueil — psychologie du scroll

1. **Intro (3 s max)** — crée une rupture, signale « ce n'est pas un site ordinaire ».
2. **Hero** — une promesse forte (« Bâtir l'audace digitale ») + un seul CTA. On ne disperse pas.
3. **Bento Stratégie** — on prouve qu'on *pense business* (Lighthouse, conversion, scalabilité), pas qu'on empile des technos.
4. **Teaser horizontal** — la rupture d'axe (scroll horizontal) relance l'attention juste avant le creux d'engagement, puis pousse vers le portfolio complet.
5. **Contact « consulting »** — pas un formulaire anodin : une « demande d'expertise » qui positionne le prospect comme client, pas comme curieux.

> Principe : **une intention par section, un appel à l'action clair.** La complexité
> technique sert l'émotion, jamais l'inverse.

---

## 4. Décisions techniques au service de la vente

- **Next.js (SSR/SSG)** → vitesse + SEO = on est trouvé, et la première impression est instantanée.
- **GSAP + Lenis** → le mouvement guide l'œil et allonge le temps de session (donc la mémorisation et la conversion).
- **Architecture headless backend-ready** → le site évolue sans refonte : un argument de pérennité vendable au client.
- **Accessibilité (`prefers-reduced-motion`, contrastes)** → on ne perd aucun prospect, et ça signale le professionnalisme.

---

## 5. Positionnement & ton

- **Palette « Deep Obsidian & Electric Indigo »** : sobriété + signature technologique. On évite le « coloré startup » au profit d'un registre premium/confiance.
- **Vocabulaire** : « stratégie », « audit », « levier business », « résultat ». On parle le langage du décideur qui paie, pas seulement du développeur.
- **Tarifs affichés** : la transparence filtre les prospects et ancre la valeur haut de gamme.

---

## 6. Mesure du succès (prochaines étapes)

- Brancher l'analytics (events sur le CTA Hero, ouverture des case studies, soumission contact).
- A/B tester la promesse du Hero.
- Connecter Supabase pour piloter le contenu sans déploiement.

**En résumé :** chaque pixel, chaque transition et chaque page a été pensé comme une
étape d'un tunnel de conversion. Le site ne décrit pas le travail de Jonathan Davy —
il *est* une démonstration de ce travail.

— **Jonathan Davy** · jonathandavy8@gmail.com · 06 01 30 88 41 · 91000 Évry
