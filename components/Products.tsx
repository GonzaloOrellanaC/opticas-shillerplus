import React from 'react';
import { Product } from '../types';

const products: Product[] = [
  { id: 1, name: 'Ray-Ban Classic', category: 'optica', price: 'desde $70.000', image: 'https://www.robertomartin.com/fotos-gafas/2023/05/RAY-BAN-MEGA-WAYFARER.jpg', description: 'Diseño atemporal para un estilo elegante.' },
  { id: 2, name: 'Oakley Sport', category: 'optica', price: 'desde $80.000', image: 'https://wwd.com/wp-content/uploads/2022/09/Oakley_PATRICK-MAHOMES-II-SIGNATURE-SERIES-3-CAMPAIGN-IMAGE-2.jpg?w=1000&h=563&crop=1', description: 'Rendimiento y comodidad para deportistas.' },
  { id: 3, name: 'Gucci Frame', category: 'optica', price: 'desde $50.000', image: 'https://www.eyeons.com/cdn/shop/files/032384937dbd3a25f74e15e98a803e2e_ff49cda2-a5ac-42ed-b115-cb8a1aecc7b4.webp?v=1763111103&width=1200', description: 'Lujo italiano en cada detalle.' },
  { id: 4, name: 'Colección Chanel', category: 'perfumeria', price: 'desde $135.000', image: 'https://static.sweetcare.com/img/prd/488/v-638561383040426341/chanel-007909cl-4.webp', description: 'La esencia de la feminidad absoluta.' },
  { id: 5, name: 'Colección Dior', category: 'perfumeria', price: 'desde $110.000', image: 'https://rimage.ripley.cl/home.ripley/Attachment/WOP/1/2000373919983/image3-2000373919983.webp', description: 'Fresco, crudo y noble a la vez.' },
  { id: 6, name: 'Colección Acqua', category: 'perfumeria', price: 'desde $95.000', image: 'https://img.lojasrenner.com.br/item/928530017/original/4.jpg', description: 'Inspirado en la belleza de Pantellerie.' },
];

export const Products: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Optics Section */}
      <section id="optica" className="scroll-mt-24 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <div className="h-1 w-10 bg-brand-red mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-widest">Colección Óptica</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.filter(p => p.category === 'optica').map(product => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-square mb-4 bg-gray-100 rounded-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"; // Fallback image
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
                    Nuevo
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="text-brand-grey text-sm mb-2">{product.description}</p>
                <p className="text-brand-red font-bold">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfumery Section */}
      <section id="perfumeria" className="scroll-mt-24 py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-end mb-12">
            <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-widest text-right">Perfumería Exclusiva</h2>
            <div className="h-1 w-10 bg-brand-grey ml-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.filter(p => p.category === 'perfumeria').map(product => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-square mb-4 bg-white rounded-lg shadow-sm">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                       e.currentTarget.src = "https://images.unsplash.com/photo-1594051062402-995eb7dfa74d?auto=format&fit=crop&q=80&w=800"; // Fallback image for perfume
                    }}
                  />
                  <button className="absolute bottom-0 w-full bg-brand-red text-white py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-medium">
                    Consultar Disponibilidad
                  </button>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="text-brand-grey text-sm mb-2">{product.description}</p>
                <p className="text-brand-red font-bold">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};