# 🎬 Animations - Guide Motion (Framer Motion)

## 🎯 Philosophie des Animations

Les animations dans Elegant suivent le principe **"Subtle yet Engaging"** :
- **Subtiles** : Ne distraient pas du contenu
- **Fluides** : 60fps minimum
- **Intentionnelles** : Chaque animation a un but
- **Performantes** : GPU-accelerated uniquement

**Règle d'or :** Moins c'est plus. Une animation subtile est plus élégante que 10 animations flashy.

---

## 📦 Librairie : Motion (Framer Motion v12)

### Installation

```json
{
  "dependencies": {
    "framer-motion": "^12.23.25",
    "motion": "^12.23.25"
  }
}
```

### Import

```jsx
import { motion } from 'framer-motion';
```

---

## ⚡ Utilitaires d'Animation

### Créer un Fichier d'Utilitaires

**Fichier :** `src/utils/animations.js` (à créer)

```javascript
// Fade In Up - Animation d'entrée standard
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Fade In - Simple opacity
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

// Scale In - Zoom effect
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Slide In From Left
export const slideInLeft = {
  hidden: {
    opacity: 0,
    x: -50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Slide In From Right
export const slideInRight = {
  hidden: {
    opacity: 0,
    x: 50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Stagger Container - Pour animer des listes
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Stagger Item - Enfants du stagger container
export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};
```

### Usage des Utilitaires

```jsx
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const Hero = () => (
  <motion.section
    variants={fadeInUp}
    initial="hidden"
    animate="visible"
  >
    <h1>Title</h1>
    <p>Description</p>
  </motion.section>
);

const Services = () => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className="grid md:grid-cols-3 gap-8"
  >
    {services.map(service => (
      <motion.div key={service.id} variants={staggerItem}>
        <ServiceCard {...service} />
      </motion.div>
    ))}
  </motion.div>
);
```

---

## 🎨 Patterns d'Animation

### 1. Viewport Triggered (whileInView)

**Usage :** Animer quand l'élément entre dans le viewport

```jsx
import { motion } from 'framer-motion';

const Section = () => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <h2>Section Title</h2>
    <p>Content appears when scrolling into view</p>
  </motion.section>
);
```

**Options viewport :**
- `once: true` : Animation se joue une seule fois
- `once: false` : Animation se rejoue à chaque entrée/sortie
- `margin: "-100px"` : Déclenche 100px avant d'entrer dans le viewport
- `amount: 0.5` : Déclenche quand 50% de l'élément est visible

**Best Practice :** Toujours utiliser `once: true` pour éviter animations répétées agaçantes.

```jsx
// ✅ BON : Animation une fois
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>

// ❌ MAUVAIS : Animation à chaque scroll
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: false }}
>
```

---

### 2. Scroll-Based Animations

**Usage :** Animer en fonction du scroll (parallax, etc.)

```jsx
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSection = () => {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to Y position
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  
  return (
    <motion.div
      style={{ y, opacity }}
      className="relative"
    >
      <img src="background.jpg" alt="Parallax" />
    </motion.div>
  );
};
```

**Exemple avec section spécifique :**

```jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  
  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <h1>Parallax Hero</h1>
      </motion.div>
    </section>
  );
};
```

---

### 3. Hover Animations (whileHover)

**Usage :** Animations au survol

```jsx
// Simple hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="btn"
>
  Hover me
</motion.button>

// Hover avec transition custom
<motion.div
  whileHover={{
    scale: 1.05,
    rotateZ: 2,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="card"
>
  <h3>Interactive Card</h3>
</motion.div>

// Hover avec child animations
<motion.button
  whileHover="hover"
  className="group flex items-center gap-2"
>
  Continue
  <motion.div
    variants={{
      hover: { x: 5 }
    }}
  >
    <ArrowRight size={18} />
  </motion.div>
</motion.button>
```

**Best Practices Hover :**
```jsx
// ✅ BON : Subtil et rapide
whileHover={{ scale: 1.05, y: -2 }}
transition={{ duration: 0.2 }}

// ❌ MAUVAIS : Trop agressif
whileHover={{ scale: 1.3, rotate: 15 }}
transition={{ duration: 1 }}
```

---

### 4. Loop Animations

**Usage :** Animations en boucle (formes décoratives, loaders)

```jsx
// Pulse loop (comme le badge "Live")
<motion.div
  animate={{
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1]
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="w-2 h-2 bg-green-500 rounded-full"
/>

// Rotation loop (loader)
<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 1,
    repeat: Infinity,
    ease: "linear"
  }}
  className="w-6 h-6 border-2 border-black border-t-transparent rounded-full"
/>

// Float animation (décoratif)
<motion.div
  animate={{
    y: [0, -20, 0]
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
  <FloatingElement />
</motion.div>
```

**Forme décorative animée (Hero background) :**

```jsx
<motion.div
  animate={{
    scale: [1, 1.1, 1],
    opacity: [0.4, 0.3, 0.4]
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="absolute top-0 right-0 w-1/2 h-full bg-[#F0FFFF] opacity-40 blur-[120px] rounded-full"
/>
```

---

### 5. Stagger Animations

**Usage :** Animer des éléments de liste avec délai séquentiel

```jsx
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,  // Délai entre chaque enfant
      delayChildren: 0.2     // Délai avant le premier enfant
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const ServicesList = () => (
  <motion.div
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="grid md:grid-cols-3 gap-8"
  >
    {services.map((service) => (
      <motion.div key={service.id} variants={item}>
        <ServiceCard {...service} />
      </motion.div>
    ))}
  </motion.div>
);
```

**Stagger avec direction :**

```jsx
// Stagger from left to right
const containerLeftToRight = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1  // 1 = forward, -1 = backward
    }
  }
};

// Stagger from right to left
const containerRightToLeft = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  }
};
```

---

### 6. Custom Delay (Index-Based)

**Usage :** Délai basé sur l'index dans une liste

```jsx
const Services = () => (
  <div className="grid md:grid-cols-3 gap-8">
    {services.map((service, index) => (
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: index * 0.1  // 0s, 0.1s, 0.2s, etc.
        }}
      >
        <ServiceCard {...service} />
      </motion.div>
    ))}
  </div>
);
```

---

## 🎛️ Event Listeners (useMotionValueEvent)

**Usage :** Réagir aux changements de motion values

```jsx
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });
  
  return (
    <motion.nav
      animate={{
        backgroundColor: isScrolled ? "rgba(255,255,255,0.9)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)"
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Nav content */}
    </motion.nav>
  );
};
```

---

## 🎯 Best Practices

### Performance

**✅ BON : GPU-Accelerated Properties**
```jsx
// Utilisez UNIQUEMENT ces propriétés pour des animations performantes
<motion.div
  animate={{
    x: 100,           // translateX
    y: 100,           // translateY
    scale: 1.2,       // scale
    rotate: 45,       // rotate
    opacity: 0.5      // opacity
  }}
/>
```

**❌ MAUVAIS : Properties qui trigger layout**
```jsx
// Évitez ces propriétés (causent des reflows)
<motion.div
  animate={{
    width: 200,       // ❌ Layout shift
    height: 200,      // ❌ Layout shift
    top: 100,         // ❌ Layout shift
    left: 100,        // ❌ Layout shift
    padding: 20       // ❌ Layout shift
  }}
/>
```

### Timing et Duration

**Durées Recommandées :**
```jsx
// Micro-interactions (hover, tap)
duration: 0.2 - 0.3

// Entrées standard (fade in, slide in)
duration: 0.5 - 0.7

// Animations complexes (stagger, orchestration)
duration: 0.8 - 1.2

// Animations décoratives (background shapes)
duration: 3 - 8
```

**Easing Functions :**
```jsx
// Par défaut (recommandé)
ease: "easeOut"

// Plus naturel (spring)
type: "spring"
stiffness: 300
damping: 20

// Linéaire (loaders)
ease: "linear"

// Custom cubic-bezier
ease: [0.6, 0.01, 0.05, 0.95]
```

### Cohérence

**✅ BON : Animations cohérentes**
```jsx
// Toutes les cards ont la même animation
const cardAnimation = {
  whileHover: { y: -8 },
  transition: { duration: 0.3 }
};

<motion.div {...cardAnimation}>Card 1</motion.div>
<motion.div {...cardAnimation}>Card 2</motion.div>
<motion.div {...cardAnimation}>Card 3</motion.div>
```

**❌ MAUVAIS : Animations incohérentes**
```jsx
<motion.div whileHover={{ y: -8 }}>Card 1</motion.div>
<motion.div whileHover={{ scale: 1.1 }}>Card 2</motion.div>
<motion.div whileHover={{ rotate: 5 }}>Card 3</motion.div>
```

### Accessibilité

**Respecter `prefers-reduced-motion` :**

```jsx
import { motion } from 'framer-motion';

const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);
  
  return prefersReducedMotion;
};

const AnimatedComponent = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
    >
      Content
    </motion.div>
  );
};
```

---

## 📚 Librairie de Variants Communs

### Fichier d'Utilitaires Complet

**`src/utils/animations.js` :**

```javascript
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENTRÉES (Initial Animations)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STAGGER (Liste Animations)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HOVER (Interactive Animations)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const hoverLift = {
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const hoverScale = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const hoverRotate = {
  hover: {
    rotate: 3,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LOOP (Continuous Animations)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const pulseAnimation = {
  scale: [1, 1.1, 1],
  opacity: [1, 0.8, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const floatAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const rotateAnimation = {
  rotate: 360,
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: "linear"
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UTILITY FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const getDelayedAnimation = (index, baseDelay = 0.1) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.6,
    delay: index * baseDelay
  }
});
```

---

## 💡 Exemples de Composants Animés

### Hero Section Animée

```jsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    {/* Background shapes animées */}
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.4, 0.3, 0.4]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-0 right-0 w-1/2 h-full bg-[#F0FFFF] blur-[120px] rounded-full"
    />
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-6"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-500 rounded-full"
          />
          <span className="text-xs uppercase">Agence Web Premium</span>
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl font-bold mb-6"
        >
          Votre site web ne doit pas seulement être beau.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl text-gray-600 mb-10"
        >
          Nous transformons votre vision en expérience digitale.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-black text-white px-8 py-4 rounded-sm flex items-center gap-2"
          >
            Démarrer un projet
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              <ArrowRight size={18} />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);
```

### Services Grid avec Stagger

```jsx
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';

const Services = () => {
  const services = [
    { icon: <Palette />, title: "Design UI/UX", description: "..." },
    { icon: <Code />, title: "Développement", description: "..." },
    { icon: <Zap />, title: "Performance", description: "..." }
  ];
  
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl font-bold">Notre Expertise</h2>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="p-8 bg-white rounded-sm shadow hover:shadow-xl transition-shadow"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
```

---

## 🐛 Tips de Debugging

### Visualiser les Animations

```jsx
// Ajouter un log dans onAnimationComplete
<motion.div
  animate={{ opacity: 1 }}
  onAnimationComplete={() => console.log('Animation terminée')}
/>

// Debug motion values
import { useMotionValue, useMotionValueEvent } from 'framer-motion';

const x = useMotionValue(0);

useMotionValueEvent(x, "change", (latest) => {
  console.log("x changed to", latest);
});
```

### Ralentir les Animations

```jsx
// Multiplier les durées par 10 pour debug
<motion.div
  animate={{ opacity: 1 }}
  transition={{ duration: 6 }}  // Au lieu de 0.6
/>
```

### DevTools

Installer **Framer Motion DevTools** :
```bash
pnpm add -D framer-motion-devtools
```

```jsx
import { MotionDevTools } from 'framer-motion-devtools';

function App() {
  return (
    <>
      <YourApp />
      <MotionDevTools />
    </>
  );
}
```

---

## ✅ Checklist Animations

Avant de commiter une animation :

- [ ] Animation subtile (pas "too much")
- [ ] Durée appropriée (0.2-0.8s pour la plupart)
- [ ] Utilise `transform` et `opacity` uniquement
- [ ] `once: true` sur `whileInView` (pas de rejeu)
- [ ] Cohérente avec les autres animations
- [ ] Testée sur mobile (60fps minimum)
- [ ] `prefers-reduced-motion` respecté (optionnel)

---

## 🎉 Conclusion

Les animations Motion sont puissantes mais doivent être utilisées avec parcimonie. Garde en tête :

- **Subtilité** : Moins c'est plus
- **Performance** : GPU-accelerated uniquement
- **Cohérence** : Même timing, même easing
- **Intention** : Chaque animation a un but

**Utilise les utilitaires, respecte les best practices, et tes animations seront élégantes ! 🚀**
