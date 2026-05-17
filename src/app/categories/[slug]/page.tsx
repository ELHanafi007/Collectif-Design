'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/products';
import { ChevronDown, Grid, List } from 'lucide-react';

const categoryMeta: Record<string, { title: string; image: string }> = {
  'salons': { title: 'SALONS', image: '/salon.jpeg' },
  'tables-basses': { title: 'TABLES BASSES', image: '/tabledebasse.jpeg' },
  'tables-de-chevet': { title: 'CHAMBRE', image: '/tablesdechevet.jpeg' },
  'bibliotheques': { title: 'RANGEMENT', image: '/bibliotheque.jpeg' },
  'tables-a-manger': { title: 'SALLE À MANGER', image: '/table a manger.jpeg' },
  'decoration': { title: 'DÉCORATION', image: '/decoration.jpeg' },
  'canapes': { title: 'CANAPÉS', image: '/salon.jpeg' } // Using a placeholder as the grid background
};

const slugToDbCategory: Record<string, string[]> = {
  'salons': ['Salons'],
  'canapes': ['Salons'],
  'chambre': ['Tables de chevet'],
  'tables': ['Tables à manger', 'Tables basses', 'Tables d’appoint'],
  'tables-basses': ['Tables basses'],
  'tables-a-manger': ['Tables à manger', 'Salle à manger'],
  'jardin': ['Jardin'],
  'deco': ['DÉCORATION', 'Décoration', 'decoration'],
  'decoration': ['DÉCORATION', 'Décoration', 'decoration']
};

export default function CategoryPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const slugStr = slug as string;
  const meta = categoryMeta[slugStr] || { title: slugStr.toUpperCase(), image: '/hero.jpeg' };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const mappedCategories = slugToDbCategory[slugStr] || [slugStr];
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('category', mappedCategories);
        
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching category products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProducts();
  }, [slug, slugStr]);

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      <div className="pt-[84px] md:pt-[166px]"></div>
      
      {/* Category Banner */}
      <section className="relative w-full h-[168px] md:h-[232px] overflow-hidden flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src={meta.image} 
            alt={meta.title} 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black tracking-widest text-center" style={{
            background: 'linear-gradient(to bottom, #fceca5 0%, #d4af37 50%, #aa8627 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0px 2px 4px rgba(0,0,0,0.5)'
          }}>
            {meta.title}
          </h1>
        </div>
      </section>

      {/* Breadcrumb & Tools */}
      <div className="container-wide mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-6 border-b border-gray-100">
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
            <Link href="/" className="hover:text-black">ACCUEIL</Link>
            <span>/</span>
            <span className="text-black">{meta.title}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-gray-400 mt-4 md:mt-0">
            <button className="hover:text-black"><List size={18} /></button>
            <button className="text-black"><Grid size={18} /></button>
            <button className="hover:text-black"><Grid size={18} strokeWidth={3} /></button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center gap-6 py-6">
          <div className="w-full md:w-64 border border-gray-200 px-4 py-2 flex items-center justify-between cursor-pointer">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Catégories</span>
              <span className="text-xs font-semibold">{meta.title}</span>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>

          <div className="w-full md:w-64 border border-gray-200 px-4 py-2 flex items-center justify-between cursor-pointer">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trier par prix</span>
              <span className="text-xs font-semibold text-gray-400">Sélectionner</span>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="container-wide mx-auto px-4 md:px-8 pb-24">
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="h-8 w-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500">
                Aucun produit trouvé dans cette catégorie.
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
