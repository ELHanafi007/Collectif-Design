'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned Scrub Reveal
      gsap.to('.hero-image', {
        scale: 1.1,
        filter: 'brightness(0.4)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
        }
      });

      // Text Parallax
      gsap.to('.hero-text', {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-background">
      <div className="hero-image absolute inset-0 z-0">
        <img 
          src="/luxury_hero_ateliers_1778792111623.png" 
          alt="Luxury Interior" 
          className="h-full w-full object-cover grayscale-[0.2]"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="hero-text"
        >
          <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.8em] text-accent">
            Atelier de Haute Ébénisterie
          </span>
          <h1 className="text-7xl md:text-[12vw] font-medium leading-[0.85] tracking-tightest text-premium-white lowercase">
            Collectif <br />
            <span className="italic font-light">Design Studio</span>
          </h1>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-12">
            <p className="max-w-xs text-xs font-light leading-relaxed text-premium-white/60 text-balance">
              Crafting architectural narratives through sculptural furniture and immersive interiors. Reimagined for the modern connoisseur.
            </p>
            <button className="group relative flex items-center gap-6 rounded-full border border-premium-white/10 bg-premium-white/5 px-10 py-5 transition-all hover:bg-premium-white hover:text-premium-dark">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Explore Collection</span>
              <div className="h-1.5 w-1.5 rounded-full bg-accent group-hover:bg-premium-dark" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-premium-white/20">Scroll to Immerse</span>
        <div className="h-16 w-[1px] bg-premium-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 64] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
