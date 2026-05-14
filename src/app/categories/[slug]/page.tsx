'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/products';
import { motion } from 'framer-motion';

export default function CategoryPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const subCategoryParam = searchParams.get('sub');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', slug);
        
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching category products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProducts();
  }, [slug]);

  const filteredProducts = useMemo(() => {
    if (!subCategoryParam) return products;
    return products.filter(p => p.sub_category.toLowerCase() === subCategoryParam.toLowerCase());
  }, [products, subCategoryParam]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Cinematic Header */}
      <section className="relative pt-48 pb-24 px-6 md:px-12 border-b border-border/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent mb-6 block">
              Collection Univers
            </span>
            <h1 className="text-[10vw] md:text-[8vw] font-medium leading-[0.8] tracking-tightest mb-16 lowercase">
              {slug}<br />
              <span className="italic font-light">de Collectif</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="container mx-auto">
          {loading ? (
            <div className="py-48 flex flex-col items-center justify-center space-y-8">
              <div className="h-16 w-[1px] bg-border relative overflow-hidden">
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-accent w-full"
                />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.8em] text-muted/40 animate-pulse">Exploration de l'Univers...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-48 text-center">
                  <h3 className="text-3xl font-serif italic text-muted/40 mb-8">Cet univers est en cours de création.</h3>
                  <Link 
                    href="/shop"
                    className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent border-b border-accent pb-2 hover:text-foreground hover:border-foreground transition-all"
                  >
                    Explorer le Catalogue Complet
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
