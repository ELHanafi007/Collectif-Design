'use client';

import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const packs = [
  {
    title: 'Pack Chambre',
    price: '25.000',
    oldPrice: '32.000',
    image: '/tablesdechevet.jpeg',
    includes: ['Lit King Size', '2 Tables de Chevet', 'Commode 6 tiroirs', 'Miroir Mural'],
    badge: 'Le Plus Populaire'
  },
  {
    title: 'Pack Salon',
    price: '18.500',
    oldPrice: '24.000',
    image: '/salon.jpeg',
    includes: ['Canapé 3 Places', 'Table Basse', 'Meuble TV', '2 Tables d\'Appoint'],
    badge: null
  },
  {
    title: 'Pack Salle à Manger',
    price: '15.000',
    oldPrice: '19.500',
    image: '/table a manger.jpeg',
    includes: ['Table à Manger 6 Places', '6 Chaises Design', 'Buffet de Rangement'],
    badge: 'Offre Limitée'
  }
];

export default function PacksPromo() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden">
        <img src="/hero.jpeg" alt="Packs Promo" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-wide px-6 md:px-12 pb-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Offres Exclusives</span>
              <h1 className="text-5xl md:text-7xl tracking-tightest">Packs Promo</h1>
              <p className="text-sm font-light text-white/50 max-w-md">
                Équipez votre intérieur avec nos packs soigneusement composés à prix exceptionnel.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packs Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packs.map((pack, idx) => (
              <motion.div
                key={pack.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group bg-surface rounded-2xl overflow-hidden border border-border hover:border-foreground transition-all"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={pack.image} 
                    alt={pack.title}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {pack.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-foreground text-background px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest">
                        {pack.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif mb-2">{pack.title}</h3>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-medium">{pack.price} <span className="text-sm font-light text-muted">MAD</span></span>
                      <span className="text-sm text-muted line-through">{pack.oldPrice} MAD</span>
                    </div>
                  </div>

                  <div className="h-[1px] bg-border" />

                  <div className="space-y-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted">Inclus dans le pack</span>
                    <ul className="space-y-2">
                      {pack.includes.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-light">
                          <Check size={14} className="text-muted shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    href="/contact" 
                    className="w-full flex items-center justify-center gap-3 bg-foreground text-background rounded-xl py-3.5 hover:opacity-90 transition-all active:scale-[0.98]"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">Commander ce Pack</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center space-y-4">
            <p className="text-muted text-sm font-light">Vous avez un projet spécifique ? Nous créons des packs sur mesure.</p>
            <Link href="/contact" className="btn-premium inline-flex">
              <span>Demander un Devis Personnalisé</span>
              <ArrowRight size={14} className="relative z-10" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
