'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const splitLines = gsap.utils.toArray('.split-line') as HTMLElement[];
    splitLines.forEach((line) => {
      gsap.from(line, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: line,
          start: "top 85%",
        }
      });
    });

    // Parallax for images
    gsap.utils.toArray('.parallax-img').forEach((img: any) => {
      gsap.to(img, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          scrub: true
        }
      });
    });
  }, []);

  return (
    <main className="bg-background min-h-screen selection:bg-accent selection:text-white transition-colors duration-700">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-64 pb-40 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1800px] mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold uppercase tracking-[0.5em] text-accent mb-12 block"
          >
            Notre Essence
          </motion.span>
          
          <h1 className="text-[14vw] md:text-[12vw] font-medium tracking-tightest leading-[0.7] mb-32 lowercase text-foreground">
            L'art de vivre <br /> 
            <span className="text-accent italic font-light ml-[0.5em]">réimaginé</span>.
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] rounded-[4rem] overflow-hidden shadow-3xl bg-surface">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600" 
                  alt="Studio Interior"
                  className="w-full h-full object-cover parallax-img scale-110"
                />
              </div>
            </div>
            
            <div className="lg:col-span-5 pt-12 space-y-16">
              <div className="space-y-8">
                <p className="text-3xl md:text-4xl font-light leading-[1.2] text-foreground split-line">
                  Collectif Design est né d'une vision simple : fusionner l'héritage artisanal marocain avec une esthétique minimaliste contemporaine.
                </p>
                <p className="text-lg text-muted leading-relaxed split-line max-w-lg">
                  Chaque pièce que nous créons est un dialogue entre le passé et le présent. Nous travaillons main dans la main avec des artisans locaux pour préserver des techniques séculaires tout en les adaptant aux intérieurs modernes les plus exigeants.
                </p>
              </div>

              <div className="flex gap-20 pt-16 border-t border-border">
                <div>
                  <span className="block text-5xl font-medium tracking-tighter text-foreground">12+</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted mt-2 block">Années d'Expertise</span>
                </div>
                <div>
                  <span className="block text-5xl font-medium tracking-tighter text-foreground">500+</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted mt-2 block">Projets Réalisés</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-surface text-foreground py-60 px-6 md:px-12 lg:px-24 rounded-[5rem] mx-4 my-20 transition-colors duration-700">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div>
              <h2 className="text-6xl md:text-8xl font-medium tracking-tightest mb-12 lowercase leading-none text-foreground">
                Notre <br /> Philosophie<span className="text-accent">.</span>
              </h2>
              <p className="max-w-xl text-xl text-muted font-light leading-relaxed">
                Nous croyons que le design n'est pas seulement une question d'apparence, mais une question de sensation. Un espace bien conçu doit inspirer le calme, la créativité et la connexion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {[
                { t: 'Artisanat', d: 'La main humaine apporte une âme que la machine ne peut égaler.' },
                { t: 'Durabilité', d: 'Des pièces conçues pour durer des générations, pas des saisons.' },
                { t: 'Innovation', d: 'Repousser les limites des matériaux traditionnels.' }
              ].map((item, i) => (
                <div key={i} className="p-12 border border-border rounded-[3.5rem] hover:bg-background transition-all duration-700 group flex justify-between items-center">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-medium group-hover:text-accent transition-colors">{item.t}</h3>
                    <p className="text-sm text-muted leading-relaxed max-w-sm">{item.d}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:rotate-45 group-hover:bg-accent group-hover:border-accent transition-all duration-700">
                    <span className="text-xl">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team/Showroom */}
      <section className="py-60 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto" id="showroom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <h2 className="text-7xl md:text-9xl font-medium tracking-tightest lowercase leading-none text-foreground">
            Le <br /> Showroom<span className="text-accent">.</span>
          </h2>
          <p className="max-w-md text-xl text-muted font-light leading-relaxed">
            Situé au cœur de Casablanca, notre showroom est une immersion totale dans l'univers Collectif Design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 aspect-[16/9] rounded-[4rem] overflow-hidden shadow-2xl bg-surface">
            <img 
              src="https://images.unsplash.com/photo-1615873968403-89e068628265?auto=format&fit=crop&q=80&w=2000" 
              alt="Showroom Main"
              className="w-full h-full object-cover parallax-img scale-110"
            />
          </div>
          <div className="md:col-span-4 aspect-square md:aspect-auto rounded-[4rem] overflow-hidden shadow-2xl bg-surface">
             <img 
              src="https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&q=80&w=1200" 
              alt="Showroom Detail"
              className="w-full h-full object-cover parallax-img scale-110"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
