'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const featured = [
  {
    name: 'Canapé Obsidian',
    category: 'Salon',
    image: '/salon.jpeg',
    price: '35.000',
    badge: 'Best-Seller'
  },
  {
    name: 'Table Monolithe',
    category: 'Tables Basses',
    image: '/tabledebasse.jpeg',
    price: '18.500',
    badge: null
  },
  {
    name: 'Console Sculptée',
    category: 'Décoration',
    image: '/Console.jpeg',
    price: '12.800',
    badge: 'Nouveau'
  },
  {
    name: 'Bibliothèque Modulaire',
    category: 'Rangement',
    image: '/bibliotheque.jpeg',
    price: '22.000',
    badge: null
  },
  {
    name: 'Meuble TV Épuré',
    category: 'Salon',
    image: '/meubletv.jpeg',
    price: '15.500',
    badge: null
  },
  {
    name: 'Tables d\'Appoint',
    category: 'Décoration',
    image: '/Tables d\'appoint.jpeg',
    price: '8.200',
    badge: '-20%'
  },
  {
    name: 'Buffet Artisanal',
    category: 'Rangement',
    image: '/buffet.jpeg',
    price: '19.000',
    badge: null
  },
  {
    name: 'Miroir Doré',
    category: 'Décoration',
    image: '/miroires.jpeg',
    price: '6.500',
    badge: 'Exclusif'
  }
];

export default function FeaturedCollection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">
              Sélection du Moment
            </span>
            <h2 className="text-5xl md:text-6xl tracking-tightest">
              Nos Best-Sellers
            </h2>
          </div>
          <Link href="/shop" className="group flex items-center gap-3 shrink-0 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-border group-hover:border-foreground transition-all pb-1">
              Voir tout le catalogue
            </span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* Product Grid — 4 cols like sketch-design */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-14">
          {featured.map((item, idx) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link href="/shop" className="block">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-surface mb-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  
                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-foreground text-background px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest">
                        {item.badge}
                      </span>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="h-12 w-12 rounded-full bg-white/90 text-foreground shadow-lg flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 backdrop-blur-sm">
                      <ShoppingBag size={16} />
                    </div>
                  </div>
                </div>
                
                {/* Info */}
                <div className="space-y-1 px-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted">{item.category}</p>
                  <h3 className="text-sm font-medium truncate">{item.name}</h3>
                  <p className="text-sm text-muted font-light">
                    {item.price} <span className="text-[10px]">MAD</span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
