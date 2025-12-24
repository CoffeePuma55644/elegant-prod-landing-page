import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "Combien coûte un site web avec Elegant ?",
    a: "Chaque projet est unique. Nous ne proposons pas de forfaits génériques, mais des solutions sur-mesure. Cependant, nos projets commencent généralement à partir de $150 pour un site vitrine simple ."
  },
  {
    q: "Combien de temps prend la création ?",
    a: "Pour un site vitrine standard, comptez entre 2 à 4 semaines. Pour des plateformes plus complexes, cela peut aller de 6 à 12 semaines. Nous privilégions la qualité à la précipitation.A savoir aussi que nous faisons nos sites en fonction de demande de notre clientéle ."
  },
  {
    q: "Assurez-vous la maintenance après la mise en ligne ?",
    a: "Absolument. Nous proposons des contrats de maintenance mensuels pour assurer que votre site reste sécurisé, rapide et à jour."
  },
  {
    q: "Je suis basé à Lubumbashi/Goma, pouvez-vous travailler avec moi ?",
    a: "Oui. Bien que basés principalement à Kinshasa, nous travaillons avec des clients dans toute la RDC et à l'international via visioconférence.Bien évidement sur nos différentes plate-forme réseaux tels que : Teams microsoft,Discord et ZOOM "
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white">
      <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-8 sm:mb-12">
          Questions Fréquentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              <button
                className="w-full flex items-start sm:items-center justify-between p-4 sm:p-5 text-left bg-[#FAFAFA] hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-gray-900 text-sm sm:text-base leading-snug">{faq.q}</span>
                {openIndex === index ? (
                  <Minus size={18} className="text-black shrink-0 ml-3" />
                ) : (
                  <Plus size={18} className="text-black shrink-0 ml-3" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 sm:p-5 text-gray-600 leading-relaxed border-t border-gray-100 text-sm sm:text-base">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
