'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

const categories = [
  {
    id: '01',
    title: 'Les Salons',
    tag: 'Art de Vivre',
    description: 'Une fusion de confort et d’élégance pour vos espaces de vie.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
    href: '/categories/salons'
  },
  {
    id: '02',
    title: 'L\'Espace Nuit',
    tag: 'Sanctuaire',
    description: 'Créez un sanctuaire de repos avec nos designs de chambre premium.',
    image: 'https://images.unsplash.com/photo-1505693419148-db306597aa38?auto=format&fit=crop&q=80&w=1200',
    href: '/categories/chambre'
  },
  {
    id: '03',
    title: 'La Table',
    tag: 'Convivialité',
    description: 'Des tables et chaises conçues pour des moments inoubliables.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1db20706a?auto=format&fit=crop&q=80&w=1200',
    href: '/categories/salle-a-manger'
  }
];

export default function CategoryStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (window.innerWidth < 768) return;

    const sections = gsap.utils.toArray('.category-section') as HTMLElement[];
    
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        pin: true,
        pinSpacing: false,
        scrub: true,
        // Sticky-stack effect: the section stays pinned until the next one covers it
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-background">
      {categories.map((cat, i) => (
        <section 
          key={cat.id}
          className="category-section relative h-screen w-full overflow-hidden flex items-center px-6 md:px-24 bg-background"
          style={{ zIndex: i + 1 }}
        >
          {/* Section Border/Indicator */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-border" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 w-full max-w-[1800px] mx-auto items-center">
            <div className="lg:col-span-5 flex flex-col justify-center space-y-12">
              <div className="space-y-4">
                <span className="text-accent font-bold text-[10px] uppercase tracking-[0.6em]">{cat.id} / 03</span>
                <span className="block text-foreground/30 text-[10px] font-bold uppercase tracking-[0.4em]">{cat.tag}</span>
              </div>
              
              <h2 className="text-8xl md:text-[10vw] font-medium tracking-tightest lowercase leading-[0.7] text-foreground">
                {cat.title}<span className="text-accent">.</span>
              </h2>
              
              <p className="text-foreground/40 text-lg md:text-xl max-w-md leading-relaxed font-light">
                {cat.description}
              </p>
              
              <Link 
                href={cat.href}
                className="group inline-flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] text-foreground"
              >
                Découvrir
                <div className="relative flex items-center justify-center">
                  <div className="w-12 h-[1px] bg-border transition-all group-hover:w-20 group-hover:bg-accent" />
                  <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </div>
            
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-[4rem] shadow-3xl bg-surface">
              <img 
                src={cat.image} 
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-12 left-24 right-24 hidden md:flex justify-between items-center text-[8px] font-bold uppercase tracking-[0.6em] text-foreground/10">
            <span>Collectif Design Studio</span>
            <span>Est. 2024</span>
          </div>
        </section>
      ))}
    </div>
  );
}
