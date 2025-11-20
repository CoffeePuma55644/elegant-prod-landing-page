import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Elegant a complètement transformé notre image en ligne. Nous sommes passés d'un site amateur à une référence dans notre secteur à Kinshasa.",
    author: "Jean-Paul M.",
    role: "CEO, Mining Solutions RDC"
  },
  {
    quote: "La vitesse d'exécution et la qualité du design sont incomparables. C'est le meilleur investissement marketing que nous ayons fait cette année.",
    author: "Sarah K.",
    role: "Directrice Marketing, KivuTech"
  },
  {
    quote: "Une équipe professionnelle qui comprend les enjeux du marché local tout en apportant des standards internationaux. Bravo.",
    author: "Michel B.",
    role: "Fondateur, ImmoCongo"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#FAF0E6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-black">
            Ce que disent nos clients
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 relative">
              <Quote className="absolute top-6 right-6 text-gray-200 rotate-180" size={40} />
              <p className="text-gray-700 leading-relaxed italic mb-6 relative z-10">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0" />
                <div>
                  <p className="font-bold text-sm text-gray-900">{item.author}</p>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
