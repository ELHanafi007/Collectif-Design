'use client';

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, X, ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { Product, PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/layout/Navbar";
import { useRef } from "react";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Tous");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  const getCategoryCount = (catName: string) => {
    if (catName === "Tous") return products.length;
    return products.filter(p => p.category === catName).length;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(PRODUCTS);
        }
      } catch (err) {
        console.error("Error fetching products, using local fallback:", err);
        setProducts(PRODUCTS);
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
    const filtered = products.filter(p => {
      const categoryMatch = selectedCategory === "Tous" || p.category === selectedCategory;
      const subCategoryMatch = selectedSubCategory === "Tous" || p.sub_category === selectedSubCategory;
      const priceValue = parseInt(p.price.toString().replace(".", "").replace(/\s/g, ""));
      const priceMatch = priceValue <= maxPrice;
      
      return categoryMatch && subCategoryMatch && priceMatch;
    });

    return [...filtered].sort((a, b) => {
      const priceA = Number(String(a.price).replace(/[^0-9.-]+/g, ""));
      const priceB = Number(String(b.price).replace(/[^0-9.-]+/g, ""));
      const discountA = Number(a.discount || 0);
      const discountB = Number(b.discount || 0);

      if (sortBy === "price-asc") return priceA - priceB;
      if (sortBy === "price-desc") return priceB - priceA;
      if (sortBy === "discount") return discountB - discountA;
      if (sortBy === "name") return a.name.localeCompare(b.name, 'fr');
      return 0;
    });
  }, [products, selectedCategory, selectedSubCategory, maxPrice, sortBy]);

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
              L&apos;Atelier <span className="text-muted italic">Collectif</span>
            </h1>
          </motion.div>

          {/* Filtering Toolbar */}
          <div className="mt-16 border-y border-border py-4 md:py-6 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6">
            
            {/* Left Section: Scrollable Category Bar with Fade Masks */}
            <div className="relative flex-1 flex items-center overflow-hidden pr-2 xl:pr-6">
              
              {/* Left Arrow Button */}
              <button 
                onClick={scrollLeft}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-border bg-background/80 hover:bg-foreground hover:text-background transition-all mr-2 shrink-0 cursor-pointer active:scale-90"
                aria-label="Faire défiler à gauche"
              >
                <ChevronLeft size={14} />
              </button>

              {/* Slider Viewport with Left/Right CSS Gradients masks */}
              <div className="relative flex-1 overflow-hidden">
                {/* Left Fade Overlay */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
                
                {/* Scrollable Container */}
                <div 
                  ref={scrollContainerRef}
                  className="flex items-center gap-3 overflow-x-auto scroll-smooth no-scrollbar py-2 px-1"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {categoryNames.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    const count = getCategoryCount(cat);
                    
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setSelectedSubCategory("Tous");
                        }}
                        className={cn(
                          "relative text-[10px] font-bold uppercase tracking-widest px-5 py-3 rounded-full border transition-all duration-300 shrink-0 cursor-pointer flex items-center gap-2 select-none",
                          isSelected 
                            ? "bg-foreground text-background border-foreground shadow-md scale-102" 
                            : "bg-surface border-border text-muted hover:border-foreground hover:text-foreground"
                        )}
                      >
                        <span>{cat}</span>
                        <span className={cn(
                          "text-[8px] font-mono px-1.5 py-0.5 rounded-full",
                          isSelected ? "bg-background/25 text-background" : "bg-border text-muted"
                        )}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Fade Overlay */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
              </div>

              {/* Right Arrow Button */}
              <button 
                onClick={scrollRight}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-border bg-background/80 hover:bg-foreground hover:text-background transition-all ml-2 shrink-0 cursor-pointer active:scale-90"
                aria-label="Faire défiler à droite"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Right Section: Filter and Sort Actions */}
            <div className="flex items-center justify-end gap-4 shrink-0 border-t xl:border-t-0 pt-4 xl:pt-0 border-border xl:pl-6">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border border-border px-5 py-3 rounded-full hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer select-none",
                  showFilters && "bg-foreground text-background border-foreground"
                )}
              >
                <Filter size={12} /> 
                Filtres {showFilters && "Actifs"}
              </button>
              <label className="relative">
                <span className="sr-only">Trier les produits</span>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="appearance-none bg-background text-foreground text-[10px] font-bold uppercase tracking-widest border border-border pl-5 pr-10 py-3 rounded-full hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer select-none focus:outline-none focus:border-foreground"
                >
                  <option value="featured">Sélection</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="discount">Promos</option>
                  <option value="name">Nom A-Z</option>
                </select>
                <ChevronDown size={12} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
              </label>
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
