'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/products';
import { ChevronDown, LayoutGrid, List } from 'lucide-react';

const categoryMeta: Record<string, { title: string }> = {
  'salons': { title: 'Salons' },
  'tables-basses': { title: 'Tables Basses' },
  'tables-de-chevet': { title: 'Chambre' },
  'bibliotheques': { title: 'Rangement' },
  'tables-a-manger': { title: 'Salle à Manger' },
  'decoration': { title: 'Décoration' },
};

export default function CategoryPage() {
  const { slug } = useParams();
  const slugStr = slug as string;
  const meta = categoryMeta[slugStr] || { title: slugStr.replace('-', ' ') };

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

  // Use dummy products if database is empty for demo
  const displayProducts = products.length > 0 ? products : [
    { id: '1', name: 'Hugo, Salon en L', category: "Salons d'angle", image: '/salon.jpeg', price: '19 500', oldPrice: '25 700', badge: '-24%' },
    { id: '2', name: 'Bering, Salon en U', category: 'Salons en U', image: '/salon.jpeg', price: '41 800', oldPrice: '63 050', badge: '-34%' },
    { id: '3', name: 'Cairo, Salon en L', category: "Salons d'angle", image: '/salon.jpeg', price: '14 500', oldPrice: '24 570', badge: '-41%' },
    { id: '4', name: 'Orvelo PM, Salon en L', category: "Salons d'angle", image: '/salon.jpeg', price: '19 850', oldPrice: '30 120', badge: '-34%' },
    { id: '5', name: 'Luft, Salon en L', category: "Salons d'angle", image: '/salon.jpeg', price: '21 000', oldPrice: '26 250', badge: '-20%' },
    { id: '6', name: 'Bloom, Salon en L', category: "Salons d'angle", image: '/salon.jpeg', price: '18 000', oldPrice: '24 320', badge: '-26%' }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Cinematic Category Banner */}
      <section className="relative h-[200px] md:h-[300px] w-full overflow-hidden flex items-center justify-center bg-[#2a2a2a]">
        <div className="absolute inset-0 z-0 flex opacity-60">
           <img src="/salon.jpeg" className="w-1/4 h-full object-cover filter sepia brightness-50" alt="" />
           <img src="/salon.jpeg" className="w-1/4 h-full object-cover filter brightness-75" alt="" />
           <img src="/salon.jpeg" className="w-1/4 h-full object-cover filter hue-rotate-15" alt="" />
           <img src="/salon.jpeg" className="w-1/4 h-full object-cover filter sepia hue-rotate-90 brightness-75" alt="" />
        </div>

        <div className="relative z-10 w-full px-6 text-center">
            <h1 className="text-5xl md:text-[120px] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbfb] to-[#ebedee]" style={{ backgroundImage: 'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)' }}>
              {meta.title}
            </h1>
        </div>
      </section>

      {/* Breadcrumb & View Toggle */}
      <div className="container-wide px-4 md:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
         <div className="text-[11px] text-gray-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-black">Accueil</Link> / <span className="text-black font-medium">{meta.title}</span>
         </div>
         <div className="flex gap-4 text-gray-400 hidden md:flex">
            <List size={18} className="cursor-pointer hover:text-black" />
            <LayoutGrid size={18} className="cursor-pointer text-black" />
         </div>
      </div>

      {/* Luxury Filter Bar */}
      <div className="container-wide px-4 md:px-8 pb-8 border-b border-gray-100">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <div className="border border-gray-200 p-3.5 flex justify-between items-center text-[11px] text-gray-500 uppercase tracking-widest cursor-pointer">
               <span>Categories</span>
               <div className="flex items-center gap-2">
                 <span className="text-black font-medium">{meta.title}</span>
                 <ChevronDown size={14} />
               </div>
            </div>
            <div className="border border-gray-200 p-3.5 flex justify-between items-center text-[11px] text-gray-500 uppercase tracking-widest cursor-pointer">
               <span>Trier par prix</span>
               <ChevronDown size={14} />
            </div>
         </div>
      </div>

      {/* Product Grid */}
      <section className="py-12 bg-white">
        <div className="container-wide px-4 md:px-8">
          {loading ? (
            <div className="py-20 flex flex-col items-center gap-4">
              <div className="h-8 w-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {displayProducts.map((product: any, idx) => (
                <div key={idx} className="border border-gray-100 p-4 hover:shadow-lg transition-shadow group flex flex-col">
                  <div className="relative aspect-[4/3] mb-4 bg-white">
                    {product.badge && (
                      <div className="absolute top-0 left-0 z-10 bg-red-600 text-white text-[11px] font-bold px-1.5 py-0.5">
                        {product.badge}
                      </div>
                    )}
                    <img src={product.image || '/salon.jpeg'} alt={product.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-center space-y-1 mt-auto">
                    <h3 className="text-[13px] text-gray-800 font-medium">{product.name}</h3>
                    <p className="text-[11px] text-gray-400">{product.category}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      {product.oldPrice && <span className="text-[11px] text-gray-400 line-through">{product.oldPrice} DH</span>}
                      <span className="text-sm font-bold text-red-600">{product.price || 0} DH</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
