import React from 'react';
import { ArrowRight, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#FAFAFA]">
      
      {/* Background Elements - Subtle organic shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F0FFFF] opacity-40 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-[#FAF0E6] opacity-50 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* Copywriting - Left */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-3/5 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium tracking-wide uppercase text-gray-600">Agence Web Premium en RDC</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
              Votre site web ne doit pas seulement être beau. <br />
              <span className="italic font-light text-gray-600">Il doit convertir.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-10 max-w-2xl mx-auto md:mx-0">
              Nous transformons votre vision en une expérience digitale inoubliable. 
              Design minimaliste, performance maximale, et une stratégie conçue pour capturer vos clients dès la première seconde.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <a 
                href="#contact" 
                className="group bg-black text-white px-8 py-4 rounded-sm font-medium text-base transition-all hover:bg-gray-800 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Lancer votre projet
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#portfolio" 
                className="px-8 py-4 rounded-sm font-medium text-gray-900 border border-gray-200 hover:border-gray-400 hover:bg-white transition-all"
              >
                Voir nos réalisations
              </a>
            </div>
          </motion.div>

          {/* Visual - Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-2/5 relative"
          >
            <div className="relative z-10 bg-white p-2 rounded-sm shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1481487484168-9b995ecc168d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Design Minimaliste" 
                className="w-full h-auto rounded-sm grayscale hover:grayscale-0 transition-all duration-500"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-black text-white p-4 rounded-sm shadow-lg flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <MousePointerClick size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-300 uppercase tracking-wider">Taux de conversion</p>
                  <p className="font-bold text-xl">+150%</p>
                </div>
              </div>
            </div>
            
            {/* Decorative dots */}
            <div className="absolute -top-10 -right-10 w-24 h-24 opacity-20" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
