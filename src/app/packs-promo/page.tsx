'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';

const packs = [
  {
    title: 'Emerald Suite',
    price: '25,000 MAD',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000',
    includes: ['Master Bed', '2 Nightstands', 'Velvet Ottoman']
  },
  {
    title: 'Nordic Living',
    price: '18,500 MAD',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1000',
    includes: ['3-Seater Sofa', 'Coffee Table', 'TV Unit']
  },
  {
    title: 'Dining Royale',
    price: '15,000 MAD',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1db20706a?auto=format&fit=crop&q=80&w=1000',
    includes: ['Marble Table', '6 Leather Chairs', 'Sideboard']
  }
];

export default function PacksPromo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray('.pack-section');
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + (containerRef.current?.offsetWidth || 0)
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="bg-premium-dark text-white">
      <Navbar />
      
      <div ref={containerRef} className="overflow-hidden">
        <div ref={scrollRef} className="flex w-[300vw]">
          {packs.map((pack, i) => (
            <section 
              key={i} 
              className="pack-section h-screen w-screen flex flex-col md:flex-row items-center p-12 md:p-24 gap-12"
            >
              <div className="flex-1 space-y-8">
                <span className="text-accent font-bold tracking-[0.4em] uppercase text-sm">
                  Exclusive Bundle 0{i + 1}
                </span>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
                  {pack.title}
                </h1>
                <div className="space-y-4">
                  <h4 className="text-muted uppercase text-xs tracking-widest">Included in pack:</h4>
                  <ul className="grid grid-cols-2 gap-4">
                    {pack.includes.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-premium-white/80">
                        <div className="w-1 h-1 bg-accent rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-8">
                  <p className="text-4xl font-bold mb-8 text-accent">{pack.price}</p>
                  <button className="bg-white text-black px-12 py-5 rounded-full font-bold hover:bg-accent hover:text-white transition-all active:scale-95 shadow-2xl">
                    Order Pack
                  </button>
                </div>
              </div>

              <div className="flex-1 h-full w-full relative">
                <div className="absolute inset-0 bg-accent/20 rounded-[4rem] -rotate-3 scale-95" />
                <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-2xl">
                  <img 
                    src={pack.image} 
                    alt={pack.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="h-screen flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Limited Time Offers.</h2>
          <p className="text-xl text-premium-white/60 mb-12">
            These bundles are available for a limited time as part of our 2024 Collection launch.
          </p>
          <Link href="/" className="text-accent text-lg font-bold border-b-2 border-accent pb-2">
            Explore All Categories
          </Link>
        </div>
      </section>
    </main>
  );
}
