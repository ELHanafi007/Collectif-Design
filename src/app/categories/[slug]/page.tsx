'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/products';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryMeta: Record<string, { title: string; desc: string; image: string; pattern: string }> = {
  'salons': { 
    title: 'Salons', 
    desc: 'L\'élégance du confort absolu, sculpté pour vos moments d\'exception.', 
    image: '/salon.jpeg',
    pattern: '01'
  },
  'tables-basses': { 
    title: 'Tables Basses', 
    desc: 'Pièces maîtresses en matériaux nobles, entre art et fonctionnalité.', 
    image: '/tabledebasse.jpeg',
    pattern: '02'
  },
  'tables-de-chevet': { 
    title: 'Chambre', 
    desc: 'Votre sanctuaire privé, où chaque détail invite à la sérénité.', 
    image: '/tablesdechevet.jpeg',
    pattern: '03'
  },
  'bibliotheques': { 
    title: 'Rangement', 
    desc: 'L\'art d\'organiser l\'espace avec une sophistication architecturale.', 
    image: '/bibliotheque.jpeg',
    pattern: '04'
  },
  'tables-a-manger': { 
    title: 'Salle à Manger', 
    desc: 'Le théâtre de vos réceptions les plus mémorables.', 
    image: '/table a manger.jpeg',
    pattern: '05'
  },
  'decoration': { 
    title: 'Décoration', 
    desc: 'Les touches finales qui insufflent une âme à votre intérieur.', 
    image: '/decoration.jpeg',
    pattern: '06'
  },
};

export default function CategoryPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const slugStr = slug as string;
  const meta = categoryMeta[slugStr] || { title: slugStr, desc: '', image: '/hero.jpeg', pattern: '00' };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [maxPriceInDb, setMaxPriceInDb] = useState(100000);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', slug);
        
        if (error) throw error;
        
        const fetchedProducts = data || [];
        setProducts(fetchedProducts);
        
        if (fetchedProducts.length > 0) {
          const max = Math.max(...fetchedProducts.map(p => p.price));
          setMaxPriceInDb(max);
          setPriceRange([0, max]);
        }
      } catch (err) {
        console.error("Error fetching category products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProducts();
  }, [slug]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
  }, [products, priceRange]);

  return (
    <main className="min-h-screen bg-background" ref={containerRef}>
      <Navbar />
      
      {/* Cinematic Category Banner */}
      <section className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img 
            src={meta.image} 
            alt={meta.title} 
            className="h-full w-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </motion.div>

        <div className="relative z-10 w-full px-6 md:px-12 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto space-y-6"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-8 md:w-16 bg-white/30" />
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] text-white/70">Collection {meta.pattern}</span>
              <div className="h-[1px] w-8 md:w-16 bg-white/30" />
            </div>
            
            <h1 className="text-7xl md:text-[12vw] font-serif tracking-tightest uppercase leading-[0.8] mb-8">
              {meta.title}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-sm md:text-lg font-light text-white/60 max-w-2xl mx-auto italic"
            >
              "{meta.desc}"
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30">
          <span className="text-[9px] font-bold uppercase tracking-widest">DÉCOUVRIR</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Luxury Filter Bar */}
      <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-y border-border">
        <div className="container-wide px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest hover:text-muted transition-colors"
            >
              <SlidersHorizontal size={14} />
              <span>Filtres</span>
            </button>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                {filteredProducts.length} PIÈCES
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-bold text-muted uppercase tracking-widest">Gamme de Prix</span>
                <span className="text-[10px] font-medium">{priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} MAD</span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-muted transition-colors">
              <span>Pertinence</span>
              <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* Expanded Filter UI */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden bg-surface border-b border-border"
            >
              <div className="container-wide px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest">Prix</h4>
                  <div className="px-2 pt-10 pb-4">
                    <input 
                      type="range" 
                      min="0" 
                      max={maxPriceInDb} 
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-foreground bg-border h-1 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-4 text-[10px] font-medium tracking-widest uppercase">
                      <span>0 MAD</span>
                      <span>{priceRange[1].toLocaleString()} MAD</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-end">
                  <button 
                    onClick={() => setPriceRange([0, maxPriceInDb])}
                    className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors border-b border-muted"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Grid */}
      <section className="section-padding pt-16">
        <div className="container-wide">
          {loading ? (
            <div className="py-40 flex flex-col items-center gap-6">
              <div className="h-12 w-12 border border-border border-t-foreground rounded-full animate-spin" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Chargement de la collection</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-20">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx % 4 * 0.1, duration: 0.8 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-40 text-center space-y-6">
                  <h3 className="text-3xl font-serif italic text-muted">Aucune pièce ne correspond à vos critères.</h3>
                  <button 
                    onClick={() => setPriceRange([0, maxPriceInDb])}
                    className="text-[10px] font-bold uppercase tracking-widest border-b border-foreground pb-2"
                  >
                    Effacer les filtres
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
