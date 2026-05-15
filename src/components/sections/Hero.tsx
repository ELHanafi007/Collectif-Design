'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/salon.jpeg',
    tag: 'Collection 2026',
    title: 'L\'Art du Salon',
    subtitle: 'Contemporain',
    desc: 'Confort sculptural et lignes épurées pour votre espace de vie.',
    cta: { label: 'Découvrir', href: '/categories/salons' }
  },
  {
    image: '/table a manger.jpeg',
    tag: 'Nouvelle Arrivée',
    title: 'Tables à',
    subtitle: 'Manger',
    desc: 'Le cœur de la maison, sublimé par le design.',
    cta: { label: 'Explorer', href: '/categories/tables-a-manger' }
  },
  {
    image: '/tablesdechevet.jpeg',
    tag: 'Exclusif',
    title: 'Univers',
    subtitle: 'Chambre',
    desc: 'Créez votre sanctuaire de sérénité moderne.',
    cta: { label: 'Voir Plus', href: '/categories/tables-de-chevet' }
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-foreground">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img 
            src={slide.image} 
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full container-wide px-6 md:px-12 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-white"
          >
            {/* Tag */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-white/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">
                {slide.tag}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-7xl md:text-[120px] leading-[0.85] tracking-tightest mb-6">
              {slide.title} <br />
              <span className="italic font-light text-white/80">{slide.subtitle}</span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg font-light text-white/50 max-w-md mb-10 leading-relaxed">
              {slide.desc}
            </p>

            {/* CTA */}
            <Link
              href={slide.cta.href}
              className="group inline-flex items-center gap-4 border border-white/20 rounded-full px-8 py-4 hover:bg-white hover:text-black transition-all duration-500"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                {slide.cta.label}
              </span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Controls */}
        <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12 flex items-center justify-between">
          {/* Slide Indicators */}
          <div className="flex items-center gap-6">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className="relative flex items-center cursor-pointer"
              >
                <div className={`h-[2px] transition-all duration-700 ${
                  idx === current ? 'w-16 bg-white' : 'w-6 bg-white/20 hover:bg-white/40'
                }`} />
                {idx === current && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: 'linear' }}
                    className="absolute inset-0 h-[2px] bg-white/60 origin-left"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Nav Arrows */}
          <div className="flex items-center gap-3">
            <button 
              onClick={prev}
              className="h-12 w-12 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={next}
              className="h-12 w-12 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
            <span className="text-[10px] font-bold text-white/30 ml-4 tracking-widest">
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
