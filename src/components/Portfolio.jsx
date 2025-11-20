import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "Architecture Moderne",
    category: "Site Vitrine",
    image: "https://picsum.photos/800/600?grayscale&random=1"
  },
  {
    title: "Kinshasa Finance",
    category: "Plateforme Corporate",
    image: "https://picsum.photos/800/600?grayscale&random=2"
  },
  {
    title: "Restaurant Le Palmier",
    category: "Hospitality",
    image: "https://picsum.photos/800/600?grayscale&random=3"
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-black mb-4">
              Réalisations Récentes
            </h2>
            <p className="text-gray-600 max-w-md">
              Découvrez comment nous avons aidé d'autres entreprises à se démarquer.
            </p>
          </div>
          <a href="#" className="text-black font-medium border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
            Voir tout le portfolio
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-sm aspect-4/3 mb-4">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
                  <ArrowUpRight size={20} />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-black group-hover:underline decoration-1 underline-offset-4">{project.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{project.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
