'use client';

import { motion } from 'framer-motion';
import { Truck, Shield, Headphones, MapPin } from 'lucide-react';

const values = [
  {
    icon: Truck,
    title: 'Livraison Partout',
    desc: 'au Maroc'
  },
  {
    icon: Shield,
    title: 'Garantie Qualité',
    desc: '5 ans minimum'
  },
  {
    icon: Headphones,
    title: 'Service Client',
    desc: '7j/7 à votre écoute'
  },
  {
    icon: MapPin,
    title: 'Showrooms',
    desc: 'Casablanca · Rabat · Marrakech'
  }
];

export default function HorizontalFeatures() {
  return (
    <section className="py-16 px-6 md:px-12 bg-foreground text-background">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {values.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex items-start gap-5 group"
            >
              <div className="shrink-0 h-12 w-12 rounded-full border border-background/10 flex items-center justify-center group-hover:border-background/30 transition-colors">
                <val.icon size={18} strokeWidth={1.5} className="text-background/60 group-hover:text-background transition-colors" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold tracking-tight">{val.title}</h4>
                <p className="text-xs text-background/40 font-light">{val.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
