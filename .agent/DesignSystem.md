# 🎨 Design System - Elegant

## 🎯 Vue d'ensemble

Le design system d'Elegant est basé sur les principes du **minimalisme élégant**, avec une palette de couleurs neutres et sophistiquées, une typographie contrastée (sans-serif + serif), et un système d'espacement cohérent.

**Philosophie :** Moins c'est plus. Chaque élément a sa raison d'être.

---

## 🎨 Palette de Couleurs

### Couleurs Principales

Définies dans `index.css` via `@theme` :

```css
@theme {
  /* Backgrounds élégants */
  --color-elegant-50: #FAFAFA;   /* Blanc cassé principal */
  --color-elegant-100: #F8F8FF;  /* Lavande subtil */
  --color-elegant-200: #FFFFF0;  /* Ivoire doux */
  --color-elegant-300: #FAF0E6;  /* Lin naturel */
  --color-elegant-400: #F0FFFF;  /* Azure léger */
  
  /* Texte et accents */
  --color-elegant-900: #1a1a1a;  /* Noir profond */
}
```

### Utilisation dans Tailwind

```jsx
// Backgrounds
<div className="bg-[#FAFAFA]">     {/* Background principal */}
<div className="bg-[#F8F8FF]">     {/* Variante lavande */}
<div className="bg-[#FFFFF0]">     {/* Variante ivoire */}
<div className="bg-[#FAF0E6]">     {/* Variante lin */}
<div className="bg-[#F0FFFF]">     {/* Variante azure */}

// Texte
<p className="text-[#1a1a1a]">     {/* Texte principal */}
<p className="text-gray-600">       {/* Texte secondaire */}
<p className="text-gray-400">       {/* Texte muted */}
```

### Thème DaisyUI Custom

```javascript
// Configuration DaisyUI (à ajouter si besoin)
daisyui: {
  themes: [
    {
      elegant: {
        "primary": "#1a1a1a",        // Noir profond
        "secondary": "#FAFAFA",      // Blanc cassé
        "accent": "#F0FFFF",         // Azure
        "neutral": "#6B7280",        // Gris neutre
        "base-100": "#FFFFFF",       // Blanc pur
        "base-200": "#F9FAFB",       // Gris très clair
        "base-300": "#F3F4F6",       // Gris clair
        "info": "#3B82F6",
        "success": "#10B981",
        "warning": "#F59E0B",
        "error": "#EF4444",
      }
    }
  ]
}
```

### Palette Étendue (Tailwind par défaut)

**Noirs et Gris :**
```jsx
text-black         // #000000
text-gray-900      // #111827
text-gray-800      // #1F2937
text-gray-700      // #374151
text-gray-600      // #4B5563
text-gray-500      // #6B7280
text-gray-400      // #9CA3AF
text-gray-300      // #D1D5DB
text-gray-200      // #E5E7EB
text-gray-100      // #F3F4F6
text-white         // #FFFFFF
```

**Couleurs d'Accent (si besoin) :**
```jsx
// Success / Positif
text-green-500     // #10B981
bg-green-50        // #F0FDF4

// Warning / Attention
text-yellow-500    // #F59E0B
bg-yellow-50       // #FFFBEB

// Error / Danger
text-red-500       // #EF4444
bg-red-50          // #FEF2F2
```

---

## 📏 Système d'Espacement

### Échelle de Base

Tailwind utilise une échelle de `0.25rem` (4px) :

```
0   → 0px
1   → 4px
2   → 8px
3   → 12px
4   → 16px
5   → 20px
6   → 24px
8   → 32px
10  → 40px
12  → 48px
16  → 64px
20  → 80px
24  → 96px
32  → 128px
```

### Espacements Recommandés Elegant

**Components Internes :**
```jsx
gap-2   // 8px  - Éléments très proches (icon + text)
gap-4   // 16px - Éléments liés (form fields)
gap-6   // 24px - Sections de card
gap-8   // 32px - Cards dans une grille
```

**Sections :**
```jsx
py-12   // 48px  - Petites sections
py-16   // 64px  - Sections moyennes
py-20   // 80px  - Sections standards
py-24   // 96px  - Grandes sections
py-32   // 128px - Sections hero
```

**Containers :**
```jsx
px-4    // 16px - Mobile (min)
px-6    // 24px - Mobile standard
px-8    // 32px - Tablet
px-12   // 48px - Desktop
```

### Exemple d'Application

```jsx
// ✅ BON : Espacement cohérent
const ServiceCard = ({ icon, title, description }) => (
  <div className="p-8 bg-white rounded-sm">          {/* Padding card */}
    <div className="mb-6">                           {/* Marge icon */}
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">         {/* Marge titre */}
      {title}
    </h3>
    <p className="text-gray-600">
      {description}
    </p>
  </div>
);

// Section avec spacing cohérent
<section className="py-24">                          {/* Section padding */}
  <div className="max-w-7xl mx-auto px-6">          {/* Container */}
    <div className="mb-16">                          {/* Header margin */}
      <h2>Title</h2>
    </div>
    <div className="grid md:grid-cols-3 gap-8">     {/* Grid gap */}
      {/* Cards */}
    </div>
  </div>
</section>
```

---

## 🔤 Typographie

### Fonts

```css
@theme {
  --font-sans: "Inter", sans-serif;
  --font-serif: "Playfair Display", serif;
}
```

### Hiérarchie des Tailles

**Titres (Serif) :**
```jsx
<h1 className="font-serif text-5xl md:text-7xl font-bold">
  // Hero Title - 48px → 72px
</h1>

<h2 className="font-serif text-3xl md:text-5xl font-bold">
  // Section Title - 30px → 48px
</h2>

<h3 className="font-serif text-xl md:text-2xl font-bold">
  // Card Title - 20px → 24px
</h3>
```

**Corps de Texte (Sans-serif) :**
```jsx
<p className="text-lg md:text-xl text-gray-600">
  // Lead paragraph - 18px → 20px
</p>

<p className="text-base text-gray-600">
  // Body text - 16px
</p>

<p className="text-sm text-gray-500">
  // Small text - 14px
</p>

<span className="text-xs uppercase tracking-wider text-gray-500">
  // Labels - 12px
</span>
```

### Font Weights

```jsx
font-light     // 300 - Texte subtil
font-normal    // 400 - Texte standard
font-medium    // 500 - Emphasis légère
font-semibold  // 600 - Sous-titres
font-bold      // 700 - Titres
```

### Line Heights

```jsx
leading-none      // 1.0   - Titres serrés
leading-tight     // 1.25  - Grands titres
leading-snug      // 1.375 - Petits titres
leading-normal    // 1.5   - Corps de texte
leading-relaxed   // 1.625 - Texte aéré
leading-loose     // 2.0   - Texte très aéré
```

### Exemple Complet

```jsx
const Hero = () => (
  <section>
    {/* Badge */}
    <span className="text-xs font-medium tracking-wide uppercase text-gray-600">
      Agence Web Premium
    </span>
    
    {/* Title */}
    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-6">
      Votre site web ne doit pas seulement être beau.
      <span className="italic font-light text-gray-600"> Il doit convertir.</span>
    </h1>
    
    {/* Lead */}
    <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
      Nous transformons votre vision en une expérience digitale inoubliable.
    </p>
  </section>
);
```

---

## 🧩 Composants DaisyUI Utilisés

### Buttons

```jsx
// Primary
<button className="btn btn-primary">
  Click me
</button>

// Secondary
<button className="btn btn-secondary">
  Secondary
</button>

// Ghost
<button className="btn btn-ghost">
  Ghost
</button>

// Custom avec DaisyUI base
<button className="btn bg-black text-white hover:bg-gray-800">
  Custom
</button>
```

### Cards

```jsx
// Card standard
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>Card content goes here</p>
  </div>
</div>

// Card avec image
<div className="card bg-base-100 shadow-xl">
  <figure>
    <img src="image.jpg" alt="Alt text" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Title</h2>
    <p>Content</p>
  </div>
</div>
```

### Navbar

```jsx
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <a className="btn btn-ghost text-xl">Logo</a>
  </div>
  <div className="navbar-center">
    <ul className="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <button className="btn btn-primary">Action</button>
  </div>
</div>
```

### Footer

```jsx
<footer className="footer footer-center p-10 bg-base-200 text-base-content">
  <nav className="grid grid-flow-col gap-4">
    <a className="link link-hover">About</a>
    <a className="link link-hover">Contact</a>
  </nav>
  <aside>
    <p>Copyright © 2024 - Elegant</p>
  </aside>
</footer>
```

---

## 📐 Layout System

### Container Sizes

```jsx
// Standard container
<div className="max-w-7xl mx-auto px-6 md:px-12">
  {/* Content - Max 1280px */}
</div>

// Narrow container
<div className="max-w-4xl mx-auto px-6">
  {/* Content - Max 896px */}
</div>

// Wide container
<div className="max-w-screen-2xl mx-auto px-6 md:px-12">
  {/* Content - Max 1536px */}
</div>
```

### Grid Layouts

```jsx
// 2 colonnes
<div className="grid md:grid-cols-2 gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

// 3 colonnes
<div className="grid md:grid-cols-3 gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

// 4 colonnes (services)
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {services.map(service => (
    <ServiceCard key={service.id} {...service} />
  ))}
</div>

// Grid asymétrique
<div className="grid md:grid-cols-3 gap-8">
  <div className="md:col-span-2">Main content</div>
  <div>Sidebar</div>
</div>
```

### Flexbox Layouts

```jsx
// Centré verticalement et horizontalement
<div className="flex items-center justify-center min-h-screen">
  <div>Centered content</div>
</div>

// Space between
<div className="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

// Responsive flex direction
<div className="flex flex-col md:flex-row gap-8">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## 🎯 Buttons : Variants & Sizes

### Variants

```jsx
// Primary (action principale)
<button className="bg-black text-white px-8 py-4 rounded-sm font-medium hover:bg-gray-800 transition-colors">
  Démarrer un projet
</button>

// Secondary (action secondaire)
<button className="bg-white text-black px-8 py-4 rounded-sm font-medium border border-gray-200 hover:border-gray-400 transition-colors">
  En savoir plus
</button>

// Ghost (action tertiaire)
<button className="text-black px-8 py-4 font-medium hover:bg-gray-100 transition-colors">
  Annuler
</button>

// Avec icône
<button className="group bg-black text-white px-8 py-4 rounded-sm font-medium hover:bg-gray-800 flex items-center gap-2">
  Continuer
  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
</button>
```

### Sizes

```jsx
// Small
<button className="px-4 py-2 text-sm">
  Small Button
</button>

// Medium (default)
<button className="px-8 py-4 text-base">
  Medium Button
</button>

// Large
<button className="px-10 py-5 text-lg">
  Large Button
</button>
```

### States

```jsx
// Hover
<button className="hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all">
  Hover me
</button>

// Active / Pressed
<button className="active:scale-95 transition-transform">
  Click me
</button>

// Disabled
<button className="opacity-50 cursor-not-allowed" disabled>
  Disabled
</button>

// Loading
<button className="relative opacity-70" disabled>
  <span className="opacity-0">Text</span>
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
  </div>
</button>
```

---

## ✨ Shadows & Borders

### Shadows

```jsx
// Light shadows (subtil)
shadow-sm     // Cards légers
shadow        // Cards standards
shadow-lg     // Cards highlighted

// Heavy shadows (emphasis)
shadow-xl     // Modals, popovers
shadow-2xl    // Hero elements

// Hover effects
<div className="shadow-lg hover:shadow-2xl transition-shadow">
  Hover for more shadow
</div>
```

### Borders

```jsx
// Borders standards
border border-gray-100       // Border très subtil
border border-gray-200       // Border standard
border border-gray-300       // Border visible

// Border radius
rounded-none    // 0px - Rectangles stricts
rounded-sm      // 2px - Standard Elegant
rounded         // 4px - Léger arrondi
rounded-lg      // 8px - Arrondi notable
rounded-full    // 50% - Cercles

// Hover border
<div className="border border-gray-200 hover:border-gray-400 transition-colors">
  Hover me
</div>
```

---

## 🎭 Overlays & Backdrops

### Image Overlays

```jsx
// Overlay noir au hover
<div className="relative overflow-hidden group">
  <img src="image.jpg" alt="Project" className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
</div>

// Gradient overlay
<div className="relative">
  <img src="image.jpg" alt="Hero" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  <div className="absolute bottom-0 left-0 p-8 text-white">
    <h3>Title</h3>
  </div>
</div>
```

### Backdrop Blur

```jsx
// Navbar avec backdrop blur
<nav className="fixed w-full bg-white/90 backdrop-blur-md">
  {/* Navigation */}
</nav>

// Modal backdrop
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm">
  <div className="bg-white rounded-lg p-8">
    {/* Modal content */}
  </div>
</div>
```

---

## 🎨 Transitions & Hover States

### Transitions Standards

```jsx
// All properties
transition-all duration-300

// Specific properties
transition-colors duration-300      // Couleurs
transition-transform duration-300   // Transform
transition-opacity duration-300     // Opacity
transition-shadow duration-300      // Shadows
```

### Hover Effects Cards

```jsx
// Lift effect
<div className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
  Hover lifts card
</div>

// Scale effect
<div className="transition-transform duration-300 hover:scale-105">
  Hover scales card
</div>

// Combined effects
<div className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-gray-400">
  Multiple effects
</div>
```

### Hover Effects Images

```jsx
// Zoom in
<div className="overflow-hidden">
  <img 
    src="image.jpg"
    className="transition-transform duration-700 hover:scale-110"
  />
</div>

// Grayscale to color
<img 
  src="image.jpg"
  className="grayscale hover:grayscale-0 transition-all duration-500"
/>
```

### Hover Effects Buttons

```jsx
// Translate + shadow
<button className="transition-all hover:-translate-y-1 hover:shadow-xl">
  Lift button
</button>

// Icon animation
<button className="group flex items-center gap-2">
  Continue
  <ArrowRight className="transition-transform group-hover:translate-x-1" />
</button>

// Background fade
<button className="relative overflow-hidden group">
  <span className="relative z-10">Hover me</span>
  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
</button>
```

---

## 📱 Design Responsive : Breakpoints

### Breakpoints Tailwind

```
sm:  640px    /* Phablets, small tablets */
md:  768px    /* Tablets */
lg:  1024px   /* Small laptops */
xl:  1280px   /* Desktops */
2xl: 1536px   /* Large desktops */
```

### Patterns Responsive Courants

```jsx
// Typography responsive
<h1 className="text-4xl md:text-6xl lg:text-7xl">
  Responsive Title
</h1>

// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Columns adapt */}
</div>

// Flex direction responsive
<div className="flex flex-col md:flex-row gap-8">
  {/* Vertical on mobile, horizontal on desktop */}
</div>

// Spacing responsive
<section className="py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-12">
  {/* Spacing increases with screen size */}
</section>

// Hide/Show responsive
<div className="hidden md:block">
  {/* Desktop only */}
</div>
<div className="block md:hidden">
  {/* Mobile only */}
</div>
```

---

## ✅ Best Practices

### Do's ✅

- **Utiliser la palette définie** : Pas de couleurs random
- **Espacement cohérent** : Multiples de 4px
- **Mobile-first** : Toujours commencer par mobile
- **Animations subtiles** : Moins c'est plus
- **Contrastes suffisants** : AA minimum pour accessibilité
- **DaisyUI first** : Utiliser les composants DaisyUI quand possible

### Don'ts ❌

- **Pas de couleurs hardcodées** : `#FF0000` → utiliser la palette
- **Pas d'espacement aléatoire** : `mt-7 pb-13` → utiliser l'échelle
- **Pas d'animations excessives** : Éviter le "too much"
- **Pas de responsive afterthought** : Penser mobile dès le début
- **Pas de styles inline** : Utiliser les classes Tailwind

### Checklist Design

- [ ] Couleurs issues de la palette Elegant
- [ ] Espacement cohérent (multiples de 4)
- [ ] Typographie : Sans-serif (body) + Serif (titles)
- [ ] Contraste texte/fond suffisant (AA minimum)
- [ ] Hover states définis pour éléments interactifs
- [ ] Responsive testé (mobile, tablet, desktop)
- [ ] Animations subtiles et performantes
- [ ] Shadows et borders cohérents

---

## 🎉 Conclusion

Le design system d'Elegant repose sur :
- **Minimalisme** : Chaque élément a sa raison d'être
- **Cohérence** : Palette, spacing, typographie unifiés
- **Élégance** : Subtilité dans les animations et transitions
- **Performance** : CSS moderne, optimisé

**Respecte ces guidelines pour maintenir un design professionnel et cohérent ! 🚀**
