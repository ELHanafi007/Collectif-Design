'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full overflow-hidden bg-background">
      {/* 📱 1. MOBILE DESIGN (Apple High-Tier Cinematic Full Screen) */}
      <div className="flex flex-col md:hidden w-full relative min-h-[85vh]">
        <Image
          src="/hero-mobile-cinematic.png" 
          alt="Cinematic Mobile Interior"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 text-center z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.4em] mb-4 text-white/80"
          >
            Exclusivité Collectif
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl font-light tracking-wider leading-tight mb-8 text-white drop-shadow-md"
          >
            DESIGN <br /> <span className="font-medium italic">INTEMPOREL</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              href="/shop"
              className="inline-block backdrop-blur-md bg-white/10 border border-white/20 px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            >
              Découvrir la collection
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 💻 2. DESKTOP DESIGN (Classic 3-Column Layout) */}
      <div className="hidden md:flex w-full flex-row min-h-[600px] lg:min-h-[700px]">
        {/* Left Side - Blue Sofa */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-1/3 overflow-hidden group"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="/salon.jpeg" 
              alt="Salon Interior"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
        
        {/* Middle - Blue Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-1/3 bg-[#2458a6] flex flex-col items-center justify-center text-center p-12 text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs uppercase tracking-[0.4em] mb-4 block opacity-70"
            >
              Exclusivité Collectif
            </motion.span>
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider leading-tight mb-8">
              DESIGN <br /> <span className="font-medium italic">INTEMPOREL</span>
            </h2>
            <Link 
              href="/shop"
              className="inline-block border border-white px-8 py-3 text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-[#2458a6] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Découvrir
            </Link>
          </div>
          {/* Animated background glow */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl pointer-events-none"
          />
        </motion.div>

        {/* Right Side - Table */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative w-1/3 overflow-hidden group"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="/hero-main.jpg" 
              alt="Luxury Furniture"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
