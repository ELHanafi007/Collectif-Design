'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: "e10a8400-e29b-41d4-a716-446655440001",
    name: 'Salon Royal, Ensemble 3+2+1',
    category: "Salons",
    oldPrice: '45 000 DH',
    newPrice: '32 900 DH',
    discount: '-27%',
    image: '/salon.jpeg'
  },
  {
    id: "e10a8400-e29b-41d4-a716-446655440002",
    name: 'Table à Manger Cristal & Or',
    category: 'Espaces Repas',
    oldPrice: '18 500 DH',
    newPrice: '14 500 DH',
    discount: '-22%',
    image: '/table a manger.jpeg'
  },
  {
    id: "e10a8400-e29b-41d4-a716-446655440003",
    name: 'Lit Master, Velours Gris',
    category: 'Chambres',
    oldPrice: '15 900 DH',
    newPrice: '12 500 DH',
    discount: '-21%',
    image: '/unsplash-bed.jpg'
  },
  {
    id: "e10a8400-e29b-41d4-a716-446655440004",
    name: 'Buffet Contemporain Laqué',
    category: 'Salons',
    oldPrice: '9 800 DH',
    newPrice: '7 500 DH',
    discount: '-23%',
    image: '/buffet.jpeg'
  },
  {
    id: "e10a8400-e29b-41d4-a716-446655440005",
    name: 'Miroir Majestic, Cadre Doré',
    category: 'Décoration',
    oldPrice: '4 200 DH',
    newPrice: '2 900 DH',
    discount: '-31%',
    image: '/miroires.jpeg'
  },
  {
    id: "e10a8400-e29b-41d4-a716-446655440006",
    name: 'Console Mirage, Plateau Verre',
    category: 'Salons',
    oldPrice: '6 500 DH',
    newPrice: '4 900 DH',
    discount: '-25%',
    image: '/Console.jpeg'
  }
];

export default function OffersSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(2);
      }
    };
    
    // Set initial
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleProducts = products.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="bg-surface py-16 md:py-32">
      <div className="container-wide mx-auto px-5 md:px-12">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.2em] uppercase font-light text-muted mb-4"
          >
            OFFRES EXCLUSIVES
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl tracking-wide uppercase font-medium text-foreground mb-8"
          >
            NOS MEILLEURES OFFRES
          </motion.h2>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${currentPage}-${itemsPerPage}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
            >
              {visibleProducts.map((product) => (
                <div key={product.id} className="flex flex-col group bg-background p-4 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-surface rounded-xl">
                    <div className="absolute top-4 left-4 bg-[#d11124] text-white text-[10px] font-bold px-3 py-1 z-10 rounded-full">
                      {product.discount}
                    </div>
                    
                    <Link href={`/products/${product.id}`} className="block h-full w-full">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </Link>

                    <button className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-black p-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full hover:bg-black hover:text-white transform translate-y-2 group-hover:translate-y-0">
                      <ShoppingCart size={18} />
                    </button>
                  </div>

                  <div className="space-y-2 px-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted">{product.category}</h3>
                    <h4 className="text-sm font-medium tracking-tight leading-snug group-hover:text-foreground transition-colors line-clamp-1">{product.name}</h4>
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-sm font-bold text-[#d11124]">{product.newPrice}</span>
                      <span className="text-xs text-muted line-through opacity-50">{product.oldPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
