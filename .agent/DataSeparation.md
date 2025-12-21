# 📊 Data Separation - Séparation Données / UI

## 🎯 Pourquoi Séparer les Données de l'UI ?

### Problèmes du Code Mixé

```jsx
// ❌ MAUVAIS : Données hardcodées dans le JSX
const Services = () => (
  <section>
    <div className="card">
      <Palette size={32} />
      <h3>Design UI/UX Premium</h3>
      <p>Nous créons des interfaces qui inspirent confiance...</p>
    </div>
    <div className="card">
      <Code size={32} />
      <h3>Développement Sur-Mesure</h3>
      <p>Pas de templates génériques...</p>
    </div>
    <div className="card">
      <Smartphone size={32} />
      <h3>Optimisation Mobile</h3>
      <p>En RDC, le mobile est roi...</p>
    </div>
  </section>
);
```

**Problèmes :**
1. ❌ Duplication de structure (violation du DRY)
2. ❌ Modification difficile (changer un style = modifier 3 endroits)
3. ❌ Impossible à internationaliser (textes hardcodés)
4. ❌ Impossible à brancher sur une API/CMS
5. ❌ Tests difficiles (données couplées à l'UI)
6. ❌ Réutilisation impossible

---

## ✅ Avantages de la Séparation

### Maintenabilité

```jsx
// ✅ BON : Données séparées
const services = [
  {
    id: 1,
    icon: <Palette size={32} />,
    title: "Design UI/UX Premium",
    description: "Nous créons des interfaces qui inspirent confiance..."
  },
  {
    id: 2,
    icon: <Code size={32} />,
    title: "Développement Sur-Mesure",
    description: "Pas de templates génériques..."
  },
  {
    id: 3,
    icon: <Smartphone size={32} />,
    title: "Optimisation Mobile",
    description: "En RDC, le mobile est roi..."
  }
];

const Services = () => (
  <section className="grid md:grid-cols-3 gap-8">
    {services.map(service => (
      <ServiceCard key={service.id} {...service} />
    ))}
  </section>
);
```

**Avantages :**
1. ✅ **DRY** : Un seul template pour tous
2. ✅ **Modifiable** : Changer le template = tous les items changent
3. ✅ **I18n ready** : Facile d'externaliser les textes
4. ✅ **API ready** : Remplacer l'array par un fetch()
5. ✅ **Testable** : Tester données et UI séparément
6. ✅ **Réutilisable** : ServiceCard utilisable partout

### Préparation CMS/API

```jsx
// Actuellement : Data statique
const projects = [
  { id: 1, title: "Project 1", ... }
];

// Demain : Data depuis API (facile à migrer)
const [projects, setProjects] = useState([]);

useEffect(() => {
  fetch('/api/projects')
    .then(res => res.json())
    .then(data => setProjects(data));
}, []);

// Le composant reste IDENTIQUE
<div className="grid">
  {projects.map(project => (
    <ProjectCard key={project.id} {...project} />
  ))}
</div>
```

### Internationalisation (i18n)

```jsx
// Actuellement
const services = [
  { title: "Design UI/UX", description: "Nous créons..." }
];

// Demain : Multi-langue
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      title: t('services.design.title'),
      description: t('services.design.description')
    }
  ];
  
  // UI reste identique
};
```

---

## 🎨 Patterns de Séparation

### Pattern 1 : Arrays of Objects

**Le plus courant et recommandé.**

```jsx
// 1. Définir les données
const services = [
  {
    id: 1,
    icon: <Palette size={32} />,
    title: "Design UI/UX Premium",
    description: "Nous créons des interfaces qui inspirent confiance immédiate.",
    category: "Design"
  },
  {
    id: 2,
    icon: <Code size={32} />,
    title: "Développement Sur-Mesure",
    description: "Pas de templates génériques. Du code robuste et évolutif.",
    category: "Development"
  },
  {
    id: 3,
    icon: <Smartphone size={32} />,
    title: "Optimisation Mobile",
    description: "Votre site sera parfaitement fluide sur tous les smartphones.",
    category: "Mobile"
  },
  {
    id: 4,
    icon: <BarChart3 size={32} />,
    title: "SEO & Performance",
    description: "Nous optimisons chaque ligne de code pour Google.",
    category: "SEO"
  }
];

// 2. Créer un composant pour l'item
const ServiceCard = ({ icon, title, description, category }) => (
  <div className="p-8 bg-white rounded-sm shadow hover:shadow-xl transition-shadow">
    <div className="mb-6 text-black">
      {icon}
    </div>
    <span className="text-xs uppercase text-gray-500 tracking-wide">{category}</span>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// 3. Mapper les données
const Services = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="font-serif text-5xl font-bold text-center mb-16">
        Notre Expertise
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map(service => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </div>
  </section>
);
```

---

### Pattern 2 : Spread Props

**Pratique pour passer toutes les props en une fois.**

```jsx
const project = {
  title: "Architecture Moderne",
  category: "Site Vitrine",
  image: "https://picsum.photos/800/600?random=1",
  link: "https://example.com",
  year: 2024,
  client: "Client XYZ"
};

// ✅ BON : Spread props
<ProjectCard {...project} />

// Équivalent à :
<ProjectCard
  title={project.title}
  category={project.category}
  image={project.image}
  link={project.link}
  year={project.year}
  client={project.client}
/>
```

**Attention :** Utiliser le spread uniquement si le composant accepte toutes les props.

```jsx
// ❌ MAUVAIS : Le composant reçoit des props inutiles
const project = {
  title: "Project",
  internalId: "abc123",  // Pas utilisé dans ProjectCard
  createdAt: "2024-01-01"  // Pas utilisé
};

<ProjectCard {...project} />  // Passe internalId et createdAt inutilement

// ✅ BON : Destructuring pour ne passer que ce qui est nécessaire
const { title, category, image, link } = project;
<ProjectCard title={title} category={category} image={image} link={link} />

// OU : Spread avec omission
const { internalId, createdAt, ...projectProps } = project;
<ProjectCard {...projectProps} />
```

---

### Pattern 3 : .map() pour Listes

**Toujours utiliser `.map()` pour itérer sur des arrays.**

```jsx
// ✅ BON : Utiliser .map()
const testimonials = [
  { id: 1, name: "Marie Kalala", text: "Excellent travail!", rating: 5 },
  { id: 2, name: "Jean Mukendi", text: "Très professionnel", rating: 5 },
  { id: 3, name: "Sophie Ilunga", text: "Je recommande", rating: 5 }
];

<div className="grid md:grid-cols-3 gap-8">
  {testimonials.map(testimonial => (
    <TestimonialCard key={testimonial.id} {...testimonial} />
  ))}
</div>

// ❌ MAUVAIS : Répéter le JSX
<div>
  <TestimonialCard name="Marie Kalala" text="Excellent travail!" rating={5} />
  <TestimonialCard name="Jean Mukendi" text="Très professionnel" rating={5} />
  <TestimonialCard name="Sophie Ilunga" text="Je recommande" rating={5} />
</div>
```

**Key prop obligatoire :**

```jsx
// ✅ BON : key unique et stable (id)
{items.map(item => (
  <Card key={item.id} {...item} />
))}

// ⚠️ OK mais pas idéal : key = index (si liste stable)
{items.map((item, index) => (
  <Card key={index} {...item} />
))}

// ❌ MAUVAIS : pas de key (React warning)
{items.map(item => (
  <Card {...item} />
))}
```

---

## 📁 Structure des Données

### Services

```javascript
const services = [
  {
    id: 1,  // Unique identifier
    icon: <Palette size={32} />,  // React element
    title: "Design UI/UX Premium",
    description: "Description détaillée du service...",
    category: "Design",  // Pour filtrage/tri
    bg: "bg-[#FAFAFA]"  // Background variant (optionnel)
  },
  {
    id: 2,
    icon: <Code size={32} />,
    title: "Développement Sur-Mesure",
    description: "Description détaillée du service...",
    category: "Development",
    bg: "bg-[#F8F8FF]"
  }
];
```

**Usage :**
```jsx
// Simple
{services.map(service => (
  <ServiceCard key={service.id} {...service} />
))}

// Avec filtrage
const designServices = services.filter(s => s.category === "Design");
{designServices.map(service => (
  <ServiceCard key={service.id} {...service} />
))}
```

---

### Projets Portfolio

```javascript
const projects = [
  {
    id: 1,
    title: "Architecture Moderne",
    category: "Site Vitrine",
    description: "Site web élégant pour une agence d'architecture",
    image: "https://picsum.photos/800/600?random=1",
    link: "https://example.com",
    year: 2024,
    client: "Atelier Design RDC",
    tags: ["React", "Tailwind", "Framer Motion"],
    featured: true  // Projet mis en avant
  },
  {
    id: 2,
    title: "Kinshasa Finance",
    category: "Plateforme Corporate",
    description: "Plateforme de gestion financière pour entreprises",
    image: "https://picsum.photos/800/600?random=2",
    link: "https://example2.com",
    year: 2024,
    client: "Kinshasa Finance SA",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    featured: true
  },
  {
    id: 3,
    title: "E-commerce Fashion",
    category: "E-commerce",
    description: "Boutique en ligne pour une marque de mode congolaise",
    image: "https://picsum.photos/800/600?random=3",
    link: "https://example3.com",
    year: 2023,
    client: "Nzela Fashion",
    tags: ["Shopify", "React", "Stripe"],
    featured: false
  }
];
```

**Usage :**
```jsx
// Tous les projets
{projects.map(project => (
  <ProjectCard key={project.id} {...project} />
))}

// Seulement les featured
const featuredProjects = projects.filter(p => p.featured);
{featuredProjects.map(project => (
  <ProjectCard key={project.id} {...project} />
))}

// Triés par année
const sortedProjects = [...projects].sort((a, b) => b.year - a.year);
```

---

### Témoignages

```javascript
const testimonials = [
  {
    id: 1,
    name: "Marie Kalala",
    role: "CEO, StartupRDC",
    text: "Elegant a transformé notre présence en ligne. Notre taux de conversion a augmenté de 150% en 3 mois.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=1",
    company: "StartupRDC",
    projectType: "Site Vitrine"
  },
  {
    id: 2,
    name: "Jean Mukendi",
    role: "Directeur Marketing, Kinshasa Finance",
    text: "Professionnel, rapide, et à l'écoute. Notre plateforme est un succès grâce à leur expertise.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=2",
    company: "Kinshasa Finance",
    projectType: "Plateforme Corporate"
  },
  {
    id: 3,
    name: "Sophie Ilunga",
    role: "Fondatrice, Nzela Fashion",
    text: "Notre boutique en ligne a dépassé nos attentes. Le design est magnifique et les ventes explosent.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=3",
    company: "Nzela Fashion",
    projectType: "E-commerce"
  }
];
```

**Usage :**
```jsx
const TestimonialCard = ({ name, role, text, rating, avatar }) => (
  <div className="p-8 bg-white rounded-sm shadow">
    <div className="flex items-center gap-4 mb-4">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
    <div className="flex gap-1 mb-3">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={16} fill="gold" />
      ))}
    </div>
    <p className="text-gray-600 italic">"{text}"</p>
  </div>
);

// Mapping
{testimonials.map(testimonial => (
  <TestimonialCard key={testimonial.id} {...testimonial} />
))}
```

---

### Navigation Links

```javascript
const navLinks = [
  { id: 1, name: "Expertise", href: "#services" },
  { id: 2, name: "Réalisations", href: "#portfolio" },
  { id: 3, name: "Témoignages", href: "#testimonials" },
  { id: 4, name: "FAQ", href: "#faq" }
];

// Usage dans Navbar
<nav>
  {navLinks.map(link => (
    <a
      key={link.id}
      href={link.href}
      className="text-gray-600 hover:text-black transition-colors"
    >
      {link.name}
    </a>
  ))}
</nav>
```

---

### FAQ

```javascript
const faqs = [
  {
    id: 1,
    question: "Quels sont vos délais de réalisation ?",
    answer: "Un site vitrine simple : 2-3 semaines. Une plateforme complexe : 2-3 mois. Nous adaptons notre planning à vos besoins."
  },
  {
    id: 2,
    question: "Proposez-vous la maintenance après livraison ?",
    answer: "Oui ! Nous offrons des contrats de maintenance mensuels incluant mises à jour, support technique et optimisations."
  },
  {
    id: 3,
    question: "Travaillez-vous avec des entreprises en RDC uniquement ?",
    answer: "Non, nous travaillons avec des clients dans toute l'Afrique et même au-delà. La distance n'est pas un obstacle."
  },
  {
    id: 4,
    question: "Quel est votre processus de travail ?",
    answer: "1) Découverte & Brief, 2) Wireframes & Maquettes, 3) Développement, 4) Tests & Optimisation, 5) Livraison & Formation."
  }
];
```

**Usage avec DaisyUI Accordion :**
```jsx
<div className="space-y-4">
  {faqs.map(faq => (
    <div key={faq.id} className="collapse collapse-plus bg-base-100 border border-gray-200">
      <input type="radio" name="faq-accordion" />
      <div className="collapse-title text-lg font-medium">
        {faq.question}
      </div>
      <div className="collapse-content">
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    </div>
  ))}
</div>
```

---

## 📂 Où Placer les Données ?

### Option 1 : Top du Fichier (Petits Datasets)

**Pour :** < 10 items, utilisés dans un seul composant

```jsx
import React from 'react';
import { Palette, Code, Smartphone } from 'lucide-react';

// ✅ Données en haut du fichier
const services = [
  { id: 1, icon: <Palette size={32} />, title: "Design", ... },
  { id: 2, icon: <Code size={32} />, title: "Dev", ... },
  { id: 3, icon: <Smartphone size={32} />, title: "Mobile", ... }
];

const Services = () => (
  <section>
    {services.map(service => (
      <ServiceCard key={service.id} {...service} />
    ))}
  </section>
);

export default Services;
```

---

### Option 2 : Fichier Séparé (Grands Datasets)

**Pour :** > 10 items, réutilisés dans plusieurs composants

**Fichier :** `src/data/services.js`
```javascript
import { Palette, Code, Smartphone, BarChart3 } from 'lucide-react';

export const services = [
  {
    id: 1,
    icon: <Palette size={32} />,
    title: "Design UI/UX Premium",
    description: "Nous créons des interfaces qui inspirent confiance immédiate.",
    category: "Design",
    bg: "bg-[#FAFAFA]"
  },
  {
    id: 2,
    icon: <Code size={32} />,
    title: "Développement Sur-Mesure",
    description: "Pas de templates génériques. Du code robuste et évolutif.",
    category: "Development",
    bg: "bg-[#F8F8FF]"
  },
  {
    id: 3,
    icon: <Smartphone size={32} />,
    title: "Optimisation Mobile",
    description: "Votre site sera parfaitement fluide sur tous les smartphones.",
    category: "Mobile",
    bg: "bg-[#FFFFF0]"
  },
  {
    id: 4,
    icon: <BarChart3 size={32} />,
    title: "SEO & Performance",
    description: "Nous optimisons chaque ligne de code pour Google.",
    category: "SEO",
    bg: "bg-[#F0FFFF]"
  }
];
```

**Usage :**
```jsx
import { services } from '../data/services';

const Services = () => (
  <section>
    {services.map(service => (
      <ServiceCard key={service.id} {...service} />
    ))}
  </section>
);
```

---

### Option 3 : API/CMS (Production)

**Pour :** Données dynamiques, éditées par des non-devs

```jsx
import { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch depuis API
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching services:', err);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <section>
      {services.map(service => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </section>
  );
};
```

**Avec un CMS (Strapi, Contentful, Sanity) :**
```jsx
import { client } from '../lib/contentful';

const Services = () => {
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    client.getEntries({ content_type: 'service' })
      .then(response => {
        setServices(response.items.map(item => ({
          id: item.sys.id,
          ...item.fields
        })));
      });
  }, []);
  
  // Render identique
};
```

---

## 📊 Structure de Dossiers Recommandée

```
src/
├── data/
│   ├── services.js        # Services de l'agence
│   ├── projects.js        # Projets portfolio
│   ├── testimonials.js    # Témoignages clients
│   ├── faqs.js            # Questions fréquentes
│   ├── navigation.js      # Liens de navigation
│   └── team.js            # Membres de l'équipe (si besoin)
├── components/
│   ├── ui/
│   │   ├── ServiceCard.jsx
│   │   ├── ProjectCard.jsx
│   │   └── TestimonialCard.jsx
│   └── sections/
│       ├── Services.jsx
│       ├── Portfolio.jsx
│       └── Testimonials.jsx
└── App.jsx
```

---

## ✅ Best Practices

### 1. Structure Cohérente

```jsx
// ✅ BON : Toutes les données ont la même structure
const items = [
  { id: 1, title: "Item 1", description: "..." },
  { id: 2, title: "Item 2", description: "..." },
  { id: 3, title: "Item 3", description: "..." }
];

// ❌ MAUVAIS : Structures incohérentes
const items = [
  { id: 1, title: "Item 1", desc: "..." },  // desc
  { id: 2, name: "Item 2", description: "..." },  // name au lieu de title
  { title: "Item 3", description: "..." }  // Pas d'id
];
```

### 2. IDs Uniques

```jsx
// ✅ BON : IDs numériques séquentiels
const items = [
  { id: 1, ... },
  { id: 2, ... },
  { id: 3, ... }
];

// ✅ BON : UUIDs (si nécessaire)
const items = [
  { id: "abc123", ... },
  { id: "def456", ... }
];

// ❌ MAUVAIS : Pas d'IDs
const items = [
  { title: "Item 1", ... },
  { title: "Item 2", ... }
];
```

### 3. Données Typées (JSDoc)

```javascript
/**
 * @typedef {Object} Service
 * @property {number} id - Unique identifier
 * @property {JSX.Element} icon - Lucide icon component
 * @property {string} title - Service title
 * @property {string} description - Service description
 * @property {string} category - Service category
 * @property {string} [bg] - Background color class (optional)
 */

/** @type {Service[]} */
export const services = [
  {
    id: 1,
    icon: <Palette size={32} />,
    title: "Design UI/UX Premium",
    description: "...",
    category: "Design",
    bg: "bg-[#FAFAFA]"
  }
];
```

---

## 🎯 Exemples Avant/Après

### Exemple 1 : Services

**❌ AVANT (Mauvais) :**
```jsx
const Services = () => (
  <section>
    <div className="card">
      <Palette size={32} />
      <h3>Design UI/UX</h3>
      <p>Description...</p>
    </div>
    <div className="card">
      <Code size={32} />
      <h3>Développement</h3>
      <p>Description...</p>
    </div>
    <div className="card">
      <Smartphone size={32} />
      <h3>Mobile</h3>
      <p>Description...</p>
    </div>
  </section>
);
```

**✅ APRÈS (Bon) :**
```jsx
const services = [
  { id: 1, icon: <Palette size={32} />, title: "Design UI/UX", description: "..." },
  { id: 2, icon: <Code size={32} />, title: "Développement", description: "..." },
  { id: 3, icon: <Smartphone size={32} />, title: "Mobile", description: "..." }
];

const ServiceCard = ({ icon, title, description }) => (
  <div className="card">
    {icon}
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Services = () => (
  <section>
    {services.map(service => (
      <ServiceCard key={service.id} {...service} />
    ))}
  </section>
);
```

---

### Exemple 2 : Portfolio

**❌ AVANT :**
```jsx
const Portfolio = () => (
  <div className="grid grid-cols-3">
    <div>
      <img src="project1.jpg" alt="Project 1" />
      <h3>Architecture Moderne</h3>
      <p>Site Vitrine</p>
    </div>
    <div>
      <img src="project2.jpg" alt="Project 2" />
      <h3>Kinshasa Finance</h3>
      <p>Plateforme Corporate</p>
    </div>
    <div>
      <img src="project3.jpg" alt="Project 3" />
      <h3>E-commerce Fashion</h3>
      <p>E-commerce</p>
    </div>
  </div>
);
```

**✅ APRÈS :**
```jsx
const projects = [
  { id: 1, image: "project1.jpg", title: "Architecture Moderne", category: "Site Vitrine" },
  { id: 2, image: "project2.jpg", title: "Kinshasa Finance", category: "Plateforme Corporate" },
  { id: 3, image: "project3.jpg", title: "E-commerce Fashion", category: "E-commerce" }
];

const ProjectCard = ({ image, title, category }) => (
  <div>
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <p>{category}</p>
  </div>
);

const Portfolio = () => (
  <div className="grid grid-cols-3">
    {projects.map(project => (
      <ProjectCard key={project.id} {...project} />
    ))}
  </div>
);
```

---

## 🎉 Conclusion

La séparation données/UI est **fondamentale** pour :
- **Maintenabilité** : Code plus facile à modifier
- **Réutilisabilité** : Composants réutilisables partout
- **Scalabilité** : Prêt pour API/CMS/i18n
- **Testabilité** : Tests plus simples
- **DRY** : Pas de duplication

**Toujours séparer les données de l'UI ! 🚀**
