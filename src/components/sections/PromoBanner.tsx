'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Image Side */}
        <div className="relative h-[50vh] lg:h-auto overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            src="/notrevision.jpeg"
            alt="Notre Vision"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Content Side */}
        <div className="bg-surface flex items-center px-8 md:px-16 lg:px-24 py-16 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-lg space-y-8"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">
              Notre Histoire
            </span>
            <h2 className="text-4xl md:text-5xl tracking-tightest leading-tight">
              Design Marocain,<br />
              <span className="italic text-muted">Vision Mondiale</span>
            </h2>
            <p className="text-base font-light text-muted leading-relaxed">
              Depuis nos ateliers au cœur du Maroc, nous créons du mobilier qui raconte une histoire. 
              Chaque pièce naît de la rencontre entre l'artisanat ancestral et le design contemporain, 
              pour un intérieur qui vous ressemble.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Link href="/about" className="btn-premium">
                <span>Découvrir l'Atelier</span>
                <ArrowRight size={14} className="relative z-10" />
              </Link>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="h-8 w-8 rounded-full border-2 border-surface overflow-hidden">
                    <img src="/salon.jpeg" className="h-full w-full object-cover" alt="" />
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-surface overflow-hidden">
                    <img src="/decoration.jpeg" className="h-full w-full object-cover" alt="" />
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-surface overflow-hidden bg-foreground flex items-center justify-center">
                    <span className="text-[8px] font-bold text-background">+50</span>
                  </div>
                </div>
                <span className="text-[9px] text-muted font-light">Clients Satisfaits</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
