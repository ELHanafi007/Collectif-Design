'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    title: 'Matières Nobles',
    desc: 'We source the rarest stones and finest woods, ensuring each piece carries the weight of history and the touch of nature.',
    image: '/decoration.jpeg'
  },
  {
    title: 'Artisanat d’Excellence',
    desc: 'Our master craftsmen combine centuries-old techniques with modern precision to create furniture that lasts generations.',
    image: '/notrevision.jpeg'
  },
  {
    title: 'Design Sur Mesure',
    desc: 'Collaborate with our studio to create bespoke architectural objects tailored to the unique geometry of your space.',
    image: '/bibliotheque.jpeg'
  }
];

export default function HorizontalFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pin = gsap.fromTo(
        sectionRef.current,
        { x: 0 },
        {
          x: '-200vw',
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '2000 top',
            scrub: 0.6,
            pin: true,
          }
        }
      );
      return () => pin.kill();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="overflow-hidden bg-background">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="flex w-[300vw] h-screen items-center">
          {features.map((feature, idx) => (
            <div key={idx} className="w-screen h-full flex items-center justify-center px-12 md:px-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-[1400px]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] shadow-3xl">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-premium-dark/20" />
                </div>
                
                <div className="space-y-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-accent">
                    Philosophy 0{idx + 1}
                  </span>
                  <h3 className="text-5xl md:text-7xl font-medium tracking-tightest lowercase leading-[0.9]">
                    {feature.title}
                  </h3>
                  <p className="max-w-md text-base font-light leading-relaxed text-foreground/60 text-balance">
                    {feature.desc}
                  </p>
                  
                  <div className="pt-8 flex items-center gap-6">
                     <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
                        <span className="text-[10px] font-bold">0{idx + 1}</span>
                     </div>
                     <div className="h-[1px] w-24 bg-border" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
