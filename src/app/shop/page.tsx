'use client';

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, LayoutGrid, List, X } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { Product } from "@/lib/products";
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
      <section className="relative pt-48 pb-24 px-6 md:px-12 border-b border-border/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent mb-6 block">
              Curated Collections
            </span>
            <h1 className="text-[10vw] md:text-[8vw] font-medium leading-[0.8] tracking-tightest mb-16 lowercase">
              L'Atelier <br />
              <span className="italic font-light">de Design</span>
            </h1>
          </motion.div>

          {/* Filtering System */}
          <div className="mt-20 space-y-12">
             {/* Main Categories Navigation */}
             <div className="flex flex-wrap gap-x-12 gap-y-6">
                {categoryNames.map((cat, idx) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedSubCategory("Tous");
                    }}
                    className={cn(
                      "group relative text-[10px] font-bold uppercase tracking-[0.4em] transition-colors duration-500",
                      selectedCategory === cat ? "text-foreground" : "text-muted/40 hover:text-foreground"
                    )}
                  >
                    {cat}
                    {selectedCategory === cat && (
                      <motion.div 
                        layoutId="activeCategory"
                        className="absolute -bottom-4 left-0 h-[2px] w-full bg-accent"
                      />
                    )}
                  </button>
                ))}
             </div>

             {/* Toolbar */}
             <div className="flex flex-col md:flex-row md:items-center justify-between py-8 border-y border-border/30 gap-8">
                <div className="flex items-center gap-12">
                  <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted/60">
                    {filteredProducts.length} PIÈCES TROUVÉES
                  </p>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={cn(
                      "flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] transition-all",
                      showFilters ? "text-accent" : "text-foreground hover:text-accent"
                    )}
                  >
                    <Filter size={14} className={showFilters ? "rotate-180" : ""} /> 
                    {showFilters ? "Fermer les filtres" : "Affiner la recherche"}
                  </button>
                </div>
                
                <div className="flex items-center gap-12">
                  <div className="hidden lg:flex items-center gap-6 border-r border-border pr-12">
                    <button className="text-foreground transition-colors"><LayoutGrid size={16} /></button>
                    <button className="text-muted/40 hover:text-foreground transition-colors"><List size={16} /></button>
                  </div>
                  <button className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] hover:text-accent transition-colors">
                    Trier <ChevronDown size={14} />
                  </button>
                </div>
             </div>

             {/* Advanced Filters Panel */}
             <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 py-12">
                      {/* Sub-categories */}
                      <div className="space-y-8">
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Sous-Catégories</p>
                        <div className="flex flex-wrap gap-3">
                          {subCategories.length > 0 ? subCategories.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => setSelectedSubCategory(sub)}
                              className={cn(
                                "text-[9px] font-bold uppercase tracking-[0.3em] px-6 py-3 border transition-all duration-500",
                                selectedSubCategory === sub 
                                  ? "bg-foreground text-background border-foreground" 
                                  : "bg-transparent border-border text-muted/60 hover:border-accent hover:text-accent"
                              )}
                            >
                              {sub}
                            </button>
                          )) : (
                            <p className="text-[10px] italic text-muted/40">Choisissez une catégorie pour voir les détails</p>
                          )}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="space-y-8">
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Budget Maximum</p>
                          <span className="text-sm font-medium">{maxPrice.toLocaleString()} MAD</span>
                        </div>
                        <div className="space-y-4">
                          <input 
                            type="range" 
                            min="1000" 
                            max="100000" 
                            step="1000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                            className="w-full h-[1px] bg-border appearance-none cursor-pointer accent-accent"
                          />
                          <div className="flex justify-between text-[8px] font-bold uppercase tracking-[0.4em] text-muted/40">
                            <span>1.000 MAD</span>
                            <span>100.000 MAD</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Reset */}
                      <div className="flex items-end justify-end">
                        <button 
                          onClick={() => {
                            setSelectedCategory("Tous");
                            setSelectedSubCategory("Tous");
                            setMaxPrice(100000);
                          }}
                          className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] text-muted/40 hover:text-accent transition-colors"
                        >
                          <X size={12} /> Réinitialiser Tout
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="container mx-auto">
          {loading ? (
            <div className="py-48 flex flex-col items-center justify-center space-y-8">
              <div className="h-20 w-[1px] bg-border relative overflow-hidden">
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-accent w-full"
                />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.8em] text-muted/40 animate-pulse">Chargement de la collection...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-48 text-center">
                  <h3 className="text-3xl font-serif italic text-muted/40 mb-8">Aucune pièce ne correspond à votre sélection.</h3>
                  <button 
                    onClick={() => { 
                      setSelectedCategory("Tous"); 
                      setSelectedSubCategory("Tous"); 
                      setMaxPrice(100000);
                    }}
                    className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent border-b border-accent pb-2 hover:text-foreground hover:border-foreground transition-all"
                  >
                    Voir toute la collection
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
