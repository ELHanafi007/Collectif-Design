'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background py-32 px-6 md:px-12">
      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-background/40">
              Prêt à Transformer Votre Intérieur ?
            </span>
            <h2 className="text-5xl md:text-7xl tracking-tightest leading-tight font-serif">
              Visitez Notre <span className="italic text-accent">Showroom</span>
            </h2>
            <p className="max-w-xl mx-auto text-base font-light text-background/40 leading-relaxed">
              Venez toucher, sentir et vivre nos créations. Nos conseillers vous accompagnent 
              dans la conception de votre espace idéal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
          >
            <Link 
              href="/shop"
              className="group inline-flex items-center gap-4 border border-background/20 rounded-full px-8 py-4 hover:bg-background hover:text-foreground transition-all duration-500"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Voir le Catalogue
              </span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link 
              href="/contact"
              className="group inline-flex items-center gap-4 border border-background/20 rounded-full px-8 py-4 hover:bg-background hover:text-foreground transition-all duration-500"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Prendre Rendez-vous
              </span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Cities */}
          <div className="pt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {['Casablanca', 'Rabat', 'Marrakech', 'Tanger'].map((city) => (
              <span key={city} className="text-[9px] font-bold uppercase tracking-[0.4em] text-background/20">
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative oversized text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-serif tracking-tightest text-background/[0.02] whitespace-nowrap">
          COLLECTIF
        </span>
      </div>
    </section>
  );
}
