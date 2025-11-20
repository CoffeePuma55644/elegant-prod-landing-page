import React from 'react';
import { Instagram, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4 text-black">Elegant.</h3>
            <p className="text-gray-500 max-w-xs leading-relaxed">
              Agence de développement web premium basée en RDC. Nous créons des expériences digitales qui marquent les esprits et convertissent.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-black mb-4">Liens</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-black transition-colors">Accueil</a></li>
              <li><a href="#services" className="hover:text-black transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-black transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <a href="mailto:hello@elegant.cd" className="hover:text-black transition-colors">hello@elegant.cd</a>
              </li>
              <li>Kinshasa, Gombe</li>
              <li>RDC</li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Elegant Digital Agency. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600">Confidentialité</a>
            <a href="#" className="hover:text-gray-600">Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
