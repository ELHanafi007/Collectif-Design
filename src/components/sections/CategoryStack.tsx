'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    title: 'Salon',
    image: '/salon.jpeg',
    href: '/categories/salons',
    count: '24 Pièces'
  },
  {
    title: 'Chambre',
    image: '/tablesdechevet.jpeg',
    href: '/categories/tables-de-chevet',
    count: '18 Pièces'
  },
  {
    title: 'Salle à Manger',
    image: '/table a manger.jpeg',
    href: '/categories/tables-a-manger',
    count: '15 Pièces'
  },
  {
    title: 'Décoration',
    image: '/decoration.jpeg',
    href: '/categories/decoration',
    count: '32 Pièces'
  },
  {
    title: 'Rangement',
    image: '/bibliotheque.jpeg',
    href: '/categories/bibliotheques',
    count: '12 Pièces'
  },
  {
    title: 'Tables Basses',
    image: '/tabledebasse.jpeg',
    href: '/categories/tables-basses',
    count: '20 Pièces'
  }
];

export default function CategoryStack() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">Nos Catégories</span>
            <h2 className="text-5xl md:text-7xl tracking-tightest">
              Explorer par <span className="italic text-muted">Univers</span>
            </h2>
          </div>
          <Link href="/shop" className="group flex items-center gap-3 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-border pb-1 group-hover:border-foreground transition-all">
              Tout Voir
            </span>
            <ArrowUpRight size={12} />
          </Link>
        </div>

        {/* Category Grid — 3 cols like sketch-design */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
            >
              <Link
                href={cat.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer"
              >
                {/* Image */}
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-serif mb-1">{cat.title}</h3>
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">{cat.count}</span>
                      <ArrowUpRight size={12} className="text-white/40" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
