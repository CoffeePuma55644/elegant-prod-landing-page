# 🎯 Principles - Principes de Codage Elegant

## 🏛️ Philosophie Générale

### Composants comme des LEGO Blocks

Chaque composant doit être :
- **Autonome** : Fonctionne indépendamment
- **Réutilisable** : Peut être utilisé dans différents contextes
- **Composable** : Peut se combiner avec d'autres
- **Prévisible** : Même input = même output

```jsx
// ✅ BON : Composant LEGO
const IconBadge = ({ icon, color = "black" }) => (
  <div className={`p-3 rounded-full bg-${color}/10`}>
    {icon}
  </div>
);

// Utilisation flexible
<IconBadge icon={<Palette />} color="blue" />
<IconBadge icon={<Code />} />
```

---

## 🔄 Principe DRY : Don't Repeat Yourself

### La Règle des 3

**Si tu copies-colles 3 fois, abstrais-le.**

### Exemple 1 : Cards de Services

```jsx
// ❌ MAUVAIS : Répétition
const Services = () => (
  <div className="grid grid-cols-3 gap-6">
    <div className="p-8 bg-white rounded shadow hover:shadow-lg">
      <Palette size={32} className="text-black mb-4" />
      <h3 className="text-xl font-bold mb-2">Design UI/UX</h3>
      <p className="text-gray-600">Description du service...</p>
    </div>
    <div className="p-8 bg-white rounded shadow hover:shadow-lg">
      <Code size={32} className="text-black mb-4" />
      <h3 className="text-xl font-bold mb-2">Développement</h3>
      <p className="text-gray-600">Description du service...</p>
    </div>
    <div className="p-8 bg-white rounded shadow hover:shadow-lg">
      <Zap size={32} className="text-black mb-4" />
      <h3 className="text-xl font-bold mb-2">Performance</h3>
      <p className="text-gray-600">Description du service...</p>
    </div>
  </div>
);

// ✅ BON : Composant réutilisable + données séparées
const ServiceCard = ({ icon, title, description, className = "" }) => (
  <div className={`p-8 bg-white rounded shadow hover:shadow-lg transition-shadow ${className}`}>
    <div className="text-black mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const services = [
  { icon: <Palette size={32} />, title: "Design UI/UX", description: "..." },
  { icon: <Code size={32} />, title: "Développement", description: "..." },
  { icon: <Zap size={32} />, title: "Performance", description: "..." }
];

const Services = () => (
  <div className="grid grid-cols-3 gap-6">
    {services.map((service, i) => (
      <ServiceCard key={i} {...service} />
    ))}
  </div>
);
```

### Exemple 2 : Boutons d'Action

```jsx
// ❌ MAUVAIS
const Hero = () => (
  <>
    <a href="#contact" className="bg-black text-white px-8 py-4 rounded-sm font-medium hover:bg-gray-800">
      Démarrer un projet
    </a>
    {/* Même style répété ailleurs */}
  </>
);

// ✅ BON : Composant Button réutilisable
const Button = ({ 
  children, 
  variant = "primary", 
  size = "md",
  href,
  ...props 
}) => {
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black border border-gray-200 hover:border-gray-400",
    ghost: "bg-transparent text-black hover:bg-gray-100"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg"
  };
  
  const className = `${variants[variant]} ${sizes[size]} rounded-sm font-medium transition-all`;
  
  return href ? (
    <a href={href} className={className} {...props}>{children}</a>
  ) : (
    <button className={className} {...props}>{children}</button>
  );
};

// Utilisation
<Button href="#contact">Démarrer un projet</Button>
<Button variant="secondary" size="sm">En savoir plus</Button>
```

---

## 🎨 DaisyUI First : Quand et Comment

### Quand Utiliser DaisyUI

✅ **Utilise DaisyUI pour :**
- Boutons standards (`btn`, `btn-primary`, `btn-ghost`)
- Cards simples (`card`, `card-body`)
- Navigation (`navbar`, `menu`)
- Badges, avatars
- Modals, drawers
- Alerts, toasts

❌ **Crée du custom pour :**
- Designs très spécifiques à la marque
- Animations complexes
- Layouts uniques
- Components avec logique métier complexe

### Exemple Pratique

```jsx
// ✅ BON : Utilise DaisyUI pour un bouton standard
const CTAButton = ({ children }) => (
  <button className="btn btn-primary btn-lg">
    {children}
  </button>
);

// ✅ BON : Custom pour un design unique
const GradientButton = ({ children }) => (
  <button className="relative px-8 py-4 bg-gradient-to-r from-black to-gray-700 text-white rounded-sm overflow-hidden group">
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
  </button>
);
```

### Hybrid Approach

Tu peux combiner DaisyUI avec du custom :

```jsx
// ✅ BON : Base DaisyUI + custom styling
<button className="btn btn-primary shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
  Click me
</button>
```

---

## 🧱 Structure de Composants Propres

### Anatomie d'un Bon Composant

```jsx
import React, { useState, useEffect } from 'react';
import { Icon } from 'lucide-react';
import { motion } from 'framer-motion';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. DONNÉES STATIQUES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const navigationItems = [
  { label: "Accueil", href: "#home" },
  { label: "Services", href: "#services" }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. SOUS-COMPOSANTS (si nécessaire)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const NavItem = ({ label, href, isActive }) => (
  <a 
    href={href}
    className={`px-4 py-2 transition-colors ${
      isActive ? 'text-black' : 'text-gray-600 hover:text-black'
    }`}
  >
    {label}
  </a>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. COMPOSANT PRINCIPAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Navigation = ({ className = "" }) => {
  // State
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handlers
  const handleNavClick = (href) => {
    setActiveSection(href.replace('#', ''));
  };
  
  // Render
  return (
    <nav className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-white/90 backdrop-blur' : 'bg-transparent'} ${className}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Logo />
        <div className="flex gap-2">
          {navigationItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              isActive={activeSection === item.href.replace('#', '')}
              onClick={() => handleNavClick(item.href)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. EXPORT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default Navigation;
```

---

## 🎯 Cohérence : La Clé d'un Design Professionnel

### Spacing Cohérent

Utilise un système d'espacement prévisible :

```jsx
// ✅ BON : Espacement cohérent (multiples de 4)
const spacing = {
  xs: "gap-2",   // 8px
  sm: "gap-4",   // 16px
  md: "gap-6",   // 24px
  lg: "gap-8",   // 32px
  xl: "gap-12"   // 48px
};

// ❌ MAUVAIS : Espacement aléatoire
<div className="gap-3 mt-7 pb-13">
```

### Animations Cohérentes

```jsx
// ✅ BON : Timing et easing cohérents
const transition = {
  default: { duration: 0.6, ease: "easeOut" },
  fast: { duration: 0.3, ease: "easeOut" },
  slow: { duration: 0.8, ease: "easeOut" }
};

<motion.div transition={transition.default}>
  {/* Contenu */}
</motion.div>
```

### Couleurs Cohérentes

```jsx
// ✅ BON : Palette définie
const colors = {
  text: {
    primary: "text-black",
    secondary: "text-gray-600",
    muted: "text-gray-400"
  },
  bg: {
    primary: "bg-[#FAFAFA]",
    white: "bg-white",
    black: "bg-black"
  }
};

// ❌ MAUVAIS : Couleurs random
<div className="text-[#333] bg-[#F7F7F7]">
<div className="text-[#222] bg-[#FCFCFC]">
```

---

## 📊 Séparation Données / UI

### Principe Fondamental

**Les données ne doivent JAMAIS être hardcodées dans le JSX.**

### Exemple : Portfolio

```jsx
// ❌ MAUVAIS : Données mélangées avec UI
const Portfolio = () => (
  <section>
    <div>
      <img src="project1.jpg" alt="Project 1" />
      <h3>E-commerce Fashion</h3>
      <p>Développement complet</p>
    </div>
    <div>
      <img src="project2.jpg" alt="Project 2" />
      <h3>Application Mobile</h3>
      <p>UI/UX Design</p>
    </div>
  </section>
);

// ✅ BON : Données séparées
const projects = [
  {
    id: 1,
    image: "project1.jpg",
    title: "E-commerce Fashion",
    description: "Développement complet",
    tags: ["React", "Node.js"],
    link: "https://example.com"
  },
  {
    id: 2,
    image: "project2.jpg",
    title: "Application Mobile",
    description: "UI/UX Design",
    tags: ["Figma", "React Native"],
    link: "https://example2.com"
  }
];

const ProjectCard = ({ image, title, description, tags, link }) => (
  <a href={link} className="block group">
    <img src={image} alt={title} className="mb-4" />
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-gray-600 mb-2">{description}</p>
    <div className="flex gap-2">
      {tags.map(tag => (
        <span key={tag} className="text-xs bg-gray-100 px-2 py-1">{tag}</span>
      ))}
    </div>
  </a>
);

const Portfolio = () => (
  <section>
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  </section>
);
```

**Voir `DataSeparation.md` pour plus d'exemples.**

---

## 🎁 Best Practices pour les Props

### 1. Children Pattern

```jsx
// ✅ BON : Composant flexible avec children
const Card = ({ children, className = "" }) => (
  <div className={`bg-white p-6 rounded shadow ${className}`}>
    {children}
  </div>
);

// Utilisation
<Card>
  <h3>Titre</h3>
  <p>Contenu</p>
</Card>
```

### 2. Default Props

```jsx
// ✅ BON : Valeurs par défaut claires
const Button = ({ 
  children, 
  variant = "primary",
  size = "md",
  disabled = false,
  onClick = () => {}
}) => {
  // ...
};
```

### 3. Spread Props

```jsx
// ✅ BON : Permet de passer des attributs HTML natifs
const Input = ({ className = "", ...props }) => (
  <input
    className={`px-4 py-2 border rounded ${className}`}
    {...props}
  />
);

// Utilisation
<Input 
  type="email" 
  placeholder="Email" 
  required 
  aria-label="Email"
/>
```

### 4. Composition de className

```jsx
// ✅ BON : Permet l'override de styles
const Button = ({ className = "", ...props }) => (
  <button
    className={`px-4 py-2 bg-black text-white rounded ${className}`}
    {...props}
  />
);

// Utilisation avec override
<Button className="bg-blue-500">Custom color</Button>
```

---

## 🎬 Animations : Motion vs CSS

### Quand Utiliser Motion

✅ **Utilise Motion pour :**
- Animations au scroll (whileInView)
- Animations complexes avec orchestration
- Animations basées sur des valeurs dynamiques
- Gestures (drag, tap)

```jsx
<motion.div
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {/* Contenu */}
</motion.div>
```

### Quand Utiliser CSS

✅ **Utilise CSS pour :**
- Transitions simples (hover, focus)
- Animations performantes (transform, opacity)
- Animations qui se répètent en boucle

```jsx
<div className="transition-all duration-300 hover:scale-105 hover:shadow-xl">
  {/* Contenu */}
</div>
```

### Hybrid Approach

```jsx
// ✅ BON : Motion pour l'entrée, CSS pour l'interaction
<motion.button
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="transition-transform hover:scale-105"
>
  Click me
</motion.button>
```

---

## 🔧 Maintenabilité

### Noms Descriptifs

```jsx
// ❌ MAUVAIS
const fn = (x) => x.filter(i => i.a);
const data = getData();

// ✅ BON
const filterActiveProjects = (projects) => 
  projects.filter(project => project.isActive);
const userProjects = fetchUserProjects();
```

### Commentaires Utiles

```jsx
// ❌ MAUVAIS : Commentaire inutile
// Fonction qui ajoute deux nombres
const add = (a, b) => a + b;

// ✅ BON : Commentaire qui ajoute de la valeur
// Calcule le prix TTC incluant la TVA de 16% (RDC)
const calculatePriceWithTax = (priceHT) => priceHT * 1.16;

// ✅ BON : Explique le "pourquoi"
// On utilise setTimeout pour éviter un conflit avec le scroll automatique du navigateur
setTimeout(() => {
  scrollToSection(targetId);
}, 100);
```

### Composants Petits et Focalisés

```jsx
// ❌ MAUVAIS : Composant qui fait trop de choses
const Dashboard = () => {
  // 500 lignes de code...
  // Gestion de l'auth, des données, de l'UI, etc.
};

// ✅ BON : Séparation des responsabilités
const Dashboard = () => (
  <DashboardLayout>
    <DashboardHeader />
    <DashboardStats />
    <DashboardProjects />
    <DashboardActivity />
  </DashboardLayout>
);
```

**Règle d'or : Si un composant fait plus de 200 lignes, demande-toi s'il peut être divisé.**

---

## 📦 Organisation des Imports

### Ordre Recommandé

```jsx
// 1. React et hooks
import React, { useState, useEffect } from 'react';

// 2. Librairies externes
import { motion } from 'framer-motion';
import { Palette, Code, Zap } from 'lucide-react';

// 3. Composants locaux
import Button from './Button';
import Card from './Card';

// 4. Utilitaires
import { cn } from '../utils/classnames';

// 5. Data
import { services } from '../data/services';

// 6. Styles (si nécessaire)
import './styles.css';
```

---

## 📱 Design Responsive : Principes

### Mobile-First Obligatoire

```jsx
// ✅ BON : Mobile par défaut, desktop en override
<div className="
  flex flex-col gap-4 px-4 py-8
  md:flex-row md:gap-8 md:px-12
  lg:gap-12
">

// ❌ MAUVAIS : Desktop par défaut
<div className="
  flex flex-row gap-12 px-12
  md:flex-col md:gap-4 md:px-4
">
```

### Tester sur Vraies Tailles

```
Mobile :  375px - 425px
Tablet :  768px - 1024px
Desktop : 1280px+
```

### Images Responsive

```jsx
// ✅ BON : Images qui s'adaptent
<img 
  src="image.jpg"
  alt="Description"
  className="w-full h-auto object-cover aspect-video"
/>

// Pour les backgrounds
<div 
  className="bg-cover bg-center aspect-square md:aspect-video"
  style={{ backgroundImage: 'url(image.jpg)' }}
/>
```

---

## ✅ Checklist Avant Commit

### Code Quality

- [ ] Pas de code dupliqué (principe DRY respecté)
- [ ] Noms de variables descriptifs
- [ ] Pas de `console.log()` ou `debugger` oublié
- [ ] Imports organisés et nettoyés
- [ ] Composants < 200 lignes

### Design

- [ ] DaisyUI utilisé quand approprié
- [ ] Spacing cohérent (multiples de 4)
- [ ] Couleurs issues de la palette définie
- [ ] Animations subtiles et performantes
- [ ] Design responsive testé

### Data

- [ ] Données séparées de l'UI
- [ ] Arrays utilisés avec `.map()`
- [ ] Props bien typées (defaults, validation)

### Performance

- [ ] Images optimisées (format, taille)
- [ ] Animations utilisent `transform` et `opacity`
- [ ] Pas de re-renders inutiles
- [ ] Lazy loading si nécessaire

### Accessibilité

- [ ] Attributs `alt` sur les images
- [ ] Labels sur les inputs
- [ ] Contrastes de couleurs suffisants
- [ ] Navigation au clavier fonctionnelle

### Tests

- [ ] Testé sur mobile (375px minimum)
- [ ] Testé sur tablette (768px)
- [ ] Testé sur desktop (1280px+)
- [ ] Testé sur Chrome, Firefox, Safari

### Linting

```bash
pnpm lint
```

- [ ] Aucune erreur ESLint
- [ ] Code formaté correctement

---

## 🎓 Principes Avancés

### Composition Over Inheritance

```jsx
// ✅ BON : Composition
const PrimaryButton = (props) => (
  <Button variant="primary" {...props} />
);

const SecondaryButton = (props) => (
  <Button variant="secondary" {...props} />
);

// ❌ MAUVAIS : Héritage (React ne supporte pas l'héritage de classes pour les composants)
```

### Single Responsibility

Chaque composant doit avoir **une seule raison de changer**.

```jsx
// ❌ MAUVAIS : Responsabilités mixées
const UserProfile = () => {
  // Fetch data
  // Validate data
  // Display UI
  // Handle forms
};

// ✅ BON : Séparation claire
const UserProfile = () => {
  const user = useUser();
  const { updateUser } = useUserActions();
  
  return (
    <>
      <UserInfo user={user} />
      <UserEditForm user={user} onSave={updateUser} />
    </>
  );
};
```

---

## 🎉 Conclusion

Ces principes sont le fondement d'un code **maintenable, évolutif et professionnel**. 

Garde toujours en tête :
- 🧱 **Composants LEGO** : petits, réutilisables, composables
- 🔄 **DRY** : ne te répète jamais
- 🎨 **DaisyUI first** : utilise ce qui existe
- 📊 **Séparation data/UI** : prépare l'avenir
- ✨ **Cohérence** : design système rigoureux

**Happy coding! 🚀**
