'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  { image: '/salon.jpeg' },
  { image: '/table a manger.jpeg' },
  { image: '/tablesdechevet.jpeg' }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden bg-gray-100">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.8 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img 
            src={slides[current].image} 
            alt="Hero background"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Promo Box Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[90%] max-w-[850px] bg-[#1d4a77]">
          <div className="bg-[#c05a2e] w-full py-6 md:py-12 flex items-center justify-center px-4">
            <span className="text-white text-5xl md:text-[90px] font-black uppercase tracking-tighter" style={{ fontFamily: 'Arial, sans-serif' }}>
              PACK PROMO
            </span>
          </div>
          <div className="w-full py-6 md:py-12 flex items-center justify-center px-4">
            <span className="text-white text-5xl md:text-[90px] font-black uppercase tracking-tighter" style={{ fontFamily: 'Arial, sans-serif' }}>
              JUSQU'À -60%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
