'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const features = [
  {
    title: 'Artisanat d\'Exception',
    description: 'Chaque pièce est façonnée par des mains expertes, préservant un savoir-faire millénaire.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Design Minimaliste',
    description: 'Une esthétique pure qui laisse respirer vos espaces de vie.',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Matériaux Nobles',
    description: 'Sélection rigoureuse des bois, cuirs et tissus les plus précieux.',
    image: 'https://images.unsplash.com/photo-1634713590134-7347900b9239?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Sur Mesure',
    description: 'Votre vision, notre expertise. Des créations uniques pour des lieux uniques.',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068628265?auto=format&fit=crop&q=80&w=1200'
  }
];

export default function HorizontalFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section className="overflow-hidden bg-background">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="flex h-screen w-[400vw] relative items-center">
          {features.map((feature, i) => (
            <div key={i} className="h-screen w-screen flex flex-col justify-center px-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-[1800px] mx-auto">
                <div className="space-y-12">
                  <span className="text-accent font-bold text-[10px] uppercase tracking-[0.6em]">Perspective 0{i + 1}</span>
                  <h2 className="text-7xl md:text-9xl font-medium tracking-tightest lowercase leading-[0.8] text-foreground">
                    {feature.title.split(' ').map((word, idx) => (
                      <span key={idx} className="block">{word}</span>
                    ))}
                  </h2>
                  <p className="text-foreground/40 text-lg md:text-xl max-w-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
                
                <div className="relative aspect-[16/11] overflow-hidden rounded-[4rem] shadow-3xl bg-surface">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
