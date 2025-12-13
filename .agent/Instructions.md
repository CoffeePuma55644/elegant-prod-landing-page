# 📘 Instructions - Projet Elegant

## 🎯 Vue d'ensemble

**Elegant** est une landing page moderne pour une mini agence de création de sites web. Le projet met l'accent sur :
- Un design minimaliste et professionnel
- Des performances optimales (React 19 + Vite)
- Une expérience utilisateur fluide avec des animations subtiles
- Une architecture de code maintenable et évolutive

**Objectif principal** : Présenter les services de l'agence, attirer des clients potentiels, et montrer le portfolio de réalisations.

---

## 🏗️ Architecture des Composants

Nous suivons une architecture hiérarchique inspirée d'Atomic Design :

### 📐 Hiérarchie

```
Atoms (Éléments de base)
  ↓
Molecules (Combinaisons d'atoms)
  ↓
Sections (Blocs de contenu)
  ↓
Pages (App complète)
```

### Structure Actuelle

```
src/
├── components/          # Composants sections
│   ├── Navbar.jsx      # Navigation principale
│   ├── Hero.jsx        # Section hero avec CTA
│   ├── ProblemSolution.jsx
│   ├── Services.jsx    # Grille de services
│   ├── Portfolio.jsx   # Projets réalisés
│   ├── Testimonials.jsx
│   ├── FAQ.jsx         # Questions fréquentes
│   ├── CTA.jsx         # Call-to-action final
│   └── Footer.jsx      # Pied de page
├── assets/             # Images et ressources statiques
├── App.jsx             # Composant principal
├── main.jsx            # Point d'entrée
└── index.css           # Styles globaux & thème
```

---

## 🎨 Design System : DaisyUI First

### Principe Fondamental

**Toujours utiliser DaisyUI en premier**, sauf si :
- Le composant nécessite une personnalisation complexe
- DaisyUI n'offre pas le comportement souhaité
- Les performances sont impactées négativement

### Composants DaisyUI Disponibles

Utilise ces composants quand c'est possible :
- `btn`, `btn-primary`, `btn-ghost`
- `card`, `card-body`, `card-title`
- `navbar`, `menu`
- `footer`
- `badge`, `avatar`
- `modal`, `drawer`

### Exemple d'Utilisation

```jsx
// ✅ BON : Utilise DaisyUI
const Button = ({ children }) => (
  <button className="btn btn-primary">
    {children}
  </button>
);

// ❌ MAUVAIS : Réinvente la roue
const Button = ({ children }) => (
  <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
    {children}
  </button>
);
```

---

## 🔄 Principe DRY (Don't Repeat Yourself)

### Règle d'Or

**Si tu écris le même code 2 fois, crée un composant.**

### Exemple Concret

```jsx
// ❌ MAUVAIS : Code répétitif
const Services = () => (
  <div>
    <div className="p-8 bg-white rounded shadow">
      <Palette size={32} />
      <h3>Design UI/UX</h3>
      <p>Description...</p>
    </div>
    <div className="p-8 bg-white rounded shadow">
      <Code size={32} />
      <h3>Développement</h3>
      <p>Description...</p>
    </div>
  </div>
);

// ✅ BON : Composant réutilisable
const ServiceCard = ({ icon, title, description }) => (
  <div className="p-8 bg-white rounded shadow">
    {icon}
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Services = () => {
  const services = [
    { icon: <Palette size={32} />, title: "Design UI/UX", description: "..." },
    { icon: <Code size={32} />, title: "Développement", description: "..." }
  ];
  
  return (
    <div>
      {services.map((service, i) => (
        <ServiceCard key={i} {...service} />
      ))}
    </div>
  );
};
```

---

## 📊 Séparation des Données

### Principe

Les données doivent être séparées de la logique UI pour faciliter :
- La maintenance du contenu
- L'internationalisation future
- L'intégration avec un CMS ou API
- Les tests

### Pattern Recommandé

```jsx
// ✅ BON : Données en haut du fichier
const projects = [
  {
    title: "Architecture Moderne",
    category: "Site Vitrine",
    image: "https://picsum.photos/800/600?random=1"
  },
  {
    title: "Kinshasa Finance",
    category: "Plateforme Corporate",
    image: "https://picsum.photos/800/600?random=2"
  }
];

const Portfolio = () => (
  <section>
    {projects.map((project, i) => (
      <ProjectCard key={i} {...project} />
    ))}
  </section>
);
```

**📝 Voir `DataSeparation.md` pour plus de détails.**

---

## 🎬 Animations avec Motion

Nous utilisons **Motion** (Framer Motion v12) pour toutes les animations.

### Guidelines

- Animations subtiles et élégantes (éviter le "too much")
- Performance : utiliser `transform` et `opacity` uniquement
- Viewport-triggered avec `whileInView` pour les sections
- Timing cohérent : `duration: 0.6-0.8s`

### Exemple Standard

```jsx
import { motion } from 'framer-motion';

const Hero = () => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h1>Bienvenue</h1>
  </motion.section>
);
```

**📝 Voir `Animations.md` pour les patterns complets.**

---

## 📁 Organisation des Fichiers

### Règles

1. **Un composant = Un fichier**
2. **Nom du fichier = Nom du composant** (PascalCase)
3. **Exporter en default** pour les composants principaux
4. **Grouper les composants liés** dans des sous-dossiers si nécessaire

### Structure Recommandée pour Croissance

```
src/
├── components/
│   ├── ui/                    # Composants réutilisables
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── IconBadge.jsx
│   ├── sections/              # Sections de page
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   └── Portfolio.jsx
│   └── layout/                # Layout components
│       ├── Navbar.jsx
│       └── Footer.jsx
├── utils/                     # Utilitaires
│   └── animations.js
├── data/                      # Données statiques
│   ├── services.js
│   └── projects.js
└── assets/                    # Images, fonts, etc.
```

**Note :** Actuellement tous les composants sont dans `/components` à plat, ce qui est acceptable pour un petit projet.

---

## 📱 Design Responsive (Mobile-First)

### Breakpoints Tailwind

```css
sm:  640px   /* Petites tablettes */
md:  768px   /* Tablettes */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

### Approche Mobile-First

```jsx
// ✅ BON : Mobile par défaut, desktop en override
<div className="flex-col md:flex-row gap-4 md:gap-8">

// ❌ MAUVAIS : Desktop par défaut
<div className="flex-row sm:flex-col gap-8 sm:gap-4">
```

### Checklist Responsive

- [ ] Tester sur mobile (375px minimum)
- [ ] Tester sur tablette (768px)
- [ ] Tester sur desktop (1280px+)
- [ ] Vérifier les images (aspect-ratio, object-fit)
- [ ] Vérifier la navigation mobile (hamburger menu)
- [ ] Vérifier les espacements (padding/margin)

---

## ⚙️ Commandes de Build

### Installation

```bash
pnpm install
```

### Développement

```bash
pnpm dev
# Ouvre http://localhost:5173
# Hot Module Replacement (HMR) activé
```

### Build Production

```bash
pnpm build
# Génère le dossier /dist optimisé
```

### Preview Production

```bash
pnpm preview
# Teste le build production localement
```

### Linting

```bash
# Vérifier les erreurs
pnpm lint

# Auto-fix
pnpm lint -- --fix
```

---

## 🎨 Thème et Couleurs

### Palette Elegant

Définie dans `index.css` via `@theme` :

```css
--color-elegant-50:  #FAFAFA  /* Fond principal */
--color-elegant-100: #F8F8FF  /* Variante lavande */
--color-elegant-200: #FFFFF0  /* Variante ivoire */
--color-elegant-300: #FAF0E6  /* Variante lin */
--color-elegant-400: #F0FFFF  /* Variante azure */
--color-elegant-900: #1a1a1a  /* Noir profond */
```

### Utilisation

```jsx
<div className="bg-[#FAFAFA] text-[#1a1a1a]">
  {/* Contenu */}
</div>
```

**📝 Voir `DesignSystem.md` pour le système complet.**

---

## 🧩 Structure d'un Composant Propre

### Template de Base

```jsx
import React from 'react';
import { Icon } from 'lucide-react';
import { motion } from 'framer-motion';

// 1. Données statiques en haut
const items = [
  { id: 1, title: "Item 1" },
  { id: 2, title: "Item 2" }
];

// 2. Composant principal
const MyComponent = () => {
  // 3. State et hooks
  const [state, setState] = React.useState(false);
  
  // 4. Fonctions handlers
  const handleClick = () => {
    setState(!state);
  };
  
  // 5. Render
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Contenu */}
      </div>
    </section>
  );
};

// 6. Export
export default MyComponent;
```

---

## 📚 Référence aux Autres Fichiers

Pour aller plus loin, consulte ces documents :

- **`Principles.md`** : Philosophie de code, best practices détaillées
- **`Stack.md`** : Documentation technique complète de la stack
- **`DesignSystem.md`** : Système de design, couleurs, typographie
- **`Components.md`** : Inventaire complet des composants UI
- **`Animations.md`** : Patterns d'animations Motion détaillés
- **`DataSeparation.md`** : Patterns de séparation données/UI

---

## ✅ Checklist Avant de Commiter

Avant chaque commit, vérifie :

- [ ] Le code respecte le principe DRY
- [ ] DaisyUI est utilisé quand c'est possible
- [ ] Les données sont séparées de l'UI
- [ ] Les animations sont subtiles et performantes
- [ ] Le design est responsive (mobile-first)
- [ ] Le linting passe (`pnpm lint`)
- [ ] Les noms de variables sont descriptifs
- [ ] Pas de `console.log()` oublié
- [ ] Les imports sont organisés (React → libs → local)

---

## 🚀 Workflow de Développement

### 1. Créer une Feature

```bash
git checkout -b feature/nouvelle-section
```

### 2. Développer

```bash
pnpm dev
# Développe avec HMR
```

### 3. Tester

- Tester sur différentes tailles d'écran
- Vérifier les animations
- Tester la navigation

### 4. Linter

```bash
pnpm lint -- --fix
```

### 5. Build

```bash
pnpm build
pnpm preview
```

### 6. Commit

```bash
git add .
git commit -m "feat: ajout section témoignages"
git push origin feature/nouvelle-section
```

---

## 🎉 Bienvenue dans le Projet !

Tu as maintenant toutes les clés pour contribuer efficacement au projet Elegant. N'hésite pas à consulter les autres fichiers `.agent/` pour approfondir ta compréhension.

**Happy Coding! 🚀**
