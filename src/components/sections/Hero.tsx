'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full overflow-hidden">
      <div className="w-full flex flex-col md:flex-row min-h-[500px]">
        {/* Left Side - Blue Sofa */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full md:w-1/3 aspect-[4/3] md:aspect-auto overflow-hidden group"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="/salon.jpeg" // Reusing available images
              alt="Salon"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        
        {/* Middle - Blue Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-1/3 bg-[#2458a6] flex flex-col items-center justify-center text-center p-8 md:p-12 text-white relative overflow-hidden"
        >
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-2 relative z-10"
          >
            <span className="bg-[#b45d2f] px-4 py-2 inline-block shadow-sm">PACK PROMO</span>
          </motion.h2>
          <motion.h3 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mt-4 relative z-10"
          >
            JUSQU'À -60%
          </motion.h3>
          {/* Animated background shape */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-[#ffffff10] to-transparent opacity-50 z-0 pointer-events-none"
          />
        </motion.div>

        {/* Right Side - Bedroom */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative w-full md:w-1/3 aspect-[4/3] md:aspect-auto overflow-hidden group"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="/tablesdechevet.jpeg" // Bedroom image
              alt="Chambre"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
