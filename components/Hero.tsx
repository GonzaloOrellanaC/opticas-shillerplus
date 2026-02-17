import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-20 h-screen min-h-[600px] flex flex-col md:flex-row overflow-hidden">
      {/* Optics Side */}
      <div className="group relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10"></div>
        <img 
          src="https://optisalud.cl/cdn/shop/collections/Oakley_Jovenes2_-_1024px_-_V1.1_-_Tiny_cbc49087-a65d-4678-acab-5192f8443681.jpg?v=1695927912&width=2048" 
          alt="Óptica" 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider">ÓPTICA</h2>
          <p className="text-lg mb-6 max-w-xs font-light">Encuentra tu visión perfecta con nuestras monturas exclusivas.</p>
          <a href="#optica" className="bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center transition-all">
            Ver Colección <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Perfumery Side */}
      <div className="group relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
        <div className="absolute inset-0 bg-brand-red/30 group-hover:bg-brand-red/10 transition-all duration-500 z-10"></div>
        <img 
          src="https://img.freepik.com/foto-gratis/atractiva-seductora-sensual-mujer-elegante-vestido-boho-sentada-cafe-retro-vintage-perfume_285396-6942.jpg?semt=ais_user_personalization&w=740&q=80" 
          alt="Perfumería" 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider">PERFUMERÍA</h2>
          <p className="text-lg mb-6 max-w-xs font-light">Esencias que definen tu personalidad y estilo.</p>
          <a href="#perfumeria" className="bg-white text-brand-red hover:bg-gray-100 px-6 py-3 rounded-full flex items-center transition-all">
            Descubrir Aromas <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};