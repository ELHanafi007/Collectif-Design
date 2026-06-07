'use client';

import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const packs = [
  {
    title: 'Pack Chambre',
    price: '25.000',
    old_price: '32.000',
    image: '/tablesdechevet.jpeg',
    includes: ['Lit King Size', '2 Tables de Chevet', 'Commode 6 tiroirs', 'Miroir Mural'],
    badge: 'Le Plus Populaire'
  },
  {
    title: 'Pack Salon',
    price: '18.500',
    old_price: '24.000',
    image: '/salon.jpeg',
    includes: ['Canapé 3 Places', 'Table Basse', 'Meuble TV', '2 Tables d\'Appoint'],
    badge: null
  },
  {
    title: 'Pack Salle à Manger',
    price: '15.000',
    old_price: '19.500',
    image: '/table a manger.jpeg',
    includes: ['Table à Manger 6 Places', '6 Chaises Design', 'Buffet de Rangement'],
    badge: 'Offre Limitée'
  }
];

const stagger = {
  parent: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  },
  child: {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as any 
      } 
    }
  }
};

export default function PacksPromoPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-40 pb-20 px-6 md:px-12 bg-surface">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent font-sans">Collections Exclusives</span>
            <h1 className="text-5xl md:text-7xl font-serif leading-tightest">
              L&apos;Art de <span className="italic text-accent">Vivre Ensemble</span>
            </h1>
            <p className="text-muted text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
              Découvrez nos sélections curatées pour harmoniser vos espaces de vie. 
              Des ensembles complets conçus pour créer une atmosphère cohérente et prestigieuse.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packs Grid */}
      <section className="py-24 px-6 md:px-12">
        <div className="container-wide">
          <motion.div 
            variants={stagger.parent as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {packs.map((pack, idx) => (
              <motion.div 
                key={idx}
                variants={stagger.child as any}
                className="group flex flex-col bg-surface border border-border overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-700"
              >
                {/* Image */}
                <div className="relative h-[300px] overflow-hidden">
                  <img 
                    src={pack.image} 
                    alt={pack.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {pack.badge && (
                    <div className="absolute top-6 left-6 bg-accent text-white text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      {pack.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif mb-2">{pack.title}</h3>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-medium">{pack.price} <span className="text-sm font-light text-muted">MAD</span></span>
                      <span className="text-sm text-muted line-through">{pack.old_price} MAD</span>
                    </div>
                  </div>

                  <div className="h-[1px] bg-border" />

                  <ul className="space-y-4">
                    {pack.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs text-muted font-light">
                        <Check size={14} className="text-accent shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 flex flex-col gap-3">
                    <Link 
                      href={`/products/pack-${pack.title.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}-exclusive`}
                      className="flex items-center justify-center gap-2 bg-foreground text-background py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all active:scale-[0.98]"
                    >
                      Détails du Pack
                      <ArrowRight size={14} />
                    </Link>
                    <button className="flex items-center justify-center gap-2 border border-border py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-surface transition-all active:scale-[0.98]">
                      <MessageCircle size={14} />
                      Conseiller Déco
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
