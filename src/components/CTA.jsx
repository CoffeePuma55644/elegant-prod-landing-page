import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section id="contact" className="py-24 bg-[#F8F8FF] relative overflow-hidden">
      {/* Decorative BG elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
          Prêt à élever vos standards ?
        </h2>
        <p className="text-xl text-gray-600 mb-10 font-light">
          Ne laissez pas un site web médiocre freiner la croissance de votre entreprise. Discutons de votre vision.
        </p>

        <form className="max-w-md mx-auto space-y-4 text-left bg-white p-8 rounded-sm shadow-xl border border-gray-100">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Professionnel</label>
            <input 
              type="email" 
              id="email" 
              placeholder="vous@entreprise.com" 
              className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition-all bg-[#FAFAFA]"
            />
          </div>
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">Détails du projet</label>
            <textarea 
              id="project" 
              rows={3}
              placeholder="Je souhaite créer un site pour..." 
              className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition-all bg-[#FAFAFA]"
            ></textarea>
          </div>
          <button 
            type="button"
            className="w-full bg-black text-white font-bold py-4 rounded-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
          >
            Demander un audit gratuit
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-center text-gray-400 mt-4">
            Réponse sous 24h. Pas de spam, promis.
          </p>
        </form>
      </div>
    </section>
  );
};

export default CTA;
