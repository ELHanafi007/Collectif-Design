'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: 'Palermo, Ensemble Extérieur 3+1+1+TB',
    category: "Jardin",
    old_price: '51 870 DH',
    newPrice: '39 900 DH',
    discount: '-23%',
    image: '/salon.jpeg'
  },
  {
    id: "c42d940b-c74a-4029-84b0-6acdb0a7265a",
    name: 'Table de chevet en Marbre Noir',
    category: 'Chambres',
    old_price: '3 200 DH',
    newPrice: '2 500 DH',
    discount: '-22%',
    image: '/tablesdechevet.jpeg'
  },
  {
    id: "709c25eb-6537-458e-90f4-b7d6c92127a6",
    name: 'Fauteuil Velours Vert Émeraude',
    category: 'Salons',
    old_price: '4 500 DH',
    newPrice: '3 200 DH',
    discount: '-29%',
    image: '/salon.jpeg'
  },
  {
    id: "e0a2940b-c74a-4029-84b0-6acdb0a7265b",
    name: 'Lampe Design Minimaliste',
    category: 'Décoration',
    old_price: '1 200 DH',
    newPrice: '850 DH',
    discount: '-30%',
    image: '/decoration.jpeg'
  },
  {
    id: "f1b2940b-c74a-4029-84b0-6acdb0a7265c",
    name: 'Table Basse Chêne Massif',
    category: 'Salons',
    old_price: '5 800 DH',
    newPrice: '4 200 DH',
    discount: '-28%',
    image: '/tabledebasse.jpeg'
  },
  {
    id: "a2c2940b-c74a-4029-84b0-6acdb0a7265d",
    name: 'Console Entrée Marbre Blanc',
    category: 'Salons',
    old_price: '7 500 DH',
    newPrice: '5 900 DH',
    discount: '-21%',
    image: '/Console.jpeg'
  }
];

export default function TrendingSection() {
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
    <section className="bg-background py-16 md:py-32">
      <div className="container-wide mx-auto px-5 md:px-12">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.2em] uppercase font-light text-muted mb-4"
          >
            ART DE VIVRE
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl tracking-wide uppercase font-medium text-foreground mb-8 font-serif"
          >
            SUIVEZ LA TENDANCE
          </motion.h2>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all cursor-pointer"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all cursor-pointer"
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
                <div key={product.id} className="flex flex-col group bg-background">
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-surface rounded-xl border border-border/50">
                    <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-3 py-1 z-10 rounded-full">
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

                    <button className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm text-foreground p-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full hover:bg-accent hover:text-white transform translate-y-2 group-hover:translate-y-0 cursor-pointer shadow-lg">
                      <ShoppingCart size={18} />
                    </button>
                  </div>

                  <div className="space-y-2 px-2">
                    <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted">{product.category}</h3>
                    <h4 className="text-sm font-medium tracking-tight leading-snug group-hover:text-accent transition-colors line-clamp-1 font-sans">{product.name}</h4>
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-sm font-bold text-foreground">{product.newPrice}</span>
                      <span className="text-xs text-muted line-through opacity-50">{product.old_price}</span>
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
