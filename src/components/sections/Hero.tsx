'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full overflow-hidden">
      <div className="w-full flex flex-col md:flex-row md:min-h-[500px]">
        {/* Left Side - Blue Sofa */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full md:w-1/3 aspect-[16/10] md:aspect-auto overflow-hidden group"
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
          className="w-full md:w-1/3 bg-[#2458a6] flex flex-col items-center justify-center text-center py-14 px-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] mb-3 md:mb-4 block opacity-70"
            >
              Exclusivité Collectif
            </motion.span>
            <h2 className="text-[28px] md:text-4xl lg:text-5xl font-light tracking-wider leading-tight mb-6 md:mb-8">
              DESIGN <br /> <span className="font-medium italic">INTEMPOREL</span>
            </h2>
            <Link 
              href="/shop"
              className="inline-block border border-white px-7 py-2.5 md:px-8 md:py-3 text-[10px] md:text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-[#2458a6] transition-all duration-300 active:scale-95 cursor-pointer"
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
          className="relative w-full md:w-1/3 aspect-[16/10] md:aspect-auto overflow-hidden group"
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
