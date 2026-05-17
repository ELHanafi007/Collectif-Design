'use client';

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, X } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { Product, PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/layout/Navbar";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Tous");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Try local PRODUCTS static array first
        if (PRODUCTS.length > 0) {
          setProducts(PRODUCTS);
          return;
        }

        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryNames = ["Tous", ...CATEGORIES.map(c => c.name)];
  
  const currentCategory = useMemo(() => 
    CATEGORIES.find(c => c.name === selectedCategory),
    [selectedCategory]
  );

  const subCategories = useMemo(() => 
    currentCategory ? ["Tous", ...currentCategory.subCategories.map(s => s.name)] : [],
    [currentCategory]
  );

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const categoryMatch = selectedCategory === "Tous" || p.category === selectedCategory;
      const subCategoryMatch = selectedSubCategory === "Tous" || p.sub_category === selectedSubCategory;
      const priceValue = parseInt(p.price.toString().replace(".", "").replace(/\s/g, ""));
      const priceMatch = priceValue <= maxPrice;
      
      return categoryMatch && subCategoryMatch && priceMatch;
    });
  }, [products, selectedCategory, selectedSubCategory, maxPrice]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Cinematic Header */}
      <section className="relative pt-48 pb-16 px-6 md:px-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted block">
              La Collection
            </span>
            <h1 className="text-6xl md:text-8xl tracking-tightest">
              L'Atelier <span className="text-muted italic">Collectif</span>
            </h1>
          </motion.div>

          {/* Filtering Toolbar */}
          <div className="mt-16 flex flex-col md:flex-row md:items-center justify-between py-6 border-y border-border gap-6">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {categoryNames.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubCategory("Tous");
                  }}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest transition-colors",
                    selectedCategory === cat ? "text-foreground" : "text-muted hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
              >
                <Filter size={14} /> 
                Filtres
              </button>
              <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                Trier <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-10 border-b border-border">
                  <div className="space-y-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted">Sous-Catégories</span>
                    <div className="flex flex-wrap gap-2">
                      {subCategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setSelectedSubCategory(sub)}
                          className={cn(
                            "text-[9px] px-4 py-2 rounded-full border transition-all",
                            selectedSubCategory === sub ? "bg-foreground text-background border-foreground" : "border-border text-muted hover:border-foreground hover:text-foreground"
                          )}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted">Prix Max</span>
                      <span className="text-xs">{maxPrice.toLocaleString()} MAD</span>
                    </div>
                    <input 
                      type="range" 
                      min="1000" 
                      max="100000" 
                      step="1000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="w-full h-[1px] bg-border appearance-none cursor-pointer accent-foreground"
                    />
                  </div>

                  <div className="flex items-end justify-end">
                    <button 
                      onClick={() => {
                        setSelectedCategory("Tous");
                        setSelectedSubCategory("Tous");
                        setMaxPrice(100000);
                      }}
                      className="text-[9px] font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors flex items-center gap-2"
                    >
                      <X size={12} /> Réinitialiser
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding pt-10">
        <div className="container-wide">
          {loading ? (
            <div className="py-32 flex justify-center">
              <div className="h-10 w-10 border-t-2 border-foreground rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-6 md:gap-x-10 gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="py-32 text-center space-y-4">
                  <h3 className="text-2xl font-serif italic text-muted">Aucune pièce trouvée.</h3>
                  <button 
                    onClick={() => { setSelectedCategory("Tous"); setSelectedSubCategory("Tous"); setMaxPrice(100000); }}
                    className="text-[10px] font-bold uppercase tracking-widest border-b border-foreground pb-1"
                  >
                    Voir tout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
