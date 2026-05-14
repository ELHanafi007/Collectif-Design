'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // Split text reveal simulation (since we don't have a SplitText plugin, we use character wrapping)
    const tl = gsap.timeline();

    tl.from(imageRef.current, {
      scale: 1.2,
      opacity: 0,
      duration: 2.5,
      ease: "power4.out",
    });

    // Pinned scrub pattern
    gsap.to(imageRef.current, {
      scale: 1.1,
      yPercent: 20,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Reveal items
    tl.from('.reveal-item', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: "expo.out",
    }, "-=1.5");

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-background">
      {/* Cinematic Background with pinned-scrub */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2400"
          alt="Studio Photography"
          className="h-full w-full object-cover brightness-[0.5] saturate-[0.85] dark:brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center pt-20">
        <div className="mb-12 reveal-item">
          <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-foreground/40">
            Studio Collectif — Vol. 01
          </span>
        </div>
        
        <h1 
          ref={titleRef}
          className="max-w-[1400px] text-[15vw] md:text-[13vw] font-medium leading-[0.7] tracking-tightest text-foreground reveal-item lowercase"
        >
          L'essence <br />
          <span className="text-accent italic font-light ml-4">pure</span> du design.
        </h1>

        <div className="mt-20 max-w-xl reveal-item">
          <p className="text-lg md:text-xl text-foreground/50 leading-relaxed font-light text-balance">
            Une fusion entre l'héritage artisanal et le minimalisme contemporain. 
            Conçu pour l'extraordinaire.
          </p>
        </div>
        
        <div className="mt-24 reveal-item">
          <button className="group relative flex items-center gap-8 overflow-hidden rounded-full border border-border bg-foreground/5 px-16 py-7 text-[9px] font-bold uppercase tracking-[0.5em] transition-all hover:border-accent/50">
            <span className="relative z-10 text-foreground">
              Explorer l'Espace
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-[6] transition-transform duration-1000 ease-expo" />
          </button>
        </div>
      </div>

      {/* Scroll patterns indicator */}
      <div className="absolute bottom-20 left-12 z-20 hidden lg:flex flex-col gap-8 items-start">
        <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-foreground/20 vertical-text mb-4">Discover the narrative</span>
        <div className="h-32 w-[1px] bg-border relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-accent w-full"
          />
        </div>
      </div>
    </section>
  );
}
