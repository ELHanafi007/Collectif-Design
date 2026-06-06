'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { supabase } from '@/lib/supabaseClient';
import { Product, PRODUCTS } from '@/lib/products';
import { ChevronDown, Grid, List } from 'lucide-react';

const categoryMeta: Record<string, { title: string; image: string }> = {
  'salons': { title: 'SALONS', image: '/salon.jpeg' },
  'tables-basses': { title: 'TABLES BASSES', image: '/tabledebasse.jpeg' },
  'tables-de-chevet': { title: 'CHAMBRE', image: '/tablesdechevet.jpeg' },
  'bibliotheques': { title: 'RANGEMENT', image: '/bibliotheque.jpeg' },
  'tables-a-manger': { title: 'SALLE À MANGER', image: '/table a manger.jpeg' },
  'decoration': { title: 'DÉCORATION', image: '/decoration.jpeg' },
  'canapes': { title: 'CANAPÉS', image: '/salon.jpeg' },
  'packs-promo': { title: 'PACKS PROMO', image: '/hero.jpeg' }
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

const mockPromoPacks: Product[] = [
  {
    id: "pack-chambre-exclusive",
    name: "Pack Chambre Exclusive",
    price: "25000",
    oldPrice: "32000",
    discount: 22,
    image: "/tablesdechevet.jpeg",
    category: "Packs Promo",
    sub_category: "Chambre",
    material: "Bois chêne massif, Velours italien premium",
    description: "Le Pack Chambre Exclusive est composé de : 1x Lit King Size, 2x Tables de Chevet assorties, 1x Commode 6 tiroirs et 1x Miroir Mural. Conçu pour apporter élégance et confort absolu à votre suite parentale.",
    dimensions: "Lit: L200 x H140 x P210 cm",
    inStock: true
  },
  {
    id: "pack-salon-exclusive",
    name: "Pack Salon Exclusive",
    price: "18500",
    oldPrice: "24000",
    discount: 23,
    image: "/salon.jpeg",
    category: "Packs Promo",
    sub_category: "Salon",
    material: "Tissu bouclé premium, Structure acier doré",
    description: "Le Pack Salon Exclusive comprend : 1x Canapé 3 Places grand confort, 1x Table Basse ATLAS, 1x Meuble TV suspendu et 2x Tables d'Appoint Sonata. Un équilibre parfait entre modernité marocaine et finitions d'atelier.",
    dimensions: "Canapé: L230 x P95 x H80 cm",
    inStock: true
  },
  {
    id: "pack-salle-a-manger-exclusive",
    name: "Pack Salle à Manger",
    price: "15000",
    oldPrice: "19500",
    discount: 23,
    image: "/table a manger.jpeg",
    category: "Packs Promo",
    sub_category: "Salle à manger",
    material: "Marbre naturel blanc Calacatta, Chêne teinté",
    description: "Le Pack Salle à Manger comprend : 1x Table à Manger 6 Places avec plateau en marbre, 6x Chaises design ergonomiques et 1x Buffet de rangement PYRAMIDES. Idéal pour des dîners prestigieux.",
    dimensions: "Table: L200 x P100 x H75 cm",
    inStock: true
  }
];

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
        
        // Intercept packs-promo category slug
        if (slugStr === 'packs-promo') {
          setProducts(mockPromoPacks);
          return;
        }

        const mappedCategories = slugToDbCategory[slugStr] || [slugStr];

        // Fetch from Supabase first
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('category', mappedCategories);
        
        if (error) throw error;

        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // Fallback to local static products
          const localMatched = PRODUCTS.filter(p => 
            mappedCategories.some(c => 
              c.toLowerCase() === p.category.toLowerCase() || 
              c.toLowerCase() === p.sub_category.toLowerCase()
            )
          );
          setProducts(localMatched);
        }
      } catch (err) {
        console.error("Error fetching category products, using local fallback:", err);
        const mappedCategories = slugToDbCategory[slugStr] || [slugStr];
        const localMatched = PRODUCTS.filter(p => 
          mappedCategories.some(c => 
            c.toLowerCase() === p.category.toLowerCase() || 
            c.toLowerCase() === p.sub_category.toLowerCase()
          )
        );
        setProducts(localMatched);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProducts();
  }, [slug, slugStr]);

  return (
    <main className="min-h-screen bg-background font-sans">
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-6 border-b border-border">
          <div className="text-[10px] font-bold tracking-widest text-muted uppercase flex items-center gap-2">
            <Link href="/" className="hover:text-foreground">ACCUEIL</Link>
            <span>/</span>
            <span className="text-foreground">{meta.title}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-muted mt-4 md:mt-0">
            <button className="hover:text-foreground"><List size={18} /></button>
            <button className="text-foreground"><Grid size={18} /></button>
            <button className="hover:text-foreground"><Grid size={18} strokeWidth={3} /></button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center gap-6 py-6 select-none">
          <div className="w-full md:w-64 border border-border bg-surface px-6 py-3 rounded-full flex items-center justify-between cursor-pointer hover:border-foreground transition-all duration-300">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Catégories</span>
              <span className="text-xs font-semibold text-foreground">{meta.title}</span>
            </div>
            <ChevronDown size={14} className="text-muted" />
          </div>

          <div className="w-full md:w-64 border border-border bg-surface px-6 py-3 rounded-full flex items-center justify-between cursor-pointer hover:border-foreground transition-all duration-300">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Trier par prix</span>
              <span className="text-xs font-semibold text-muted">Sélectionner</span>
            </div>
            <ChevronDown size={14} className="text-muted" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="container-wide mx-auto px-4 md:px-8 pb-24">
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="h-8 w-8 border border-border border-t-foreground rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
