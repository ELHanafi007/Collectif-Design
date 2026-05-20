'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Plus } from 'lucide-react';

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
  const mobileScrollRef = useRef<HTMLDivElement>(null);

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

  const scrollMobile = (direction: 'left' | 'right') => {
    const container = mobileScrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.85;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const visibleProducts = products.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="w-full bg-background border-b border-border overflow-hidden">
      
      {/* 📱 MOBILE VERSION (Based on User Design) */}
      <div className="block md:hidden w-full pt-16 pb-16 px-5 bg-background">
        <div className="flex flex-col gap-1 mb-6">
          <h2 className="text-[28px] font-serif font-bold text-foreground uppercase tracking-tight">
            TENDANCES
          </h2>
          <Link href="/shop" className="text-[10px] font-bold text-[#CAA871] uppercase tracking-[0.15em] hover:opacity-80 transition-opacity mt-1">
            VOIR TOUTE LA COLLECTION
          </Link>
        </div>

        {/* Categories / Tags */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar mb-8 pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {["SALONS", "CHAMBRES", "DÉCORATION"].map((cat) => (
            <button key={cat} className="px-5 py-2 border border-border bg-transparent text-[10px] font-medium tracking-widest uppercase shrink-0 text-muted hover:text-foreground hover:border-foreground transition-all">
              {cat}
            </button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => scrollMobile('left')} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-surface active:scale-95 transition-all cursor-pointer">
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button onClick={() => scrollMobile('right')} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-surface active:scale-95 transition-all cursor-pointer">
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Slider */}
        <div 
          ref={mobileScrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-5 px-5 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <Link 
              key={product.id}
              href={`/products/${product.id}`}
              className="w-[82vw] shrink-0 snap-start flex flex-col group cursor-pointer"
            >
              <div className="relative w-full aspect-[4/5] bg-surface mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover mix-blend-multiply dark:mix-blend-normal"
                />
                {/* Overlay Actions (Heart & Plus) */}
                <div 
                  className="absolute top-4 right-4 flex flex-col gap-3 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-black shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 transition-transform cursor-pointer">
                    <Heart size={18} strokeWidth={1.5} />
                  </button>
                  <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-black shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 transition-transform cursor-pointer">
                    <Plus size={20} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-[13px] font-bold font-serif uppercase tracking-widest text-foreground line-clamp-1">{product.name}</h3>
                <p className="text-[13px] font-bold text-foreground mt-2">{product.newPrice}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 💻 DESKTOP VERSION (Untouched Original) */}
      <div className="hidden md:flex flex-row w-full">
        {/* Left Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-1/2 relative min-h-[500px] lg:min-h-screen overflow-hidden group"
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

        {/* Right Content */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-1/2 p-12 lg:p-16 flex flex-col items-center justify-center bg-background"
        >
          <div className="text-center mb-10">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm tracking-[0.2em] uppercase font-light text-muted mb-3"
            >
              VIE INSPIRÉE
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl tracking-wide uppercase font-medium text-foreground"
            >
              SUIVEZ LA TENDANCE
            </motion.h2>
          </div>

          {/* Slider Container */}
          <div className="w-full max-w-3xl mb-8 relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 gap-6 w-full"
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
            className="w-full max-w-3xl"
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
