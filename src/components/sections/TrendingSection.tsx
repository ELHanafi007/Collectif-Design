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
    oldPrice: '51 870 DH',
    newPrice: '39 900 DH',
    discount: '-23%',
    image: '/salon.jpeg'
  },
  {
    id: "c42d940b-c74a-4029-84b0-6acdb0a7265a",
    name: 'Desserte Mario',
    category: 'Dessertes',
    oldPrice: '1 800 DH',
    newPrice: '1 400 DH',
    discount: '-22%',
    image: '/table a manger.jpeg'
  },
  {
    id: "ffd3cb40-9070-4542-9b08-75c74ddef02d",
    name: 'Table basse ATLAS',
    category: 'Tables basses',
    oldPrice: '4 500 DH',
    newPrice: '3 800 DH',
    discount: '-15%',
    image: '/tablesdechevet.jpeg'
  },
  {
    id: "f953905e-f0b4-47c1-a437-87b305f2c361",
    name: 'Canapé Marindra',
    category: 'Canapés',
    oldPrice: '18 000 DH',
    newPrice: '14 500 DH',
    discount: '-19%',
    image: '/salon.jpeg'
  },
  {
    id: "4117d534-f5dd-4eae-ad73-92192e26eee8",
    name: 'Table à manger PALOMA',
    category: 'Tables à manger',
    oldPrice: '11 000 DH',
    newPrice: '8 500 DH',
    discount: '-22%',
    image: '/salon.jpeg'
  },
  {
    id: "709c25eb-6537-458e-90f4-b7d6c92127a6",
    name: 'Table de chevet Salia',
    category: 'Chambres',
    oldPrice: '2 350 DH',
    newPrice: '1 850 DH',
    discount: '-21%',
    image: '/table a manger.jpeg'
  }
];

export default function TrendingSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
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
    <section className="w-full bg-background border-b border-border overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Image / Top Image on Mobile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/2 relative min-h-[60vh] md:min-h-[500px] lg:min-h-screen overflow-hidden group"
        >
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.8 }} className="w-full h-full relative">
            <Image
              src="/salon.jpeg" // Big living room image
              alt="Living Room Setup"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Right Content / Bottom Content on Mobile */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 p-4 py-12 md:p-12 lg:p-16 flex flex-col items-center justify-center bg-background"
        >
          <div className="text-center mb-10">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-sm tracking-[0.2em] uppercase font-light text-muted mb-3"
            >
              VIE INSPIRÉE
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl md:text-3xl tracking-wide uppercase font-medium text-foreground"
            >
              SUIVEZ LA TENDANCE
            </motion.h2>
          </div>

          {/* Slider Container */}
          <div className="w-full max-w-3xl mb-8 relative px-8 md:px-0">
            {/* Mobile Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 text-muted hover:text-foreground transition-colors md:hidden"
            >
              <ChevronLeft size={32} strokeWidth={1} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 text-muted hover:text-foreground transition-colors md:hidden"
            >
              <ChevronRight size={32} strokeWidth={1} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div 
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
              >
                {visibleProducts.map((product) => (
                  <div key={product.id} className="flex flex-col group transition-all bg-background">
                    <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-surface">
                      {/* Discount Tag */}
                      <div className="absolute top-4 left-4 bg-foreground text-background text-[10px] font-bold px-2 py-1 z-10">
                        {product.discount}
                      </div>
                      
                      {/* Cart Icon on Hover */}
                      <button className="absolute bottom-4 left-4 bg-[#555] hover:bg-black text-white p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm">
                        <ShoppingCart size={18} />
                      </button>
                      
                      <Link href={`/products/${product.id}`}>
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} className="w-full h-full relative cursor-pointer">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover mix-blend-multiply dark:mix-blend-normal"
                          />
                        </motion.div>
                      </Link>
                    </div>
                    <div className="text-center mt-auto px-2">
                      <h3 className="text-[15px] font-semibold text-foreground mb-1">{product.name}</h3>
                      <p className="text-[13px] text-muted mb-3">{product.category}</p>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="line-through text-muted">{product.oldPrice}</span>
                        <span className="font-bold text-[#d11124]">{product.newPrice}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-[6px] h-[6px] rounded-full transition-colors ${
                  currentPage === idx ? 'bg-foreground' : 'border border-border'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full max-w-3xl px-8 md:px-0"
          >
            <Link 
              href="/shop"
              className="block w-full bg-foreground text-background text-[13px] font-bold tracking-widest uppercase py-4 text-center hover:bg-foreground/90 transition-colors"
            >
              VOIR PLUS
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
