# Elegant Production Landing Page

Un landing page moderne, élégant et prêt pour la production, construit avec React et Vite. Le projet met l’accent sur les performances (HMR, build rapide), une UI soignée (Tailwind + DaisyUI) et des animations fluides (Framer Motion).

## À propos du projet

Ce repository contient une application React orientée « landing page » avec une structure simple à prendre en main. Elle intègre des polices de caractères auto‑hébergées, des icônes, des animations et des outils d’observabilité pour suivre les performances en production.

## Stack technique

- React 19
- Vite 7
- Tailwind CSS 4 + plugin `@tailwindcss/vite`
- DaisyUI 5 (bibliothèque de composants Tailwind)
- Framer Motion / Motion (animations)
- Lucide React (icônes SVG)
- @fontsource/inter, @fontsource/playfair-display (polices)
- @vercel/analytics et @vercel/speed-insights (analytics et performance)
- ESLint 9 (qualité de code)

## Prérequis

- Node.js ≥ 18 (LTS recommandé)
- pnpm ≥ 8 (gestionnaire de paquets officiel du projet)
- Git

Vérifiez vos versions:

```bash
node -v
pnpm -v
```

Pour installer pnpm si vous ne l'avez pas:

```bash
npm install -g pnpm
```

## Démarrage rapide (développement)

1. Cloner le repo et entrer dans le dossier:
   ```bash
   git clone https://github.com/CoffeePuma55644/elegant-prod-landing-page.git
   cd elegant-prod-landing-page
   ```
2. Installer les dépendances:
   ```bash
   pnpm install
   ```
3. Lancer le serveur de dev (HMR):
   ```bash
   pnpm dev
   ```
   Par défaut l'app sera disponible sur `http://localhost:5173`.

## Scripts disponibles

- `pnpm dev` — lance le serveur de développement
- `pnpm build` — génère un build de production optimisé
- `pnpm preview` — prévisualise localement le build production
- `pnpm lint` — exécute ESLint sur le projet

## Linting et qualité de code

Vérifier les problèmes de lint:
```bash
pnpm lint
```

(Optionnel) Corriger automatiquement quand c'est possible:
```bash
pnpm lint -- --fix
```

## Structure (générale)

```
elegant-prod-landing-page/
├─ src/              # Code source (composants, styles, etc.)
├─ public/           # Assets statiques
├─ package.json      # Dépendances et scripts
└─ README.md         # Ce fichier
```

## Build et déploiement

Créer un build de production:
```bash
pnpm build
```
Le dossier `dist/` contient les fichiers statiques à déployer (Vercel, Netlify, GitHub Pages, S3, etc.).

## Contribution

1. Créez une branche: `git checkout -b feature/ma-feature`
2. Développez et testez localement
3. Assurez-vous que le lint passe: `pnpm lint`
4. Ouvrez une Pull Request avec une description claire
