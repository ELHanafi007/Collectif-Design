'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { ChevronRight, ShoppingBag, Heart, Shield, Truck, Sparkles } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/products';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', slug)
          .single();
        
        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="h-16 w-[1px] bg-border relative overflow-hidden">
          <div className="absolute inset-0 bg-accent animate-pulse" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen bg-background flex flex-col items-center justify-center gap-8">
        <h2 className="text-3xl font-serif italic text-muted/40">Pièce introuvable dans nos archives.</h2>
        <Link href="/shop" className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent border-b border-accent pb-2">
          Retour au Catalogue
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <main className="min-h-screen bg-background selection:bg-accent selection:text-background">
      <Navbar />
      
      <div className="pt-40 pb-32 px-6 md:px-12 max-w-[1800px] mx-auto">
        {/* Breadcrumbs */}
        <motion.nav 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] text-muted/40 mb-16"
        >
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-foreground transition-colors">Catalogue</Link>
          <ChevronRight size={10} />
          <span className="text-accent">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-32">
          {/* Gallery System */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-6">
              {/* Thumbnails */}
              <div className="col-span-2 space-y-4">
                {images.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-[3/4] w-full overflow-hidden transition-all duration-700 ${
                      activeImage === i ? "border border-accent" : "border border-transparent opacity-40 grayscale hover:opacity-100"
                    }`}
                  >
                    <img src={img} className="h-full w-full object-cover" alt="" />
                  </button>
                ))}
              </div>
              
              {/* Main Image */}
              <div className="col-span-10 relative aspect-[3/4] bg-surface overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    src={images[activeImage]}
                    className="h-full w-full object-cover"
                    alt={product.name}
                  />
                </AnimatePresence>
                
                {product.discount && (
                  <div className="absolute top-10 left-10 z-10 bg-accent px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white">
                    Limited Selection — {product.discount}%
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent">
                  {product.category} — {product.sub_category}
                </span>
                <h1 className="text-6xl md:text-8xl font-medium tracking-tightest leading-[0.8] lowercase">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-6 pt-4">
                   <p className="text-3xl font-medium tracking-tight">
                    {product.price} MAD
                  </p>
                  {product.oldPrice && (
                    <p className="text-lg text-muted/40 line-through tracking-tight">
                      {product.oldPrice} MAD
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-8 border-y border-border/10 py-12">
                 <div className="flex items-center gap-4 text-accent">
                    <Sparkles size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em]">L'Essence du Design</span>
                 </div>
                 <p className="text-lg text-foreground/60 font-light leading-relaxed text-balance">
                  {product.description || "Une pièce d'exception alliant artisanat traditionnel et pureté contemporaine. Chaque détail a été pensé pour sublimer votre espace de vie."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-2">
                   <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-muted/40">Matériaux</span>
                   <p className="text-sm font-medium">{product.material || "Matériaux Nobles"}</p>
                </div>
                <div className="space-y-2">
                   <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-muted/40">Dimensions</span>
                   <p className="text-sm font-medium">{product.dimensions || "Sur Mesure"}</p>
                </div>
              </div>

              <div className="pt-12 flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => addToCart(product)}
                  className="group relative flex-[2] flex items-center justify-center gap-8 overflow-hidden rounded-full border border-border bg-foreground px-12 py-7 transition-all active:scale-95"
                >
                  <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.6em] text-background">
                    Réserver la pièce
                  </span>
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo" />
                </button>
                <button className="flex-1 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-700">
                  <Heart size={20} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-16 grid grid-cols-2 gap-12 border-t border-border/10">
                <div className="flex items-center gap-6 group">
                   <div className="w-12 h-12 rounded-full border border-border/20 flex items-center justify-center group-hover:text-accent transition-colors">
                      <Truck size={16} />
                   </div>
                   <div>
                      <h5 className="text-[9px] font-bold uppercase tracking-widest mb-1">Livraison Royale</h5>
                      <p className="text-[8px] text-muted/40 uppercase tracking-widest">Partout au Maroc</p>
                   </div>
                </div>
                <div className="flex items-center gap-6 group">
                   <div className="w-12 h-12 rounded-full border border-border/20 flex items-center justify-center group-hover:text-accent transition-colors">
                      <Shield size={16} />
                   </div>
                   <div>
                      <h5 className="text-[9px] font-bold uppercase tracking-widest mb-1">Garantie Atelier</h5>
                      <p className="text-[8px] text-muted/40 uppercase tracking-widest">Qualité Certifiée</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
