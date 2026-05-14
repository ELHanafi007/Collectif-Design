'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ClosingCTA() {
  return (
    <section className="py-48 px-6 md:px-12 bg-background border-t border-border/10">
      <div className="container mx-auto text-center space-y-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-accent">
            Prêt pour l'Exceptionnel ?
          </span>
          <h2 className="text-7xl md:text-[10vw] font-medium tracking-tightest lowercase leading-[0.8]">
            Élevez votre <br />
            <span className="italic font-light">Espace de Vie</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-12 pt-12"
        >
          <Link 
            href="/shop"
            className="group relative flex items-center justify-center gap-8 overflow-hidden rounded-full border border-foreground bg-foreground px-12 py-7 transition-all hover:bg-accent hover:border-accent"
          >
            <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.6em] text-background group-hover:text-foreground">
              Découvrir le Catalogue
            </span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo" />
          </Link>
          
          <Link 
            href="/contact"
            className="text-[10px] font-bold uppercase tracking-[0.6em] hover:text-accent transition-colors"
          >
            Prendre Rendez-vous au Showroom
          </Link>
        </motion.div>

        <div className="pt-32 opacity-10">
           <span className="text-[14vw] font-serif tracking-tighter uppercase select-none pointer-events-none">Collectif</span>
        </div>
      </div>
    </section>
  );
}
