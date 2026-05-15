'use client';

import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src="/notrevision.jpeg" 
          alt="Notre Atelier"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-wide px-6 md:px-12 pb-12 md:pb-16 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-3"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Notre Essence</span>
              <h1 className="text-5xl md:text-7xl tracking-tightest">L'Art de Vivre Réimaginé</h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="space-y-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">Notre Histoire</span>
              <h2 className="text-4xl md:text-5xl tracking-tightest leading-tight">
                Fusionner l'héritage <span className="italic text-muted">artisanal marocain</span> avec le design contemporain
              </h2>
            </div>
            <div className="space-y-6 lg:pt-16">
              <p className="text-base font-light text-muted leading-relaxed">
                Collectif Design est né d'une vision simple : créer du mobilier qui raconte une histoire. 
                Nous travaillons main dans la main avec des artisans locaux pour préserver des techniques séculaires 
                tout en les adaptant aux intérieurs modernes les plus exigeants.
              </p>
              <p className="text-base font-light text-muted leading-relaxed">
                Chaque pièce que nous créons est un dialogue entre le passé et le présent. Un espace bien conçu 
                doit inspirer le calme, la créativité et la connexion.
              </p>
              
              {/* Stats */}
              <div className="flex gap-16 pt-8 border-t border-border">
                <div>
                  <span className="text-4xl font-serif">12+</span>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted mt-1">Années d'Expertise</p>
                </div>
                <div>
                  <span className="text-4xl font-serif">500+</span>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted mt-1">Projets Réalisés</p>
                </div>
                <div>
                  <span className="text-4xl font-serif">4</span>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted mt-1">Showrooms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-surface">
        <div className="container-wide">
          <div className="mb-16 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">Nos Valeurs</span>
            <h2 className="text-4xl md:text-5xl tracking-tightest">Notre Philosophie</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Artisanat', desc: 'La main humaine apporte une âme que la machine ne peut égaler. Chaque finition est vérifiée par nos maîtres artisans.', icon: '01' },
              { title: 'Durabilité', desc: 'Des pièces conçues pour durer des générations, pas des saisons. Nous sélectionnons uniquement des matériaux nobles et résistants.', icon: '02' },
              { title: 'Innovation', desc: 'Repousser les limites des matériaux traditionnels avec des techniques de fabrication modernes et un design audacieux.', icon: '03' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-background rounded-2xl p-8 md:p-10 border border-border hover:border-foreground transition-all"
              >
                <span className="text-[10px] font-bold text-muted mb-6 block">{item.icon}</span>
                <h3 className="text-xl font-serif mb-4">{item.title}</h3>
                <p className="text-sm text-muted font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showroom */}
      <section className="section-padding" id="showroom">
        <div className="container-wide">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">Visitez-nous</span>
              <h2 className="text-4xl md:text-5xl tracking-tightest">Le Showroom</h2>
            </div>
            <p className="max-w-md text-sm text-muted font-light leading-relaxed">
              Situé au cœur de Casablanca, notre showroom est une immersion totale dans l'univers Collectif Design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 aspect-[16/9] rounded-2xl overflow-hidden">
              <img 
                src="/salon.jpeg" 
                alt="Showroom"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="md:col-span-4 aspect-square md:aspect-auto rounded-2xl overflow-hidden">
              <img 
                src="/decoration.jpeg" 
                alt="Showroom Detail"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact" className="btn-premium">
              <span>Planifier une Visite</span>
              <ArrowRight size={14} className="relative z-10" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
