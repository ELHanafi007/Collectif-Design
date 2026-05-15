'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    name: 'Bering, Canapé 3 Places',
    category: 'Canapés',
    image: '/salon.jpeg', 
    oldPrice: '18 350',
    price: '13 590',
    badge: '-26%'
  },
  {
    name: 'Sandra, Canapé 2 places, 155 cm',
    category: 'Canapés',
    image: '/salon.jpeg',
    oldPrice: '9 600',
    price: '5 990',
    badge: '-38%'
  }
];

export default function PromoBanner() {
  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[900px]">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full">
          <img 
            src="/salon.jpeg" 
            alt="Découvrir nos canapés" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Content & Products */}
        <div className="w-full lg:w-1/2 p-4 md:p-12 lg:p-16 flex flex-col justify-center relative">
          <div className="text-center mb-10">
            <h3 className="text-[13px] text-gray-500 font-light tracking-[0.1em] uppercase mb-2">
              L'extraordinaire dans l'ordinaire
            </h3>
            <h2 className="text-2xl md:text-[28px] text-gray-800 font-light tracking-[0.1em] uppercase">
              Découvrir nos canapés
            </h2>
          </div>

          <div className="relative w-full max-w-2xl mx-auto flex items-center">
            {/* Left Arrow */}
            <button className="absolute -left-6 z-20 text-gray-400 hover:text-black hidden md:block">
              <ChevronLeft size={24} />
            </button>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {products.map((item, idx) => (
                <div key={idx} className="border border-gray-100 p-4 hover:shadow-lg transition-shadow group flex flex-col relative">
                  <div className="relative aspect-[4/3] mb-4 bg-white">
                    <div className="absolute top-0 left-0 z-10 bg-black text-white text-[11px] font-bold px-1.5 py-0.5">
                      {item.badge}
                    </div>
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    
                    {/* Hover Add to Cart */}
                    <div className="absolute bottom-0 left-0 right-0 bg-[#2a2a2a] text-white text-[10px] tracking-wider py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity uppercase font-medium cursor-pointer">
                      Ajouter au panier
                    </div>
                  </div>
                  <div className="text-center space-y-1 mt-auto">
                    <h3 className="text-[13px] text-gray-800 font-medium">{item.name}</h3>
                    <p className="text-[11px] text-gray-400">{item.category}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-[11px] text-gray-400 line-through">{item.oldPrice} DH</span>
                      <span className="text-sm font-bold text-red-600">{item.price} DH</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button className="absolute -right-6 z-20 text-gray-400 hover:text-black hidden md:block">
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
            <div className="w-1.5 h-1.5 rounded-full border border-gray-400"></div>
          </div>

          <div className="mt-2 flex justify-center w-full max-w-2xl mx-auto">
             <Link href="/shop" className="bg-[#2a2a2a] text-white uppercase text-xs tracking-widest py-3.5 px-8 w-full text-center hover:bg-black transition-colors">
               VOIR PLUS
             </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
