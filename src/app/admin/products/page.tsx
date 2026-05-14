"use client";

import { useState, useEffect, useCallback } from "react";
import { Product } from "@/lib/products";
import { CATEGORIES } from "@/lib/categories";
import { Plus, Search, Edit3, Trash2, Archive, X, Package, Layers, Info, Ruler, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Dimension states
  const [dimL, setDimL] = useState("");
  const [dimW, setDimW] = useState("");
  const [dimH, setDimH] = useState("");
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'all' | 'archived'>('all');

  const parseDimensions = (dimStr: string | undefined) => {
    if (!dimStr) return { l: "", w: "", h: "" };
    const l = dimStr.match(/L(\d+)/)?.[1] || "";
    const w = dimStr.match(/[Pl](\d+)/)?.[1] || "";
    const h = dimStr.match(/H(\d+)/)?.[1] || "";
    return { l, w, h };
  };

  useEffect(() => {
    if (editingProduct) {
      const { l, w, h } = parseDimensions(editingProduct.dimensions);
      setDimL(l);
      setDimW(w);
      setDimH(h);
      setImagePreviews(editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images : [editingProduct.image]);
      setImageFiles([]);
      setSelectedCategoryName(editingProduct.category);
      setSelectedSubCategoryName(editingProduct.sub_category);
    } else {
      setDimL("");
      setDimW("");
      setDimH("");
      setImagePreviews([]);
      setImageFiles([]);
      setSelectedCategoryName(CATEGORIES[0]?.name || "");
      setSelectedSubCategoryName("");
    }
  }, [editingProduct, isModalOpen]);

  const fetchProducts = useCallback(async () => {
    try {
      setFetchLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const isFile = index >= (imagePreviews.length - imageFiles.length);
    if (isFile) {
      const fileIndex = index - (imagePreviews.length - imageFiles.length);
      setImageFiles(prev => prev.filter((_, i) => i !== fileIndex));
    }
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
    const filePath = fileName;
    
    const { error } = await supabase.storage
      .from('product_images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;
    
    const { data: publicUrlData } = supabase.storage
      .from('product_images')
      .getPublicUrl(filePath);
      
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      let finalImageUrls: string[] = [];
      
      const existingUrls = imagePreviews
        .filter(p => (p.trim().startsWith('http') || p.trim().startsWith('/')) && !p.startsWith('data:'))
        .map(p => p.trim());
        
      const newUploads = await Promise.all(
        imageFiles.map(file => handleImageUpload(file))
      );

      finalImageUrls = [...existingUrls, ...newUploads];

      if (finalImageUrls.length === 0) {
        alert("Veuillez ajouter au moins une image");
        setLoading(false);
        return;
      }

      const dimensionsStr = dimL || dimW || dimH ? `L${dimL} x P${dimW} x H${dimH} cm` : "";

      const productData = {
        name: String(formData.get('name') || ""),
        price: String(formData.get('price') || ""),
        category: String(formData.get('category') || ""),
        sub_category: String(formData.get('sub_category') || ""),
        material: String(formData.get('material') || ""),
        dimensions: dimensionsStr,
        weight: String(formData.get('weight') || ""),
        image: finalImageUrls[0],
        images: finalImageUrls,
        description: String(formData.get('description') || ""),
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      console.error("Save error:", err);
      alert("Erreur lors de la sauvegarde: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isArchived = (p as any).status === 'archived';
    if (activeTab === 'archived') return matchesSearch && isArchived;
    return matchesSearch && !isArchived;
  });

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous supprimer cette pièce du catalogue ?")) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="text-accent uppercase tracking-[0.6em] text-[10px] font-bold block mb-4">
            Curatorial Management
          </span>
          <h1 className="text-5xl font-medium tracking-tightest lowercase">
            Le <span className="italic font-light">Catalogue</span>
          </h1>
        </div>
        <button 
          onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
          className="group relative flex items-center gap-6 overflow-hidden rounded-full border border-border bg-foreground/5 px-10 py-5 transition-all hover:border-accent/50"
        >
          <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.4em]">Nouvelle Création</span>
          <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-[6] transition-transform duration-1000 ease-expo" />
        </button>
      </header>

      {/* Navigation Tabs */}
      <div className="flex gap-12 border-b border-border/10">
        {['all', 'archived'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn(
              "relative pb-6 text-[10px] font-bold uppercase tracking-[0.4em] transition-colors duration-500",
              activeTab === tab ? "text-foreground" : "text-muted/40 hover:text-foreground"
            )}
          >
            {tab === 'all' ? `En Stock (${products.filter(p => (p as any).status !== 'archived').length})` : `Archivé (${products.filter(p => (p as any).status === 'archived').length})`}
            {activeTab === tab && (
              <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 h-[2px] w-full bg-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative group">
        <input 
          type="text" 
          placeholder="Search by name, category, or material..."
          className="w-full bg-transparent border-b border-border/50 py-6 px-12 outline-none focus:border-accent transition-all duration-700 text-sm tracking-wide font-light placeholder:text-muted/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted/20 group-focus-within:text-accent transition-colors" />
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {fetchLoading ? (
          <div className="col-span-full py-48 flex flex-col items-center gap-8">
            <div className="h-16 w-[1px] bg-border relative overflow-hidden">
               <div className="absolute inset-0 bg-accent animate-pulse" />
            </div>
            <p className="text-[9px] uppercase tracking-[0.8em] text-muted/40 animate-pulse">Accessing Collections...</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-surface p-6 transition-all duration-700 hover:bg-surface/80"
              >
                <div className="flex gap-8">
                  <div className="w-28 aspect-[3/4] bg-background overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-1000">
                    <img src={product.image} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="space-y-2">
                      <span className="text-[8px] uppercase tracking-[0.4em] text-accent font-bold">{product.category}</span>
                      <h3 className="text-xl font-medium tracking-tight text-foreground lowercase">{product.name}</h3>
                      <p className="text-[10px] text-muted/40 uppercase tracking-[0.2em] font-medium">{product.material}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium tracking-tight">{product.price} MAD</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                          className="p-3 bg-foreground/5 hover:text-accent transition-colors"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-3 bg-foreground/5 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* CRUD Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative w-full max-w-5xl bg-background border border-border/50 h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="px-12 py-10 border-b border-border/20 flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <Package size={20} className="text-accent" />
                  <h2 className="text-3xl font-medium tracking-tightest lowercase">{editingProduct ? "Editer la pièce" : "Nouvelle Création"}</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-4 hover:rotate-90 transition-all duration-700 text-muted/40 hover:text-foreground">
                  <X size={24} />
                </button>
              </div>

              <form className="flex-1 overflow-y-auto p-12 space-y-16" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                  {/* Left Column: Media */}
                  <div className="space-y-10">
                    <div className="flex items-center gap-4 text-accent">
                      <Layers size={14} />
                      <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Atelier Imagery</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <AnimatePresence>
                        {imagePreviews.map((preview, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-[3/4] bg-surface group overflow-hidden"
                          >
                            <img src={preview} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            <button 
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-4 right-4 p-2 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash size={12} />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <label className="aspect-[3/4] border border-dashed border-border/50 hover:border-accent transition-all flex flex-col items-center justify-center gap-4 cursor-pointer bg-surface/50 group">
                        <Plus className="text-muted/40 group-hover:text-accent transition-colors" />
                        <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-muted/40">Upload Media</span>
                        <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Right Column: Fields */}
                  <div className="space-y-12">
                    <div className="space-y-8">
                       <div className="flex items-center gap-4 text-accent">
                        <Info size={14} />
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Piece Specifications</span>
                      </div>
                      
                      <div className="space-y-10">
                        <div className="group relative">
                          <label className="text-[8px] uppercase tracking-[0.4em] font-bold text-muted/40 mb-2 block">Name of Creation</label>
                          <input name="name" type="text" defaultValue={editingProduct?.name} className="w-full bg-transparent border-b border-border/50 py-4 outline-none focus:border-accent transition-all text-xl font-medium placeholder:text-muted/10" placeholder="e.g. Obsidian Sofa" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-12">
                          <div className="group relative">
                            <label className="text-[8px] uppercase tracking-[0.4em] font-bold text-muted/40 mb-2 block">Premium Price (MAD)</label>
                            <input name="price" type="text" defaultValue={editingProduct?.price} className="w-full bg-transparent border-b border-border/50 py-4 outline-none focus:border-accent transition-all text-lg" placeholder="25.000" />
                          </div>
                          <div className="group relative">
                            <label className="text-[8px] uppercase tracking-[0.4em] font-bold text-muted/40 mb-2 block">Primary Material</label>
                            <input name="material" type="text" defaultValue={editingProduct?.material} className="w-full bg-transparent border-b border-border/50 py-4 outline-none focus:border-accent transition-all text-lg" placeholder="e.g. Marble" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-12">
                          <div className="group relative">
                            <label className="text-[8px] uppercase tracking-[0.4em] font-bold text-muted/40 mb-2 block">Category</label>
                            <select name="category" value={selectedCategoryName} onChange={(e) => setSelectedCategoryName(e.target.value)} className="w-full bg-transparent border-b border-border/50 py-4 outline-none focus:border-accent transition-all text-sm appearance-none">
                              {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>
                          </div>
                          <div className="group relative">
                            <label className="text-[8px] uppercase tracking-[0.4em] font-bold text-muted/40 mb-2 block">Sub-Category</label>
                            <select name="sub_category" value={selectedSubCategoryName} onChange={(e) => setSelectedSubCategoryName(e.target.value)} className="w-full bg-transparent border-b border-border/50 py-4 outline-none focus:border-accent transition-all text-sm appearance-none">
                              <option value="">None</option>
                              {CATEGORIES.find(c => c.name === selectedCategoryName)?.subCategories.map(s => (
                                <option key={s.slug} value={s.name}>{s.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-4">
                           <label className="text-[8px] uppercase tracking-[0.4em] font-bold text-muted/40 block">Dimensions (L x P x H)</label>
                           <div className="flex gap-6">
                              <input type="text" value={dimL} onChange={(e) => setDimL(e.target.value)} className="w-20 bg-transparent border-b border-border/50 py-2 outline-none focus:border-accent transition-all text-center" placeholder="L" />
                              <input type="text" value={dimW} onChange={(e) => setDimW(e.target.value)} className="w-20 bg-transparent border-b border-border/50 py-2 outline-none focus:border-accent transition-all text-center" placeholder="P" />
                              <input type="text" value={dimH} onChange={(e) => setDimH(e.target.value)} className="w-20 bg-transparent border-b border-border/50 py-2 outline-none focus:border-accent transition-all text-center" placeholder="H" />
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="text-[8px] uppercase tracking-[0.4em] font-bold text-muted/40 ml-1">Editorial Description</label>
                  <textarea name="description" rows={5} defaultValue={editingProduct?.description} className="w-full bg-surface/50 border border-border/20 p-8 outline-none focus:border-accent transition-all font-light text-sm leading-relaxed" placeholder="Narrate the story of this creation..." />
                </div>

                <div className="pt-12 flex gap-8">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 text-[9px] uppercase tracking-[0.5em] font-bold text-muted/40 hover:text-foreground transition-colors">Cancel</button>
                  <button type="submit" disabled={loading} className="group relative flex-[2] flex items-center justify-center gap-8 overflow-hidden rounded-full border border-border bg-foreground/5 px-16 py-7 transition-all hover:border-accent/50">
                    <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.5em]">
                      {loading ? "Processing..." : (editingProduct ? "Update Creation" : "Publish to Gallery")}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-[6] transition-transform duration-1000 ease-expo" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
