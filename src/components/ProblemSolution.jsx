import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProblemSolution = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Problem - Pain Agitation */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
              Pourquoi la plupart des sites web <span className="text-red-500 line-through decoration-2 decoration-black opacity-60">échouent</span> ?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Nous vivons à l'ère de l'attention courte. Vos visiteurs vous jugent en moins de 0.5 secondes. Un site lent, mal conçu ou générique ne vous coûte pas seulement de l'image, il vous coûte de l'argent.
            </p>
            
            <div className="bg-[#FAFAFA] p-6 rounded-sm border-l-4 border-gray-200 space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-gray-400 shrink-0 mt-1" size={20} />
                <p className="text-sm text-gray-700"><strong>Confusion :</strong> Trop d'informations tuent l'information. Le visiteur part.</p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-gray-400 shrink-0 mt-1" size={20} />
                <p className="text-sm text-gray-700"><strong>Lenteur :</strong> Chaque seconde de chargement réduit vos ventes de 7%.</p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-gray-400 shrink-0 mt-1" size={20} />
                <p className="text-sm text-gray-700"><strong>Invisibilité :</strong> Un site magnifique que personne ne trouve sur Google est inutile.</p>
              </div>
            </div>
          </motion.div>

          {/* Solution - The Elegant Way */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gray-50 transform rotate-3 rounded-sm -z-10" />
            <div className="bg-black text-white p-10 rounded-sm shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
              
              <h3 className="font-serif text-2xl font-bold mb-6">L'Approche Elegant.</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-2 rounded-full shrink-0">
                    <CheckCircle2 className="text-green-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Design Intentionnel</h4>
                    <p className="text-gray-400 text-sm mt-1">Chaque pixel a une fonction. Nous guidons l'œil de l'utilisateur vers l'action.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-2 rounded-full shrink-0">
                    <CheckCircle2 className="text-green-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Performance Extrême</h4>
                    <p className="text-gray-400 text-sm mt-1">Optimisation technique de pointe pour des chargements instantanés, même en 3G.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-2 rounded-full shrink-0">
                    <CheckCircle2 className="text-green-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Storytelling Captivant</h4>
                    <p className="text-gray-400 text-sm mt-1">Nous racontons votre histoire d'une manière qui résonne avec votre audience cible.</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
