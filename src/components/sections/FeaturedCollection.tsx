'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const featured = [
  {
    name: 'Canapé Obsidian',
    category: 'Salon',
    image: '/salon.jpeg',
    price: '35.000 MAD'
  },
  {
    name: 'Table Monolithe',
    category: 'Tables',
    image: '/tabledebasse.jpeg',
    price: '18.500 MAD'
  },
  {
    name: 'Lit Nuage',
    category: 'Chambre',
    image: '/tablesdechevet.jpeg',
    price: '28.000 MAD'
  },
  {
    name: 'Bibliothèque Brutalist',
    category: 'Rangement',
    image: '/bibliotheque.jpeg',
    price: '22.000 MAD'
  }
];

export default function FeaturedCollection() {
  return (
    <section className="py-32 px-6 md:px-12 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent">
              Curated Selection
            </span>
            <h2 className="text-6xl md:text-8xl font-medium tracking-tightest lowercase leading-[0.8]">
              Pièces <br />
              <span className="italic font-light">Maîtresses</span>
            </h2>
          </div>
          <Link 
            href="/shop" 
            className="text-[10px] font-bold uppercase tracking-[0.4em] border-b border-accent pb-2 hover:text-accent transition-all"
          >
            Voir tout le catalogue
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {featured.map((item, idx) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] bg-surface shadow-2xl mb-8">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-premium-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute bottom-10 right-10 flex items-center justify-center w-16 h-16 rounded-full glass opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>
              </div>
              
              <div className="flex justify-between items-start px-4">
                <div className="space-y-1">
                   <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">{item.category}</p>
                   <h3 className="text-2xl font-medium tracking-tight lowercase">{item.name}</h3>
                </div>
                <p className="text-sm font-medium tracking-tight">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
