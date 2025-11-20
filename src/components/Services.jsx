import React from 'react';
import { Palette, Code, BarChart3, Smartphone } from 'lucide-react';

const services = [
  {
    icon: <Palette size={32} />,
    title: "Design UI/UX Premium",
    description: "Nous créons des interfaces qui inspirent confiance immédiate. Une esthétique raffinée qui positionne votre marque au-dessus de la concurrence.",
    bg: "bg-[#FAFAFA]"
  },
  {
    icon: <Code size={32} />,
    title: "Développement Sur-Mesure",
    description: "Pas de templates génériques. Nous codons des solutions robustes, sécurisées et évolutives adaptées spécifiquement à vos besoins d'affaires.",
    bg: "bg-[#F8F8FF]"
  },
  {
    icon: <Smartphone size={32} />,
    title: "Optimisation Mobile",
    description: "En RDC, le mobile est roi. Votre site sera parfaitement fluide et intuitif sur tous les smartphones, garantissant une expérience utilisateur sans faille.",
    bg: "bg-[#FFFFF0]"
  },
  {
    icon: <BarChart3 size={32} />,
    title: "SEO & Performance",
    description: "Être visible est crucial. Nous optimisons chaque ligne de code pour que Google adore votre site autant que vos clients.",
    bg: "bg-[#F0FFFF]"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-black mb-6">
            Notre Expertise
          </h2>
          <p className="text-gray-600 text-lg">
            Nous combinons l'art du design et la science de la conversion pour propulser votre entreprise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`${service.bg} p-8 rounded-sm border border-gray-50 hover:border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group`}
            >
              <div className="mb-6 text-black group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
