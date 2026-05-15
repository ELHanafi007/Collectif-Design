'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { ChevronRight, ShoppingBag, Heart, Shield, Truck, Minus, Plus } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/products';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
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
        <div className="h-10 w-10 border-t-2 border-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen bg-background flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-serif italic text-muted">Produit introuvable.</h2>
        <Link href="/shop" className="text-[10px] font-bold uppercase tracking-widest border-b border-foreground pb-1">
          Retour au Catalogue
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 md:px-12">
        <div className="container-wide">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-muted mb-10">
            <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <ChevronRight size={10} />
            <Link href="/shop" className="hover:text-foreground transition-colors">Catalogue</Link>
            <ChevronRight size={10} />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
            {/* Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square md:aspect-[4/5] bg-surface rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={images[activeImage]}
                    className="h-full w-full object-cover"
                    alt={product.name}
                  />
                </AnimatePresence>
                
                {product.discount && (
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-foreground text-background px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest">
                      -{product.discount}%
                    </span>
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square w-20 rounded-xl overflow-hidden transition-all ${
                        activeImage === i ? 'ring-2 ring-foreground ring-offset-2' : 'opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img src={img} className="h-full w-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Category */}
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted">
                  {product.category} {product.sub_category && `— ${product.sub_category}`}
                </span>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl tracking-tightest leading-tight">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-medium">{product.price} <span className="text-lg font-light text-muted">MAD</span></span>
                  {product.oldPrice && (
                    <span className="text-lg text-muted/40 line-through">{product.oldPrice} MAD</span>
                  )}
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-border" />

                {/* Description */}
                <p className="text-base font-light text-muted leading-relaxed">
                  {product.description || "Une pièce d'exception alliant artisanat traditionnel et pureté contemporaine. Chaque détail a été pensé pour sublimer votre espace de vie."}
                </p>

                {/* Specs */}
                {(product.material || product.dimensions) && (
                  <div className="grid grid-cols-2 gap-6">
                    {product.material && (
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted">Matériaux</span>
                        <p className="text-sm">{product.material}</p>
                      </div>
                    )}
                    {product.dimensions && (
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted">Dimensions</span>
                        <p className="text-sm">{product.dimensions}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Quantity + Add to cart */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {/* Quantity */}
                  <div className="flex items-center border border-border rounded-full">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-12 w-12 flex items-center justify-center hover:text-muted transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-12 w-12 flex items-center justify-center hover:text-muted transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Add to cart */}
                  <button 
                    onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); }}
                    className="flex-1 flex items-center justify-center gap-3 bg-foreground text-background rounded-full h-12 px-8 hover:opacity-90 transition-opacity active:scale-[0.98]"
                  >
                    <ShoppingBag size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Ajouter au Panier</span>
                  </button>

                  {/* Wishlist */}
                  <button className="h-12 w-12 shrink-0 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors">
                    <Heart size={16} />
                  </button>
                </div>

                {/* Trust */}
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-4">
                    <Truck size={18} className="text-muted" />
                    <div>
                      <p className="text-xs font-medium">Livraison Gratuite</p>
                      <p className="text-[10px] text-muted">Partout au Maroc</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Shield size={18} className="text-muted" />
                    <div>
                      <p className="text-xs font-medium">Garantie 5 Ans</p>
                      <p className="text-[10px] text-muted">Qualité Certifiée</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
