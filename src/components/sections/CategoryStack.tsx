'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  {
    title: 'Les Salons',
    subtitle: 'Sculptural Comfort',
    image: '/salon.jpeg',
    href: '/categories/salons',
    desc: 'Bespoke modular systems and iconic seating designed for architectural living spaces.'
  },
  {
    title: 'Tables Basses',
    subtitle: 'Monolithic Objects',
    image: '/tabledebasse.jpeg',
    href: '/categories/tables-basses',
    desc: 'Crafted from rare marbles and solid brass, our tables serve as the geometric anchor of the room.'
  },
  {
    title: 'La Chambre',
    subtitle: 'Private Sanctuary',
    image: '/tablesdechevet.jpeg',
    href: '/categories/tables-de-chevet',
    desc: 'Serene sleeping environments where material honesty meets ergonomic tranquility.'
  }
];

export default function CategoryStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.category-card');
      cards.forEach((card: any, i) => {
        if (i === cards.length - 1) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          scrub: true,
        });

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(10px)',
          scrollTrigger: {
            trigger: cards[i + 1] as any,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-20 bg-background">
      <div className="flex flex-col">
        {categories.map((cat, idx) => (
          <div 
            key={cat.title} 
            className="category-card relative h-screen w-full overflow-hidden flex items-center justify-center bg-background"
          >
            <div className="absolute inset-0 z-0 scale-110">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="h-full w-full object-cover grayscale-[0.4] transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-background/60" />
            </div>

            <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent">
                    Universe 0{idx + 1}
                  </span>
                  <h2 className="text-6xl md:text-9xl font-medium tracking-tightest lowercase leading-[0.8]">
                    {cat.title}
                  </h2>
                </div>
                
                <p className="max-w-sm text-sm font-light leading-relaxed text-foreground/60 text-balance">
                  {cat.desc}
                </p>

                <Link 
                  href={cat.href}
                  className="group flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:text-accent"
                >
                  <div className="h-[1px] w-12 bg-accent transition-all group-hover:w-20" />
                  View Collection
                </Link>
              </div>

              <div className="hidden lg:block relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[4rem] shadow-2xl border border-white/5">
                <img 
                  src={cat.image} 
                  alt="" 
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110"
                />
                <div className="absolute bottom-12 left-12 flex items-center gap-4 glass px-8 py-4 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{cat.subtitle}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
