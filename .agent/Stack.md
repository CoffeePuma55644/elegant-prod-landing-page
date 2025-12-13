# 🛠️ Stack - Documentation Technique

## 📦 Vue d'ensemble de la Stack

**Elegant** est construit avec des technologies modernes et performantes, privilégiant la simplicité et la maintenabilité.

```
Frontend Framework : React 19
Build Tool        : Vite 7
Styling           : Tailwind CSS 4 + DaisyUI 5
Animations        : Motion (Framer Motion v12)
Icons             : Lucide React
Fonts             : @fontsource (Inter, Playfair Display)
Analytics         : Vercel Analytics & Speed Insights
Quality           : ESLint 9
Package Manager   : pnpm
```

---

## ⚛️ React 19

### Pourquoi React 19 ?

- **Nouvelles API** : Compiler, Actions, use()
- **Performances** : Amélioration du runtime
- **DX améliorée** : Meilleurs messages d'erreur
- **Concurrent Features** : Automatic batching, transitions

### Fonctionnalités Utilisées

```jsx
// Hooks standards
import { useState, useEffect, useRef } from 'react';

const Component = () => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  const ref = useRef(null);
  
  return <div ref={ref}>Content</div>;
};
```

### Best Practices React

```jsx
// ✅ BON : Functional components avec hooks
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  return <section>...</section>;
};

// ❌ MAUVAIS : Class components (déprécié)
class Hero extends React.Component {
  // Éviter
}
```

---

## ⚡ Vite 7

### Pourquoi Vite ?

- **HMR ultra-rapide** : Hot Module Replacement instantané
- **Build optimisé** : Rollup sous le capot
- **ES Modules natifs** : Pas de bundling en dev
- **Config minimale** : Zero-config par défaut

### Configuration

`vite.config.js` :
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
});
```

### Commandes

```bash
# Développement (HMR)
pnpm dev

# Build production
pnpm build

# Preview du build
pnpm preview
```

### Performance en Dev

- **Démarrage : < 1 seconde**
- **HMR : < 100ms**
- **No bundling** : Les modules sont chargés à la demande

---

## 🎨 Tailwind CSS 4 + DaisyUI 5

### Architecture CSS

```
Tailwind CSS 4    → Utility-first CSS framework
      +
DaisyUI 5         → Composants pré-stylés
      +
Custom Theme      → Variables CSS personnalisées
```

### Configuration Tailwind

`index.css` :
```css
@import "tailwindcss";
@plugin "daisyui";

@theme {
  /* Couleurs personnalisées Elegant */
  --color-elegant-50: #FAFAFA;
  --color-elegant-100: #F8F8FF;
  --color-elegant-200: #FFFFF0;
  --color-elegant-300: #FAF0E6;
  --color-elegant-400: #F0FFFF;
  --color-elegant-900: #1a1a1a;

  /* Fonts personnalisées */
  --font-sans: "Inter", sans-serif;
  --font-serif: "Playfair Display", serif;
}
```

### DaisyUI : Composants Disponibles

DaisyUI fournit des composants Tailwind prêts à l'emploi :

**Actions**
- `btn`, `btn-primary`, `btn-secondary`, `btn-ghost`
- `dropdown`, `modal`, `swap`

**Data Display**
- `card`, `card-body`, `card-title`
- `badge`, `avatar`, `stat`
- `table`, `progress`

**Navigation**
- `navbar`, `menu`, `breadcrumbs`
- `tabs`, `link`

**Layout**
- `drawer`, `footer`, `hero`
- `stack`, `divider`

**Feedback**
- `alert`, `loading`, `toast`

### Utilisation DaisyUI

```jsx
// ✅ Composant DaisyUI
const Card = ({ children }) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      {children}
    </div>
  </div>
);

// ✅ Bouton DaisyUI avec custom
<button className="btn btn-primary hover:scale-105 transition-transform">
  Click me
</button>
```

### Thème Custom "elegant"

```javascript
// tailwind.config.js ou daisyui config
daisyui: {
  themes: [
    {
      elegant: {
        "primary": "#1a1a1a",
        "secondary": "#FAFAFA",
        "accent": "#F0FFFF",
        "neutral": "#6B7280",
        "base-100": "#FFFFFF",
        "base-200": "#F9FAFB",
        "base-300": "#F3F4F6",
      }
    }
  ]
}
```

---

## 🎬 Motion (Framer Motion v12)

### Pourquoi Motion ?

- **Animations déclaratives** : Syntaxe intuitive
- **Performance** : GPU-accelerated
- **Gestures** : Drag, tap, hover
- **Scroll animations** : whileInView, useScroll
- **Orchestration** : Variants, stagger

### Installation

```json
{
  "dependencies": {
    "framer-motion": "^12.23.25",
    "motion": "^12.23.25"
  }
}
```

### API Principales

```jsx
import { motion } from 'framer-motion';

// Animation de base
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>

// Viewport triggered
<motion.section
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
>
  Section
</motion.section>

// Hover & Tap
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Button
</motion.button>
```

### Variants Pattern

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Voir `Animations.md` pour plus de détails.**

---

## 🎨 Lucide React

### Pourquoi Lucide ?

- **Icônes SVG modernes** : 1000+ icônes
- **Tree-shakable** : Import uniquement ce qui est utilisé
- **Customisable** : Size, color, strokeWidth
- **Performant** : Pas de font, juste du SVG

### Installation & Usage

```jsx
import { Palette, Code, Zap, ArrowRight, Menu, X } from 'lucide-react';

// Utilisation de base
<Palette size={24} color="#000" />

// Avec className Tailwind
<Code className="w-8 h-8 text-black" />

// Dans un composant
const ServiceCard = ({ icon, title }) => (
  <div className="flex items-center gap-4">
    <div className="p-3 bg-black/5 rounded-full">
      {icon}
    </div>
    <h3>{title}</h3>
  </div>
);

// Usage
<ServiceCard 
  icon={<Palette size={32} />} 
  title="Design UI/UX" 
/>
```

### Icônes Recommandées pour Elegant

**Services :**
- `Palette` : Design
- `Code` : Développement
- `Zap` : Performance
- `Smartphone` : Mobile
- `BarChart3` : Analytics/SEO
- `Sparkles` : Créativité
- `Laptop` : Web Development

**UI/Navigation :**
- `Menu`, `X` : Navigation mobile
- `ArrowRight`, `ArrowUpRight` : CTA
- `ChevronDown` : Dropdowns
- `ExternalLink` : Liens externes

**Actions :**
- `Send` : Contact
- `Download` : Télécharger
- `Share2` : Partager
- `Heart` : Like/Favori

---

## 🔤 Fonts (@fontsource)

### Fonts Utilisées

```json
{
  "dependencies": {
    "@fontsource/inter": "^5.2.8",
    "@fontsource/playfair-display": "^5.2.8"
  }
}
```

### Configuration

`main.jsx` :
```javascript
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/700.css';
```

`index.css` :
```css
@theme {
  --font-sans: "Inter", sans-serif;
  --font-serif: "Playfair Display", serif;
}
```

### Usage

```jsx
// Sans-serif (Inter) - Corps de texte
<p className="font-sans text-base">
  Texte en Inter
</p>

// Serif (Playfair Display) - Titres
<h1 className="font-serif text-5xl font-bold">
  Titre Élégant
</h1>
```

### Pourquoi Self-Hosted ?

✅ **Avantages :**
- Pas de dépendance à Google Fonts CDN
- Performance (pas de requête externe)
- RGPD-friendly (pas de tracking)
- Offline-ready

---

## 📊 Analytics & Performance

### Vercel Analytics

```jsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

**Fonctionnalités :**
- Page views
- Custom events
- User sessions
- Conversion tracking

### Vercel Speed Insights

```jsx
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <>
      <YourApp />
      <SpeedInsights />
    </>
  );
}
```

**Métriques :**
- **FCP** : First Contentful Paint
- **LCP** : Largest Contentful Paint
- **CLS** : Cumulative Layout Shift
- **FID** : First Input Delay
- **TTFB** : Time To First Byte

---

## 🧹 ESLint 9

### Configuration

`eslint.config.js` :
```javascript
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended],
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
```

### Commandes

```bash
# Vérifier
pnpm lint

# Auto-fix
pnpm lint -- --fix
```

### Règles Principales

- **No unused vars** : Pas de variables inutilisées
- **React Hooks rules** : Dépendances correctes
- **Component exports** : Export valides pour HMR

---

## 📁 Architecture des Dossiers

### Structure Actuelle

```
elegant-prod-landing-page/
├── .agent/                    # Documentation projet
│   ├── Instructions.md
│   ├── Principles.md
│   ├── Stack.md
│   └── ...
├── public/                    # Assets statiques
│   └── favicon.ico
├── src/
│   ├── assets/               # Images, SVG
│   ├── components/           # Composants React
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Testimonials.jsx
│   │   ├── FAQ.jsx
│   │   ├── CTA.jsx
│   │   └── Footer.jsx
│   ├── App.jsx              # Composant principal
│   ├── main.jsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── vite.config.js
```

### Structure Recommandée pour Scale

```
src/
├── components/
│   ├── ui/                   # Composants réutilisables
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   └── Badge.jsx
│   ├── sections/             # Sections de page
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   └── Portfolio.jsx
│   └── layout/               # Layout components
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       └── Container.jsx
├── utils/                    # Fonctions utilitaires
│   ├── animations.js
│   ├── classnames.js
│   └── constants.js
├── data/                     # Données statiques
│   ├── services.js
│   ├── projects.js
│   └── testimonials.js
├── hooks/                    # Custom hooks
│   ├── useScroll.js
│   └── useMediaQuery.js
└── assets/                   # Images, fonts
    ├── images/
    └── icons/
```

---

## 💻 Style de Code

### Conventions de Nommage

```jsx
// Composants : PascalCase
const ServiceCard = () => {};

// Fonctions/Variables : camelCase
const handleClick = () => {};
const isActive = true;

// Constantes : SCREAMING_SNAKE_CASE
const MAX_ITEMS = 10;
const API_BASE_URL = "https://api.example.com";

// Fichiers : PascalCase pour composants, camelCase pour utils
ServiceCard.jsx
utils/animations.js
```

### Imports Order

```jsx
// 1. React
import React, { useState, useEffect } from 'react';

// 2. Librairies externes
import { motion } from 'framer-motion';
import { Palette, Code } from 'lucide-react';

// 3. Composants
import Button from './Button';
import Card from './Card';

// 4. Utils
import { cn } from '../utils/classnames';

// 5. Data
import { services } from '../data/services';

// 6. Styles (si nécessaire)
import './Component.css';
```

### Formatting

```jsx
// ✅ BON : JSX lisible
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="flex flex-col gap-4"
>
  <h1>Title</h1>
  <p>Content</p>
</motion.div>

// ❌ MAUVAIS : Tout sur une ligne
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4"><h1>Title</h1><p>Content</p></motion.div>
```

---

## 🚀 Build & Deployment

### Build Production

```bash
pnpm build
```

**Output :** Dossier `dist/` contenant :
- HTML optimisé
- CSS minifié
- JS minifié et code-splitted
- Assets avec hash pour cache-busting

### Preview Local

```bash
pnpm preview
```

Teste le build production localement sur `http://localhost:4173`.

### Optimisations Build

**Automatiques :**
- Minification (Terser)
- Tree-shaking
- Code-splitting
- Asset optimization
- CSS purging (Tailwind)

### Déploiement

**Plateformes Recommandées :**
- **Vercel** (recommandé pour analytics)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

**Configuration Vercel :**
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install"
}
```

---

## 📊 Performance

### Bundle Size

```bash
# Analyser le bundle
pnpm build && npx vite-bundle-visualizer
```

**Target Sizes :**
- JS total : < 200KB (gzipped)
- CSS total : < 50KB (gzipped)
- First Load : < 100KB

### Optimisations Actuelles

✅ **Code Splitting** : Vite automatique
✅ **Tree Shaking** : Imports named uniquement
✅ **Tailwind Purge** : CSS inutilisé supprimé
✅ **Self-hosted Fonts** : Pas de requêtes externes
✅ **SVG Icons** : Pas de font-icons lourdes

### Lighthouse Score Target

- **Performance** : > 90
- **Accessibility** : > 95
- **Best Practices** : > 95
- **SEO** : > 95

---

## 🔧 Commandes Utiles

### Development

```bash
# Installer les dépendances
pnpm install

# Démarrer le dev server
pnpm dev

# Linter le code
pnpm lint

# Auto-fix lint
pnpm lint -- --fix
```

### Production

```bash
# Build pour production
pnpm build

# Preview du build
pnpm preview
```

### Package Management

```bash
# Ajouter une dépendance
pnpm add package-name

# Ajouter une dev dependency
pnpm add -D package-name

# Mettre à jour les packages
pnpm update

# Nettoyer node_modules
rm -rf node_modules && pnpm install
```

---

## 🆘 Troubleshooting

### HMR ne fonctionne pas

```bash
# Nettoyer le cache Vite
rm -rf node_modules/.vite
pnpm dev
```

### Erreurs de build

```bash
# Nettoyer et rebuild
rm -rf dist node_modules/.vite
pnpm install
pnpm build
```

### Problèmes ESLint

```bash
# Vérifier la config
cat eslint.config.js

# Force restart ESLint (VSCode)
Cmd+Shift+P → "ESLint: Restart ESLint Server"
```

---

## 📚 Ressources

### Documentation Officielle

- **React** : https://react.dev
- **Vite** : https://vitejs.dev
- **Tailwind CSS** : https://tailwindcss.com
- **DaisyUI** : https://daisyui.com
- **Framer Motion** : https://www.framer.com/motion
- **Lucide React** : https://lucide.dev

### Outils Utiles

- **React DevTools** : Browser extension
- **Tailwind CSS IntelliSense** : VSCode extension
- **ES7+ React Snippets** : VSCode extension

---

## 🎉 Conclusion

Cette stack a été choisie pour :
- **Performance** : Vite + React 19
- **DX** : HMR, TypeScript support, ESLint
- **UI** : Tailwind + DaisyUI pour rapidité
- **Animations** : Motion pour des animations fluides
- **Maintenabilité** : Code propre, bien structuré

**Happy coding! 🚀**
