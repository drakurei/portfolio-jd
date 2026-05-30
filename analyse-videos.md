# Analyse des vidéos de référence — ADN visuel retenu

> Synthèse de l'inspiration extraite des vidéos de `Desktop/idée de site` (35 captures,
> majoritairement des itérations de quelques sites de référence "Awwwards-level").
> Frames extraites via `ffmpeg` puis analysées. Cette synthèse guide la refonte
> **Clair & Luxe** du portfolio.

## Les sites de référence identifiés

| Réf | Style | Ce qu'on en retient |
| --- | ----- | ------------------- |
| **Maritime / Fort Energy** (141632) | Clair cinématique : hero brumeux (montagne), capitales **fines très espacées**, sections océan, texte **contour lumineux**, rayons | Élégance aérée, full-bleed, typo tracking large |
| **Ahmed Ragab** (164932 / s4) | Sombre, violet, **gras massif**, marquee "FULL STACK DEVELOPER ✦", 3D mannequin, nav flèches haut/bas | Typo monumentale, marquee, dashboard skills |
| **Éditorial "ERGONOMICS"** (s2) | **Clair** (vert pâle) + objet 3D + **mot géant en outline fantôme**, paragraphe fin à gauche | Texte oversize ghosté, layout éditorial asymétrique |
| **"WE MAKE / DON'T DRAMA"** (s6) | Sombre, **sans-serif ultra-massif**, contraste plein/fantôme, menu minimal | Force typographique, hiérarchie nette |
| **Reportage nature / Amazon** (s7) | **Clair luxe éditorial** : photo full-bleed, **corps de texte raffiné**, beaucoup de blanc | Magazine haut de gamme, respiration, sérénité |
| Manifest / Booster (s1, s3, s5) | Sombre, 3D chrome/glass, néon, chips vidéo inline | Profondeur, matière, micro-interactions |

## ADN commun
- **Typographie monumentale** : soit serif/éditoriale élégante, soit sans-serif massive. Toujours grande, soignée, hiérarchie forte.
- **Full-bleed** : image/vidéo/objet 3D qui occupe l'écran ; texte par-dessus.
- **Mots géants "fantômes"** (outline ou très faible opacité) en arrière-plan.
- **Beaucoup de blanc / d'espace négatif**, grille asymétrique, alignements précis.
- **Mouvement lourd et lent** : smooth scroll inertiel, reveals au scroll, parallaxe, pin.
- **Navigation minimale** (menu épuré, flèches, curseur custom).

## Traduction pour la refonte CLAIR & LUXE (Jonathan Davy)
Références motrices = **s7 (nature éditoriale claire)** + **s2 (outline ghost)** + l'aération de *Maritime*.
- **Palette** : blanc cassé chaud `#FAF8F3`, encre `#1B1813`, accents **or/champagne** `#BFA06A` (+ `#9A7B3F` pour le texte accent lisible).
- **Typo** : titres **serif élégante** (Playfair Display), corps sans-serif (Geist) ; espacements généreux.
- **Hero** : titre serif monumental, beaucoup de blanc, halo champagne subtil, reveal au scroll.
- **Mots fantômes oversize** (nom "DAVY", sections) en `foreground/[0.04]`.
- **Portfolio** : vidéo `neo.mp4` full-bleed + overlay clair pour lisibilité (seul moment "cinématique").
- **Mouvement** : Lenis (déjà `lerp:0.05`), GSAP reveals/pin/parallaxe — conservés, calmés pour le côté luxe.
- **Détails luxe** : filets fins or (`hairline`), bordures lumineuses discrètes, curseur custom or, transitions de page douces.

## Idées concrètes reprises
1. Sections en **plein écran** avec un grand titre serif + un filet or + un court paragraphe (façon magazine).
2. **Mot géant ghosté** derrière les sections clés.
3. **Marquee** discret (rôles / mots-clés) en or pâle.
4. **Reveal ligne par ligne** des titres (SplitText) — lent, élégant.
5. **Curseur** qui grossit sur les éléments cliquables (déjà en place, recoloré or).
