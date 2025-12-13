# 🧩 Components - Inventaire des Composants UI

## 🎯 Philosophie des Composants

Les composants sont les **LEGO blocks** de l'application. Chaque composant doit être :
- **Autonome** : Fonctionne indépendamment
- **Réutilisable** : Peut être utilisé dans différents contextes
- **Composable** : Se combine facilement avec d'autres
- **Prévisible** : Même input → même output

---

## 🏗️ Hiérarchie des Composants

```
Atoms
  ↓
Molecules  
  ↓
Sections (Organisms)
  ↓
Pages
```

### Définitions

**Atoms** : Composants de base indivisibles (Button, Input, Icon, Badge)
**Molecules** : Combinaisons d'atoms (Card avec icon+title+text)
**Sections** : Blocs de contenu complets (Hero, Services, Portfolio)
**Pages** : Assemblage de sections (App.jsx)

---

## ⚛️ Atoms (Composants de Base)

### Button

**Fichier :** Actuellement inline dans les composants
**Recommandation :** Créer `src/components/ui/Button.jsx`

```jsx
const Button = ({ 
  children, 
  variant = "primary", 
  size = "md",
  href,
  className = "",
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
  
  const baseClasses = "rounded-sm font-medium transition-all";
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return href ? (
    <a href={href} className={classes} {...props}>{children}</a>
  ) : (
    <button className={classes} {...props}>{children}</button>
  );
};

export default Button;
```

**Props :**
- `children` : Contenu du bouton
- `variant` : "primary" | "secondary" | "ghost"
- `size` : "sm" | "md" | "lg"
- `href` : Si défini, rend un lien `<a>`
- `className` : Classes additionnelles
- `...props` : Attributs HTML natifs

**Utilisation :**
```jsx
<Button href="#contact">Démarrer un projet</Button>
<Button variant="secondary" size="sm">En savoir plus</Button>
<Button variant="ghost" onClick={handleClick}>Annuler</Button>
```

---

### Card

**Fichier :** `src/components/ui/Card.jsx` (à créer)

```jsx
const Card = ({ 
  children, 
  className = "",
  hover = true,
  ...props 
}) => {
  const hoverClasses = hover 
    ? "hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
    : "";
    
  return (
    <div 
      className={`bg-white p-8 rounded-sm border border-gray-50 ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
```

**Props :**
- `children` : Contenu de la card
- `className` : Classes additionnelles
- `hover` : Active les effets hover (default: true)

**Utilisation :**
```jsx
<Card>
  <h3>Title</h3>
  <p>Content</p>
</Card>

<Card hover={false} className="bg-gray-50">
  <p>No hover effect</p>
</Card>
```

---

### IconBadge

**Fichier :** `src/components/ui/IconBadge.jsx` (à créer)

```jsx
const IconBadge = ({ 
  icon, 
  color = "black",
  size = "md",
  className = "" 
}) => {
  const sizes = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4"
  };
  
  return (
    <div className={`${sizes[size]} rounded-full bg-${color}/10 inline-flex ${className}`}>
      {icon}
    </div>
  );
};

export default IconBadge;
```

**Props :**
- `icon` : Element React (icône Lucide)
- `color` : Couleur de base
- `size` : "sm" | "md" | "lg"

**Utilisation :**
```jsx
<IconBadge icon={<Palette size={24} />} color="blue" />
<IconBadge icon={<Code size={32} />} size="lg" />
```

---

## 🧪 Molecules (Composants Composés)

### FeatureCard / ServiceCard

**Fichier :** Inline dans `Services.jsx`
**Recommandation :** Extraire dans `src/components/ui/ServiceCard.jsx`

```jsx
import { motion } from 'framer-motion';

const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  bg = "bg-white",
  className = "" 
}) => (
  <motion.div
    whileHover={{ y: -8 }}
    className={`${bg} p-8 rounded-sm border border-gray-50 hover:border-gray-200 transition-all duration-300 hover:shadow-lg group ${className}`}
  >
    <div className="mb-6 text-black group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="font-serif text-xl font-bold mb-3 text-gray-900">
      {title}
    </h3>
    <p className="text-gray-500 text-sm leading-relaxed">
      {description}
    </p>
  </motion.div>
);

export default ServiceCard;
```

**Props :**
- `icon` : Element React (icône)
- `title` : Titre du service
- `description` : Description
- `bg` : Classe background (optionnel)

**Utilisation :**
```jsx
const services = [
  {
    icon: <Palette size={32} />,
    title: "Design UI/UX Premium",
    description: "Nous créons des interfaces...",
    bg: "bg-[#FAFAFA]"
  }
];

<div className="grid md:grid-cols-4 gap-6">
  {services.map((service, i) => (
    <ServiceCard key={i} {...service} />
  ))}
</div>
```

---

### ProjectCard

**Fichier :** Inline dans `Portfolio.jsx`
**Recommandation :** Extraire dans `src/components/ui/ProjectCard.jsx`

```jsx
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ 
  title, 
  category, 
  image, 
  link = "#",
  className = "" 
}) => (
  <a href={link} className={`group cursor-pointer block ${className}`}>
    <div className="relative overflow-hidden rounded-sm aspect-[4/3] mb-4">
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
      <img 
        src={image} 
        alt={title} 
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
        <ArrowUpRight size={20} />
      </div>
    </div>
    <h3 className="font-serif text-xl font-bold text-black group-hover:underline decoration-1 underline-offset-4">
      {title}
    </h3>
    <p className="text-sm text-gray-500 mt-1">{category}</p>
  </a>
);

export default ProjectCard;
```

**Props :**
- `title` : Nom du projet
- `category` : Catégorie (Site Vitrine, E-commerce, etc.)
- `image` : URL de l'image
- `link` : Lien vers le projet

**Utilisation :**
```jsx
const projects = [
  {
    title: "Architecture Moderne",
    category: "Site Vitrine",
    image: "https://picsum.photos/800/600?random=1",
    link: "https://example.com"
  }
];

<div className="grid md:grid-cols-3 gap-8">
  {projects.map((project, i) => (
    <ProjectCard key={i} {...project} />
  ))}
</div>
```

---

### SectionHeader

**Fichier :** `src/components/ui/SectionHeader.jsx` (à créer)

```jsx
const SectionHeader = ({ 
  title, 
  subtitle, 
  align = "center",
  className = "" 
}) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right"
  };
  
  return (
    <div className={`max-w-3xl ${alignClasses[align]} mb-20 ${className}`}>
      <h2 className="font-serif text-3xl md:text-5xl font-bold text-black mb-6">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
```

**Props :**
- `title` : Titre de la section
- `subtitle` : Sous-titre (optionnel)
- `align` : "left" | "center" | "right"

**Utilisation :**
```jsx
<SectionHeader 
  title="Notre Expertise"
  subtitle="Nous combinons l'art du design et la science de la conversion."
/>
```

---

### AnimatedShape

**Fichier :** `src/components/ui/AnimatedShape.jsx` (à créer)

```jsx
import { motion } from 'framer-motion';

const AnimatedShape = ({ 
  color = "#F0FFFF",
  size = "large",
  position = "top-right",
  blur = 120,
  opacity = 0.4
}) => {
  const sizes = {
    small: "w-1/4 h-1/3",
    medium: "w-1/3 h-1/2",
    large: "w-1/2 h-full"
  };
  
  const positions = {
    "top-right": "top-0 right-0 translate-x-1/3 -translate-y-1/4",
    "bottom-left": "bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
    "top-left": "top-0 left-0 -translate-x-1/3 -translate-y-1/4",
    "bottom-right": "bottom-0 right-0 translate-x-1/3 translate-y-1/4"
  };
  
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [opacity, opacity * 0.8, opacity]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute ${sizes[size]} ${positions[position]} rounded-full pointer-events-none`}
      style={{
        backgroundColor: color,
        opacity: opacity,
        filter: `blur(${blur}px)`
      }}
    />
  );
};

export default AnimatedShape;
```

**Props :**
- `color` : Couleur de la forme
- `size` : "small" | "medium" | "large"
- `position` : "top-right" | "bottom-left" | etc.
- `blur` : Niveau de blur (px)
- `opacity` : Opacité (0-1)

**Utilisation :**
```jsx
<section className="relative overflow-hidden">
  <AnimatedShape color="#F0FFFF" position="top-right" />
  <AnimatedShape color="#FAF0E6" position="bottom-left" size="medium" />
  {/* Content */}
</section>
```

---

## 📦 Sections (Organisms)

### Navbar

**Fichier :** `src/components/Navbar.jsx` ✅

**Description :** Navigation principale avec scroll effects et menu mobile

**Props :** Aucune (component autonome)

**Features :**
- Sticky avec backdrop blur au scroll
- Menu mobile hamburger (toggle)
- Transitions smooth
- Logo + nav links + CTA button

**Structure :**
```jsx
<nav>
  <Logo />
  <DesktopMenu>
    <NavLink />
    <NavLink />
    <CTAButton />
  </DesktopMenu>
  <MobileMenuButton />
  <MobileMenu (conditional)>
    <NavLink />
    <CTAButton />
  </MobileMenu>
</nav>
```

**Utilisation :**
```jsx
import Navbar from './components/Navbar';

<Navbar />
```

---

### Hero

**Fichier :** `src/components/Hero.jsx` ✅

**Description :** Section hero avec copywriting + visual + CTA

**Props :** Aucune

**Features :**
- Animation d'entrée (Motion)
- Formes décoratives en background
- Badge "Agence Web Premium"
- Title avec emphasis italique
- 2 CTA buttons (primary + secondary)
- Image avec hover effects
- Floating badge avec stats

**Structure :**
```jsx
<section className="relative min-h-screen">
  <BackgroundShapes />
  <Container>
    <LeftColumn>
      <Badge />
      <Title />
      <Description />
      <CTAButtons />
    </LeftColumn>
    <RightColumn>
      <Image avec effects />
      <FloatingBadge />
    </RightColumn>
  </Container>
</section>
```

---

### Services

**Fichier :** `src/components/Services.jsx` ✅

**Description :** Grille de services/features de l'agence

**Props :** Aucune (données inline)

**Data Structure :**
```javascript
const services = [
  {
    icon: <Palette size={32} />,
    title: "Design UI/UX Premium",
    description: "Description...",
    bg: "bg-[#FAFAFA]"
  }
];
```

**Features :**
- Grille responsive (1 → 2 → 4 colonnes)
- Cards avec hover effects (lift + shadow)
- Icon animation au hover
- Backgrounds variés pour chaque card

**Amélioration Recommandée :**
```jsx
// Extraire les données
import { services } from '../data/services';

// Utiliser ServiceCard component
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {services.map((service) => (
    <ServiceCard key={service.id} {...service} />
  ))}
</div>
```

---

### Portfolio

**Fichier :** `src/components/Portfolio.jsx` ✅

**Description :** Showcase des projets réalisés

**Props :** Aucune

**Data Structure :**
```javascript
const projects = [
  {
    title: "Architecture Moderne",
    category: "Site Vitrine",
    image: "https://picsum.photos/800/600?random=1"
  }
];
```

**Features :**
- Grille responsive (1 → 2 → 3 colonnes)
- Images avec zoom au hover
- Overlay subtil au hover
- Icône "arrow-up-right" apparaît au hover
- Link "Voir tout le portfolio"

**Amélioration Recommandée :**
```jsx
// Extraire ProjectCard
import ProjectCard from './ui/ProjectCard';
import { projects } from '../data/projects';

<div className="grid md:grid-cols-3 gap-8">
  {projects.map((project) => (
    <ProjectCard key={project.id} {...project} />
  ))}
</div>
```

---

### FAQ

**Fichier :** `src/components/FAQ.jsx` ✅

**Description :** Section Questions fréquentes

**Props :** Aucune

**Features :**
- Liste de Q&A
- Styling simple et clair

**Amélioration Recommandée :**
```jsx
// Ajouter un accordion avec DaisyUI
<div className="collapse collapse-plus bg-base-100">
  <input type="radio" name="faq-accordion" /> 
  <div className="collapse-title text-xl font-medium">
    Question ?
  </div>
  <div className="collapse-content"> 
    <p>Réponse</p>
  </div>
</div>
```

---

### CTA

**Fichier :** `src/components/CTA.jsx` ✅

**Description :** Section Call-to-Action finale avant footer

**Props :** Aucune

**Features :**
- Background contrasté
- Title + description
- CTA button primary

**Structure Typique :**
```jsx
<section className="py-24 bg-black text-white">
  <div className="max-w-4xl mx-auto text-center px-6">
    <h2>Prêt à lancer votre projet ?</h2>
    <p>Description motivante</p>
    <Button variant="primary">Démarrer maintenant</Button>
  </div>
</section>
```

---

### Footer

**Fichier :** `src/components/Footer.jsx` ✅

**Description :** Pied de page avec liens et infos

**Props :** Aucune

**Features :**
- Grid responsive
- Navigation links
- Social links
- Copyright

**Structure Recommandée :**
```jsx
<footer className="bg-[#1a1a1a] text-white py-16">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
    <div>
      <Logo />
      <Description />
    </div>
    <div>
      <h4>Services</h4>
      <ul>
        <li><a href="#">Design</a></li>
        <li><a href="#">Développement</a></li>
      </ul>
    </div>
    <div>
      <h4>Entreprise</h4>
      <ul>
        <li><a href="#">À propos</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4>Suivez-nous</h4>
      <SocialLinks />
    </div>
  </div>
  <div className="text-center mt-12">
    <p>© 2024 Elegant. Tous droits réservés.</p>
  </div>
</footer>
```

---

## 🎨 Sous-Composants Locaux

Certains composants contiennent des sous-composants définis localement (non exportés).

### Exemple : NavItem dans Navbar

```jsx
// Sous-composant local (dans Navbar.jsx)
const NavItem = ({ name, href, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
  >
    {name}
  </a>
);

// Usage dans le composant parent
{navLinks.map((link) => (
  <NavItem key={link.name} {...link} />
))}
```

**Quand utiliser des sous-composants locaux ?**
- Composant utilisé uniquement dans ce contexte
- Pas de réutilisation prévue ailleurs
- Simplification de la structure du composant parent

**Quand extraire en composant séparé ?**
- Réutilisation dans plusieurs fichiers
- Logique complexe (>50 lignes)
- Besoin de tests unitaires spécifiques

---

## 🎯 Usage de DaisyUI

### Composants DaisyUI Actuellement Utilisés

**Potentiellement :** Card base classes, color utilities

### Composants DaisyUI Recommandés

```jsx
// Buttons
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-ghost">Ghost</button>

// Cards
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Title</h2>
    <p>Content</p>
  </div>
</div>

// Modal
<input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3>Title</h3>
    <p>Content</p>
  </div>
</div>

// Dropdown
<div className="dropdown">
  <label tabIndex={0} className="btn">Click</label>
  <ul tabIndex={0} className="dropdown-content menu">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
```

---

## ✅ Checklist : Créer un Nouveau Composant

### Avant de Commencer

- [ ] Le composant est-il vraiment nécessaire ?
- [ ] Existe-t-il déjà (DaisyUI ou autre) ?
- [ ] Est-ce un atom, molecule ou section ?

### Création

- [ ] Fichier nommé en PascalCase (ServiceCard.jsx)
- [ ] Imports organisés (React → libs → local)
- [ ] Props avec defaults définis
- [ ] PropTypes ou JSDoc pour documentation (optionnel)

### Code

- [ ] Composant functional (pas class)
- [ ] Props destructurées
- [ ] className prop pour extensibilité
- [ ] ...props spread pour attributs HTML natifs
- [ ] Responsive design (mobile-first)

### Style

- [ ] Tailwind classes uniquement (pas de CSS inline)
- [ ] DaisyUI si approprié
- [ ] Hover states définis
- [ ] Transitions smooth
- [ ] Couleurs de la palette Elegant

### Test

- [ ] Testé sur mobile (375px)
- [ ] Testé sur desktop (1280px)
- [ ] Hover effects fonctionnels
- [ ] Accessibilité (alt, aria-label)

### Documentation

- [ ] Exemples d'utilisation dans ce fichier
- [ ] Props documentées
- [ ] Ajouté à l'inventaire Components.md

---

## 🔄 Règle de Réutilisation

### Quand Créer un Composant Réutilisable ?

**Règle des 3 :**
Si tu copies-colles le même JSX **3 fois**, crée un composant.

**Exemples de Patterns à Extraire :**
```jsx
// ❌ MAUVAIS : Répété 3 fois
<div className="p-8 bg-white rounded shadow">
  <h3>Title 1</h3>
  <p>Content 1</p>
</div>
<div className="p-8 bg-white rounded shadow">
  <h3>Title 2</h3>
  <p>Content 2</p>
</div>
<div className="p-8 bg-white rounded shadow">
  <h3>Title 3</h3>
  <p>Content 3</p>
</div>

// ✅ BON : Composant réutilisable
const ContentCard = ({ title, children }) => (
  <div className="p-8 bg-white rounded shadow">
    <h3>{title}</h3>
    {children}
  </div>
);

// Usage
<ContentCard title="Title 1"><p>Content 1</p></ContentCard>
<ContentCard title="Title 2"><p>Content 2</p></ContentCard>
<ContentCard title="Title 3"><p>Content 3</p></ContentCard>
```

---

## 🎁 Best Practices Props

### Props Essentielles

```jsx
const Component = ({
  // 1. Props obligatoires en premier
  title,
  description,
  
  // 2. Props optionnelles avec defaults
  variant = "primary",
  size = "md",
  
  // 3. Booleans avec defaults
  disabled = false,
  loading = false,
  
  // 4. Callbacks avec default vide
  onClick = () => {},
  
  // 5. Style customization
  className = "",
  
  // 6. Spread pour HTML attributes
  ...props
}) => {
  // Component logic
};
```

### Children Pattern

```jsx
// ✅ BON : Flexible avec children
const Card = ({ children, className = "" }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

// Usage flexible
<Card>
  <h3>Custom content</h3>
  <p>Any JSX</p>
  <Button>Action</Button>
</Card>
```

### Spread Props

```jsx
// ✅ BON : Permet attributs HTML natifs
const Input = ({ className = "", ...props }) => (
  <input
    className={`px-4 py-2 border rounded ${className}`}
    {...props}
  />
);

// Usage avec attributs natifs
<Input
  type="email"
  placeholder="Email"
  required
  aria-label="Email input"
  name="email"
/>
```

---

## 📊 Inventaire Complet

### Components Existants

| Nom | Type | Fichier | Description |
|-----|------|---------|-------------|
| Navbar | Section | `components/Navbar.jsx` | Navigation avec scroll effect |
| Hero | Section | `components/Hero.jsx` | Hero section avec CTA |
| ProblemSolution | Section | `components/ProblemSolution.jsx` | Section problème/solution |
| Services | Section | `components/Services.jsx` | Grille de services |
| Portfolio | Section | `components/Portfolio.jsx` | Projets réalisés |
| Testimonials | Section | `components/Testimonials.jsx` | Témoignages clients |
| FAQ | Section | `components/FAQ.jsx` | Questions fréquentes |
| CTA | Section | `components/CTA.jsx` | Call-to-action final |
| Footer | Section | `components/Footer.jsx` | Pied de page |

### Components à Créer (Recommandés)

| Nom | Type | Fichier | Priorité |
|-----|------|---------|----------|
| Button | Atom | `components/ui/Button.jsx` | Haute |
| Card | Atom | `components/ui/Card.jsx` | Haute |
| ServiceCard | Molecule | `components/ui/ServiceCard.jsx` | Moyenne |
| ProjectCard | Molecule | `components/ui/ProjectCard.jsx` | Moyenne |
| SectionHeader | Molecule | `components/ui/SectionHeader.jsx` | Moyenne |
| IconBadge | Atom | `components/ui/IconBadge.jsx` | Basse |
| AnimatedShape | Molecule | `components/ui/AnimatedShape.jsx` | Basse |
| Container | Atom | `components/layout/Container.jsx` | Basse |

---

## 🎉 Conclusion

L'inventaire des composants est vivant et évolue avec le projet. Les principes clés :

- **Réutilisabilité** : DRY principe
- **Composition** : LEGO blocks
- **Flexibilité** : Props + children
- **Cohérence** : Design system respecté

**Consulte ce fichier avant de créer un nouveau composant ! 🚀**
