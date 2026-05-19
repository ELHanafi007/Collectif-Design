"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/lib/products";
import { Category, SubCategory } from "@/lib/categories";
import { 
  Plus, Search, Edit3, Trash2, X, Package, Layers, Info, 
  Tag, Image as ImageIcon, Sparkles, ArrowUpRight, 
  HelpCircle, Trash, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

// Helper components for stats
function DashboardStats({ products, categories }: { products: Product[], categories: Category[] }) {
  const totalProducts = products.length;
  const totalCategories = categories.length;

  const stats = [
    { name: "Total Produits", value: totalProducts, icon: Package, desc: "Créations publiées au catalogue" },
    { name: "Total Catégories", value: totalCategories, icon: Layers, desc: "Collections de prestige enregistrées" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#151717] border border-[#2C2A29] p-6 md:p-8 rounded-sm relative overflow-hidden group hover:border-[#CA8A04]/30 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#CA8A04]/2 rounded-full blur-3xl pointer-events-none group-hover:bg-[#CA8A04]/5 transition-all duration-700" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full border border-[#2C2A29] flex items-center justify-center text-[#CA8A04] group-hover:scale-105 transition-transform duration-500">
              <stat.icon size={16} />
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/50">{stat.name}</span>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-medium tracking-tight text-[#F5F1EB] font-serif">{stat.value}</p>
            <p className="text-[9px] text-[#a8a29e]/40 uppercase tracking-wider">{stat.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Inner component to wrap around search params
function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Tab state powered by searchParams
  const activeTab = searchParams.get("tab") === "categories" ? "categories" : "products";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Product Form states
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productImageFiles, setProductImageFiles] = useState<File[]>([]);
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const [selectedProductSubCategory, setSelectedProductSubCategory] = useState("");
  const [dimL, setDimL] = useState("");
  const [dimW, setDimW] = useState("");
  const [dimH, setDimH] = useState("");
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  // Category Form states
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [categorySubtitle, setCategorySubtitle] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null);
  const [subCategoriesInput, setSubCategoriesInput] = useState<string>("");
  const [isSavingCategory, setIsSavingCategory] = useState(false);

  // Fetch functions
  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch("/api/admin/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data || []);
      } else {
        console.error("Failed to load categories");
      }
    } catch (err) {
      console.error("Error loading categories API:", err);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Set initial product form state on edit
  useEffect(() => {
    if (editingProduct) {
      const dimStr = editingProduct.dimensions || "";
      const l = dimStr.match(/L(\d+)/)?.[1] || "";
      const w = dimStr.match(/[Pp](\d+)/)?.[1] || "";
      const h = dimStr.match(/[Hh](\d+)/)?.[1] || "";
      setDimL(l);
      setDimW(w);
      setDimH(h);
      
      setProductImages(editingProduct.images || [editingProduct.image]);
      setProductImageFiles([]);
      setSelectedProductCategory(editingProduct.category);
      setSelectedProductSubCategory(editingProduct.sub_category);
    } else {
      setDimL("");
      setDimW("");
      setDimH("");
      setProductImages([]);
      setProductImageFiles([]);
      setSelectedProductCategory(categories[0]?.name || "");
      setSelectedProductSubCategory("");
    }
  }, [editingProduct, isProductModalOpen, categories]);

  // Set initial category form state on edit
  useEffect(() => {
    if (editingCategory) {
      setCategoryName(editingCategory.name);
      setCategorySlug(editingCategory.slug);
      setCategoryIcon(editingCategory.icon);
      setCategorySubtitle(editingCategory.subtitle || "");
      setCategoryImage(editingCategory.image);
      setCategoryImageFile(null);
      setSubCategoriesInput(
        (editingCategory.subCategories || []).map(s => s.name).join(", ")
      );
    } else {
      setCategoryName("");
      setCategorySlug("");
      setCategoryIcon("🛋️");
      setCategorySubtitle("");
      setCategoryImage("");
      setCategoryImageFile(null);
      setSubCategoriesInput("");
    }
  }, [editingCategory, isCategoryModalOpen]);

  // Auto-slugify category name
  const handleCategoryNameChange = (val: string) => {
    setCategoryName(val);
    if (!editingCategory) {
      const slug = val
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setCategorySlug(slug);
    }
  };

  // Image Upload helper
  const uploadImageToSupabase = async (file: File): Promise<string> => {
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

  // Product Image actions
  const handleProductImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setProductImageFiles(prev => [...prev, ...files]);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeProductImage = (index: number) => {
    const isFile = index >= (productImages.length - productImageFiles.length);
    if (isFile) {
      const fileIndex = index - (productImages.length - productImageFiles.length);
      setProductImageFiles(prev => prev.filter((_, i) => i !== fileIndex));
    }
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  // Product Submit
  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSavingProduct(true);
    const formData = new FormData(e.currentTarget);

    try {
      const existingUrls = productImages
        .filter(url => !url.startsWith("data:"))
        .map(url => url.trim());
      
      const newUrls = await Promise.all(
        productImageFiles.map(file => uploadImageToSupabase(file))
      );

      const finalUrls = [...existingUrls, ...newUrls];

      if (finalUrls.length === 0) {
        alert("Veuillez charger au moins une image.");
        setIsSavingProduct(false);
        return;
      }

      const dimensionsStr = dimL || dimW || dimH 
        ? `L${dimL} x P${dimW} x H${dimH} cm` 
        : "";

      const productData = {
        name: String(formData.get("name") || ""),
        price: String(formData.get("price") || ""),
        category: String(formData.get("category") || ""),
        sub_category: String(formData.get("sub_category") || ""),
        material: String(formData.get("material") || ""),
        dimensions: dimensionsStr,
        image: finalUrls[0],
        images: finalUrls,
        description: String(formData.get("description") || ""),
        inStock: true
      };

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("products")
          .insert([productData]);
        if (error) throw error;
      }

      setIsProductModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      console.error("Product save error:", err);
      alert("Erreur lors de la sauvegarde : " + err.message);
    } finally {
      setIsSavingProduct(false);
    }
  };

  // Product Delete
  const handleProductDelete = async (id: string) => {
    if (confirm("Voulez-vous supprimer cette pièce du catalogue ?")) {
      try {
        const { error } = await supabase.from("products").delete().eq("id", id);
        if (error) throw error;
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (err: any) {
        alert("Erreur lors de la suppression: " + err.message);
      }
    }
  };

  // Category Submit
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      alert("Le nom de la catégorie est obligatoire.");
      return;
    }
    
    setIsSavingCategory(true);

    try {
      let bannerUrl = categoryImage;
      if (categoryImageFile) {
        bannerUrl = await uploadImageToSupabase(categoryImageFile);
      }

      const subCategories: SubCategory[] = subCategoriesInput
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => ({
          name: s,
          slug: s.toLowerCase()
                 .normalize("NFD")
                 .replace(/[\u0300-\u036f]/g, "")
                 .replace(/[^a-z0-9\s-]/g, "")
                 .trim()
                 .replace(/\s+/g, "-")
        }));

      const newCategory: Category = {
        id: editingCategory?.id || categorySlug || categoryName.toLowerCase().replace(/\s+/g, "-"),
        name: categoryName,
        slug: categorySlug || editingCategory?.slug || categoryName.toLowerCase().replace(/\s+/g, "-"),
        icon: categoryIcon || "🛋️",
        subtitle: categorySubtitle,
        image: bannerUrl || "/hero.jpeg",
        subCategories
      };

      let updatedCategories: Category[] = [];
      if (editingCategory) {
        updatedCategories = categories.map(c => c.id === editingCategory.id ? newCategory : c);
      } else {
        if (categories.some(c => c.id === newCategory.id || c.slug === newCategory.slug)) {
          alert("Une catégorie avec le même slug ou identifiant existe déjà.");
          setIsSavingCategory(false);
          return;
        }
        updatedCategories = [...categories, newCategory];
      }

      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategories)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save category on server");
      }

      setCategories(updatedCategories);
      setIsCategoryModalOpen(false);
    } catch (err: any) {
      console.error("Category save error:", err);
      alert("Erreur lors de l'enregistrement de la catégorie: " + err.message);
    } finally {
      setIsSavingCategory(false);
    }
  };

  // Category Delete
  const handleCategoryDelete = async (id: string) => {
    const categoryName = categories.find(c => c.id === id)?.name || "cette catégorie";
    if (confirm(`Voulez-vous supprimer définitivement la catégorie "${categoryName}" ? Tous les produits associés perdront leur liaison.`)) {
      try {
        const updatedCategories = categories.filter(c => c.id !== id);

        const res = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCategories)
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to delete category on server");
        }

        setCategories(updatedCategories);
      } catch (err: any) {
        alert("Erreur lors de la suppression: " + err.message);
      }
    }
  };

  const handleAddNewCategoryInline = async (name: string) => {
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    if (categories.some(c => c.name.toLowerCase() === name.toLowerCase() || c.slug === slug)) {
      alert("Cette catégorie existe déjà.");
      return;
    }

    const newCategory: Category = {
      id: slug,
      name,
      slug,
      icon: "🛋️",
      subtitle: "",
      image: "/hero.jpeg",
      subCategories: []
    };

    const updatedCategories = [...categories, newCategory];

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategories)
      });

      if (!res.ok) {
        throw new Error("Failed to save category");
      }

      setCategories(updatedCategories);
      setSelectedProductCategory(name);
      setSelectedProductSubCategory("");
      alert(`Catégorie "${name}" créée et sélectionnée.`);
    } catch (err: any) {
      alert("Erreur lors de la création de la catégorie : " + err.message);
    }
  };

  // Filtered lists
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.material.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryFilter === "all" || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabChange = (tab: "products" | "categories") => {
    setSearchQuery("");
    setSelectedCategoryFilter("all");
    router.push(`/admin/dashboard?tab=${tab}`);
  };

  return (
    <div className="space-y-12 bg-[#0E0F0F] text-[#F5F1EB]">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2C2A29] pb-8">
        <div>
          <span className="text-[#CA8A04] uppercase tracking-[0.6em] text-[9px] font-bold block mb-3">
            Atelier Control Console
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#F5F1EB] font-medium tracking-tight">
            Console de <span className="italic font-light text-[#CA8A04]">Gestion</span>
          </h1>
          <p className="text-[10px] text-[#a8a29e]/40 uppercase tracking-widest mt-2">
            Mise à jour et curation dynamique de la boutique Collectif Design
          </p>
        </div>
        
        <div className="flex gap-4">
          {activeTab === "products" ? (
            <button 
              onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }}
              className="group relative flex items-center gap-4 overflow-hidden rounded-full border border-[#CA8A04]/25 bg-[#CA8A04]/10 hover:border-[#CA8A04] px-6 py-3.5 transition-all text-[#CA8A04] hover:text-[#0E0F0F] duration-500 cursor-pointer"
            >
              <Plus size={14} />
              <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.4em]">Nouvelle Pièce</span>
              <div className="absolute inset-0 bg-[#CA8A04] translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
            </button>
          ) : (
            <button 
              onClick={() => { setEditingCategory(null); setIsCategoryModalOpen(true); }}
              className="group relative flex items-center gap-4 overflow-hidden rounded-full border border-[#CA8A04]/25 bg-[#CA8A04]/10 hover:border-[#CA8A04] px-6 py-3.5 transition-all text-[#CA8A04] hover:text-[#0E0F0F] duration-500 cursor-pointer"
            >
              <Plus size={14} />
              <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.4em]">Nouvelle Collection</span>
              <div className="absolute inset-0 bg-[#CA8A04] translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
            </button>
          )}
        </div>
      </header>

      {/* Stats Area (Simplified - Only Products and Categories) */}
      <DashboardStats products={products} categories={categories} />

      {/* Tabs Menu */}
      <div className="flex justify-between items-center border-b border-[#2C2A29]">
        <div className="flex gap-8">
          <button 
            onClick={() => handleTabChange("products")}
            className={cn(
              "relative pb-4 text-[10px] font-bold uppercase tracking-[0.4em] transition-colors duration-500 cursor-pointer",
              activeTab === "products" ? "text-[#F5F1EB]" : "text-[#F5F1EB]/30 hover:text-[#F5F1EB]"
            )}
          >
            Pièces & Produits
            {activeTab === "products" && (
              <motion.div layoutId="dashboardTabLine" className="absolute bottom-0 left-0 h-[2px] w-full bg-[#CA8A04]" />
            )}
          </button>
          <button 
            onClick={() => handleTabChange("categories")}
            className={cn(
              "relative pb-4 text-[10px] font-bold uppercase tracking-[0.4em] transition-colors duration-500 cursor-pointer",
              activeTab === "categories" ? "text-[#F5F1EB]" : "text-[#F5F1EB]/30 hover:text-[#F5F1EB]"
            )}
          >
            Collections & Catégories
            {activeTab === "categories" && (
              <motion.div layoutId="dashboardTabLine" className="absolute bottom-0 left-0 h-[2px] w-full bg-[#CA8A04]" />
            )}
          </button>
        </div>
      </div>

      {/* Searching Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
        <div className="relative flex-1 group">
          <input 
            type="text" 
            placeholder={activeTab === "products" ? "Rechercher une création (nom, matériau, catégorie)..." : "Rechercher une collection..."}
            className="w-full bg-[#151717]/40 border-b border-[#2C2A29] py-4 px-10 outline-none focus:border-[#CA8A04]/60 transition-all duration-500 text-xs tracking-wider font-light placeholder:text-[#a8a29e]/20 text-[#F5F1EB]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#a8a29e]/25 group-focus-within:text-[#CA8A04] transition-colors" />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#a8a29e]/30 hover:text-[#F5F1EB]">
              <X size={14} />
            </button>
          )}
        </div>

        {activeTab === "products" && (
          <div className="w-full md:w-56 border-b border-[#2C2A29] bg-transparent flex items-center">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full bg-transparent py-4 text-xs tracking-wider outline-none text-[#a8a29e] border-none cursor-pointer appearance-none px-2"
            >
              <option value="all" className="bg-[#121414] text-[#F5F1EB]">Toutes les collections</option>
              {categories.map(c => (
                <option key={c.id} value={c.name} className="bg-[#121414] text-[#F5F1EB]">{c.name}</option>
              ))}
            </select>
            <Layers size={14} className="text-[#a8a29e]/30 mr-2 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Main Catalog View */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {/* Products List */}
          {activeTab === "products" && (
            <motion.div
              key="products-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {loadingProducts ? (
                <div className="py-32 flex flex-col items-center justify-center gap-6">
                  <div className="h-12 w-[1px] bg-[#2C2A29] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#CA8A04] animate-pulse" />
                  </div>
                  <p className="text-[8px] uppercase tracking-[0.8em] text-[#a8a29e]/30 animate-pulse">Chargement de la galerie...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-[#151717]/40 border border-[#2C2A29] hover:border-[#CA8A04]/30 p-5 transition-all duration-500 rounded-sm flex flex-col justify-between"
                    >
                      <div className="flex gap-6">
                        {/* Image */}
                        <div className="w-20 aspect-[3/4] bg-[#0E0F0F] border border-[#2C2A29] overflow-hidden relative shrink-0 grayscale group-hover:grayscale-0 transition-all duration-700">
                          <img 
                            src={product.image || "/hero.jpeg"} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                            onError={(e) => { (e.target as HTMLImageElement).src = "/hero.jpeg"; }}
                          />
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0 space-y-1.5 py-1">
                          <span className="text-[8px] uppercase tracking-[0.3em] text-[#CA8A04] font-bold block truncate">
                            {product.category} {product.sub_category ? `• ${product.sub_category}` : ""}
                          </span>
                          <h3 className="text-base font-serif font-medium text-[#F5F1EB] truncate">{product.name}</h3>
                          <p className="text-[10px] text-[#a8a29e] uppercase tracking-widest truncate">{product.material}</p>
                          <p className="text-xs font-mono font-medium text-[#F5F1EB] mt-2">{Number(product.price).toLocaleString()} MAD</p>
                          {product.dimensions && (
                            <p className="text-[9px] text-[#a8a29e]/40 font-mono tracking-tighter mt-1">{product.dimensions}</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex justify-end gap-2 border-t border-[#2C2A29]/30 mt-4 pt-3">
                        <button 
                          onClick={() => { setEditingProduct(product); setIsProductModalOpen(true); }}
                          className="p-2 border border-[#2C2A29] hover:border-[#CA8A04]/40 text-[#a8a29e] hover:text-[#CA8A04] transition-all duration-300 rounded-full cursor-pointer"
                          title="Modifier la création"
                        >
                          <Edit3 size={12} />
                        </button>
                        <button 
                          onClick={() => handleProductDelete(product.id)}
                          className="p-2 border border-[#2C2A29] hover:border-red-500/40 text-[#a8a29e] hover:text-red-400 transition-all duration-300 rounded-full cursor-pointer"
                          title="Supprimer la création"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-24 border border-dashed border-[#2C2A29] rounded-sm text-center">
                  <Package className="mx-auto text-[#a8a29e]/10 mb-4" size={32} />
                  <p className="text-xs uppercase tracking-widest text-[#a8a29e]/30">Aucun produit ne correspond à vos filtres.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Categories List */}
          {activeTab === "categories" && (
            <motion.div
              key="categories-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {loadingCategories ? (
                <div className="py-32 flex flex-col items-center justify-center gap-6">
                  <div className="h-12 w-[1px] bg-[#2C2A29] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#CA8A04] animate-pulse" />
                  </div>
                  <p className="text-[8px] uppercase tracking-[0.8em] text-[#a8a29e]/30 animate-pulse">Chargement des collections...</p>
                </div>
              ) : filteredCategories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className="group bg-[#151717]/40 border border-[#2C2A29] hover:border-[#CA8A04]/30 p-6 transition-all duration-500 rounded-sm flex flex-col justify-between relative"
                    >
                      <div className="flex gap-6">
                        {/* Banner Image Preview */}
                        <div className="w-24 aspect-square bg-[#0E0F0F] border border-[#2C2A29] overflow-hidden relative shrink-0 grayscale group-hover:grayscale-0 transition-all duration-700">
                          <img 
                            src={category.image || "/hero.jpeg"} 
                            alt={category.name} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                            onError={(e) => { (e.target as HTMLImageElement).src = "/hero.jpeg"; }}
                          />
                          <div className="absolute bottom-2 left-2 bg-[#121414]/90 backdrop-blur-md w-7 h-7 flex items-center justify-center rounded-full text-sm border border-[#2C2A29]">
                            {category.icon || "🏺"}
                          </div>
                        </div>
                        
                        {/* Meta */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-serif font-medium text-[#F5F1EB] truncate">{category.name}</h3>
                          </div>
                          <p className="text-[10px] text-[#CA8A04] uppercase tracking-widest font-mono truncate">{category.slug}</p>
                          {category.subtitle && (
                            <p className="text-xs text-[#a8a29e]/40 font-light italic truncate">&ldquo;{category.subtitle}&rdquo;</p>
                          )}
                          
                          {/* Subcategories pill list */}
                          <div className="pt-2">
                            <span className="text-[8px] uppercase tracking-wider text-[#a8a29e]/30 block mb-1 font-bold">Sous-catégories :</span>
                            <div className="flex flex-wrap gap-1.5">
                              {category.subCategories && category.subCategories.length > 0 ? (
                                category.subCategories.map(sub => (
                                  <span 
                                    key={sub.slug} 
                                    className="text-[9px] bg-[#0E0F0F] border border-[#2C2A29] px-2 py-0.5 rounded-full text-[#a8a29e]"
                                  >
                                    {sub.name}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[9px] text-[#a8a29e]/20 italic">Aucune sous-catégorie</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex justify-between items-center border-t border-[#2C2A29]/30 mt-6 pt-4">
                        <span className="text-[8px] text-[#a8a29e]/20 uppercase tracking-widest">
                          ID: {category.id}
                        </span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => { setEditingCategory(category); setIsCategoryModalOpen(true); }}
                            className="p-2 border border-[#2C2A29] hover:border-[#CA8A04]/40 text-[#a8a29e] hover:text-[#CA8A04] transition-all duration-300 rounded-full cursor-pointer"
                            title="Modifier la collection"
                          >
                            <Edit3 size={12} />
                          </button>
                          <button 
                            onClick={() => handleCategoryDelete(category.id)}
                            className="p-2 border border-[#2C2A29] hover:border-red-500/40 text-[#a8a29e] hover:text-red-400 transition-all duration-300 rounded-full cursor-pointer"
                            title="Supprimer la collection"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-24 border border-dashed border-[#2C2A29] rounded-sm text-center">
                  <Layers className="mx-auto text-[#a8a29e]/10 mb-4" size={32} />
                  <p className="text-xs uppercase tracking-widest text-[#a8a29e]/30">Aucune collection ne correspond à votre recherche.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MODAL 1: PRODUCT ADD/EDIT MODAL */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProductModalOpen(false)}
              className="absolute inset-0 bg-[#0E0F0F]/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="relative w-full max-w-4xl bg-[#121414] border border-[#2C2A29] h-[85vh] overflow-hidden flex flex-col rounded-sm shadow-2xl"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-[#2C2A29] flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                  <Package size={18} className="text-[#CA8A04]" />
                  <h2 className="text-2xl font-serif font-medium tracking-tight text-[#F5F1EB] lowercase">
                    {editingProduct ? "Editer la création" : "Nouvelle Création"}
                  </h2>
                </div>
                <button onClick={() => setIsProductModalOpen(false)} className="p-2 text-[#a8a29e]/40 hover:text-[#F5F1EB] hover:rotate-90 transition-all duration-500 cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <form className="flex-1 overflow-y-auto p-8 space-y-12" onSubmit={handleProductSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  
                  {/* Left Column: Images */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-[#CA8A04] border-b border-[#2C2A29]/30 pb-2">
                      <ImageIcon size={14} />
                      <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Imagerie de l'Atelier</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <AnimatePresence>
                        {productImages.map((preview, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative aspect-[3/4] bg-[#0E0F0F] group overflow-hidden border border-[#2C2A29]"
                          >
                            <img src={preview} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            <button 
                              type="button"
                              onClick={() => removeProductImage(index)}
                              className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-600 text-[#F5F1EB] rounded-full transition-colors opacity-0 group-hover:opacity-100 duration-300 cursor-pointer"
                            >
                              <Trash size={10} />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      <label className="aspect-[3/4] border border-dashed border-[#2C2A29] hover:border-[#CA8A04]/40 bg-[#151717]/10 hover:bg-[#151717]/20 transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer group">
                        <Plus className="text-[#a8a29e]/30 group-hover:text-[#CA8A04] transition-colors" size={18} />
                        <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/40">Ajouter Média</span>
                        <input type="file" accept="image/*" multiple onChange={handleProductImagesChange} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Right Column: Fields */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3 text-[#CA8A04] border-b border-[#2C2A29]/30 pb-2">
                      <Info size={14} />
                      <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Spécifications</span>
                    </div>

                    <div className="space-y-6">
                      {/* Name */}
                      <div className="group relative border-b border-[#2C2A29] focus-within:border-[#CA8A04] transition-colors duration-500 pb-2">
                        <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/30 mb-1 block">Nom de l'œuvre</label>
                        <input 
                          required
                          name="name" 
                          type="text" 
                          defaultValue={editingProduct?.name} 
                          className="w-full bg-transparent outline-none text-base font-serif text-[#F5F1EB] font-medium" 
                          placeholder="Ex: Canapé ATLAS" 
                        />
                      </div>

                      {/* Price & Material */}
                      <div className="grid grid-cols-2 gap-8">
                        <div className="group relative border-b border-[#2C2A29] focus-within:border-[#CA8A04] transition-colors duration-500 pb-2">
                          <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/30 mb-1 block">Prix Prestige (MAD)</label>
                          <input 
                            required
                            name="price" 
                            type="number" 
                            defaultValue={editingProduct?.price} 
                            className="w-full bg-transparent outline-none text-sm font-mono text-[#F5F1EB]" 
                            placeholder="12500" 
                          />
                        </div>
                        
                        <div className="group relative border-b border-[#2C2A29] focus-within:border-[#CA8A04] transition-colors duration-500 pb-2">
                          <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/30 mb-1 block">Matériau Principal</label>
                          <input 
                            required
                            name="material" 
                            type="text" 
                            defaultValue={editingProduct?.material} 
                            className="w-full bg-transparent outline-none text-sm text-[#F5F1EB]" 
                            placeholder="Ex: Marbre de Carrare" 
                          />
                        </div>
                      </div>

                      {/* Categories selections */}
                      <div className="grid grid-cols-2 gap-8">
                        <div className="group relative border-b border-[#2C2A29] focus-within:border-[#CA8A04] transition-colors duration-500 pb-2">
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/30">Collection / Catégorie</label>
                            <button
                              type="button"
                              onClick={() => {
                                const name = prompt("Entrez le nom de la nouvelle catégorie :");
                                if (name && name.trim()) {
                                  handleAddNewCategoryInline(name.trim());
                                }
                              }}
                              className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#CA8A04] hover:text-[#F5F1EB] transition-colors cursor-pointer"
                            >
                              + Nouvelle
                            </button>
                          </div>
                          <select 
                            name="category" 
                            value={selectedProductCategory} 
                            onChange={(e) => {
                              setSelectedProductCategory(e.target.value);
                              setSelectedProductSubCategory("");
                            }} 
                            className="w-full bg-transparent outline-none text-xs text-[#F5F1EB] cursor-pointer appearance-none"
                          >
                            {categories.map(c => (
                              <option key={c.id} value={c.name} className="bg-[#121414] text-[#F5F1EB]">{c.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="group relative border-b border-[#2C2A29] focus-within:border-[#CA8A04] transition-colors duration-500 pb-2">
                          <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/30 mb-1 block">Sous-Catégorie</label>
                          <select 
                            name="sub_category" 
                            value={selectedProductSubCategory} 
                            onChange={(e) => setSelectedProductSubCategory(e.target.value)} 
                            className="w-full bg-transparent outline-none text-xs text-[#F5F1EB] cursor-pointer appearance-none"
                          >
                            <option value="" className="bg-[#121414] text-[#a8a29e]/30">Aucune (Par défaut)</option>
                            {categories
                              .find(c => c.name === selectedProductCategory)
                              ?.subCategories.map(sub => (
                                <option key={sub.slug} value={sub.name} className="bg-[#121414] text-[#F5F1EB]">{sub.name}</option>
                              ))}
                          </select>
                        </div>
                      </div>

                      {/* Dimensions */}
                      <div className="space-y-2">
                        <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/30 block">Dimensions (L x P x H en cm)</label>
                        <div className="flex gap-4">
                          <div className="flex-1 flex items-center border-b border-[#2C2A29] focus-within:border-[#CA8A04] pb-1">
                            <span className="text-[9px] text-[#a8a29e]/30 mr-2 uppercase">L :</span>
                            <input type="number" value={dimL} onChange={(e) => setDimL(e.target.value)} className="w-full bg-transparent outline-none text-xs text-center font-mono text-[#F5F1EB]" placeholder="Largeur" />
                          </div>
                          <div className="flex-1 flex items-center border-b border-[#2C2A29] focus-within:border-[#CA8A04] pb-1">
                            <span className="text-[9px] text-[#a8a29e]/30 mr-2 uppercase">P :</span>
                            <input type="number" value={dimW} onChange={(e) => setDimW(e.target.value)} className="w-full bg-transparent outline-none text-xs text-center font-mono text-[#F5F1EB]" placeholder="Prof" />
                          </div>
                          <div className="flex-1 flex items-center border-b border-[#2C2A29] focus-within:border-[#CA8A04] pb-1">
                            <span className="text-[9px] text-[#a8a29e]/30 mr-2 uppercase">H :</span>
                            <input type="number" value={dimH} onChange={(e) => setDimH(e.target.value)} className="w-full bg-transparent outline-none text-xs text-center font-mono text-[#F5F1EB]" placeholder="Haut" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/30 block ml-1">Description</label>
                  <textarea 
                    name="description" 
                    rows={4} 
                    required
                    defaultValue={editingProduct?.description} 
                    className="w-full bg-[#151717]/30 border border-[#2C2A29] p-5 outline-none focus:border-[#CA8A04]/45 transition-all font-light text-xs leading-relaxed text-[#F5F1EB] rounded-sm" 
                    placeholder="Histoire et détails de confection de la création..." 
                  />
                </div>

                {/* Footer Buttons */}
                <div className="pt-6 flex gap-4 shrink-0">
                  <button 
                    type="button" 
                    onClick={() => setIsProductModalOpen(false)} 
                    className="flex-1 text-[9px] uppercase tracking-[0.4em] font-bold text-[#a8a29e]/40 hover:text-[#F5F1EB] transition-colors py-4 rounded-full border border-[#2C2A29] cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSavingProduct}
                    className="group relative flex-[2] flex items-center justify-center gap-4 overflow-hidden rounded-full border border-[#CA8A04] bg-[#CA8A04]/10 py-4 transition-all text-[#CA8A04] hover:text-[#0E0F0F] duration-500 cursor-pointer"
                  >
                    <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.4em]">
                      {isSavingProduct ? "Sauvegarde..." : (editingProduct ? "Enregistrer les modifications" : "Publier au Catalogue")}
                    </span>
                    <div className="absolute inset-0 bg-[#CA8A04] translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: CATEGORY ADD/EDIT MODAL */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute inset-0 bg-[#0E0F0F]/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#121414] border border-[#2C2A29] h-[80vh] overflow-hidden flex flex-col rounded-sm shadow-2xl"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-[#2C2A29] flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                  <Layers size={18} className="text-[#CA8A04]" />
                  <h2 className="text-2xl font-serif font-medium tracking-tight text-[#F5F1EB] lowercase">
                    {editingCategory ? "Editer la collection" : "Nouvelle Collection"}
                  </h2>
                </div>
                <button onClick={() => setIsCategoryModalOpen(false)} className="p-2 text-[#a8a29e]/40 hover:text-[#F5F1EB] hover:rotate-90 transition-all duration-500 cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <form className="flex-1 overflow-y-auto p-8 space-y-10" onSubmit={handleCategorySubmit}>
                
                {/* Visual Identity */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[#CA8A04] border-b border-[#2C2A29]/30 pb-2">
                    <Sparkles size={14} />
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Identité de la collection</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Category Name */}
                    <div className="group relative border-b border-[#2C2A29] focus-within:border-[#CA8A04] transition-colors duration-500 pb-2">
                      <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/30 mb-1 block">Nom de la collection</label>
                      <input 
                        required
                        type="text" 
                        value={categoryName}
                        onChange={(e) => handleCategoryNameChange(e.target.value)}
                        className="w-full bg-transparent outline-none text-base font-serif text-[#F5F1EB] font-medium" 
                        placeholder="Ex: Salons de Prestige" 
                      />
                    </div>

                    {/* Category Slug */}
                    <div className="group relative border-b border-[#2C2A29] focus-within:border-[#CA8A04] transition-colors duration-500 pb-2">
                      <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/30 mb-1 block">Slug d'URL (Auto-généré)</label>
                      <input 
                        required
                        type="text" 
                        value={categorySlug}
                        onChange={(e) => setCategorySlug(e.target.value)}
                        className="w-full bg-transparent outline-none text-xs font-mono text-[#CA8A04]" 
                        placeholder="salons-de-prestige" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Category Subtitle */}
                    <div className="group relative border-b border-[#2C2A29] focus-within:border-[#CA8A04] transition-colors duration-500 pb-2">
                      <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/30 mb-1 block">Sous-titre éditorial</label>
                      <input 
                        type="text" 
                        value={categorySubtitle}
                        onChange={(e) => setCategorySubtitle(e.target.value)}
                        className="w-full bg-transparent outline-none text-xs text-[#F5F1EB]" 
                        placeholder="Ex: Confort Absolu" 
                      />
                    </div>

                    {/* Category Icon */}
                    <div className="group relative border-b border-[#2C2A29] focus-within:border-[#CA8A04] transition-colors duration-500 pb-2">
                      <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/30 mb-1 block">Émoji / Icone</label>
                      <input 
                        type="text" 
                        value={categoryIcon}
                        onChange={(e) => setCategoryIcon(e.target.value)}
                        className="w-full bg-transparent outline-none text-xs text-[#F5F1EB]" 
                        placeholder="Ex: 🛋️" 
                      />
                    </div>
                  </div>
                </div>

                {/* Banner Media */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[#CA8A04] border-b border-[#2C2A29]/30 pb-2">
                    <ImageIcon size={14} />
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Image de couverture</span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    {/* Preview box */}
                    <div className="w-24 h-24 border border-[#2C2A29] bg-[#151717]/30 flex items-center justify-center overflow-hidden shrink-0 relative">
                      {categoryImageFile || categoryImage ? (
                        <img 
                          src={categoryImageFile ? URL.createObjectURL(categoryImageFile) : categoryImage} 
                          alt="Cover preview" 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <HelpCircle size={20} className="text-[#a8a29e]/20" />
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex-1 space-y-4 w-full">
                      <div className="group relative border-b border-[#2C2A29] focus-within:border-[#CA8A04] transition-colors duration-500 pb-2">
                        <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/30 mb-1 block">URL de l'image (Existant)</label>
                        <input 
                          type="text" 
                          value={categoryImage}
                          onChange={(e) => setCategoryImage(e.target.value)}
                          className="w-full bg-transparent outline-none text-xs text-[#F5F1EB]" 
                          placeholder="/images/category.jpeg ou URL externe" 
                        />
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-[8px] uppercase tracking-widest text-[#a8a29e]/20 font-bold">Ou :</span>
                        <label className="border border-[#2C2A29] px-4 py-2 hover:bg-[#151717] rounded-full cursor-pointer text-[9px] font-bold uppercase tracking-widest text-[#CA8A04] hover:text-[#F5F1EB] transition-all duration-300">
                          Uploader un fichier
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                setCategoryImageFile(e.target.files[0]);
                              }
                            }} 
                            className="hidden" 
                          />
                        </label>
                        {categoryImageFile && (
                          <span className="text-[9px] text-[#CA8A04] font-bold truncate flex items-center gap-1">
                            <Check size={10} /> {categoryImageFile.name.substring(0, 15)}...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subcategories */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#CA8A04] border-b border-[#2C2A29]/30 pb-2">
                    <Tag size={14} />
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Sous-Catégories</span>
                  </div>
                  
                  <div className="group relative border-b border-[#2C2A29] focus-within:border-[#CA8A04] transition-colors duration-500 pb-2">
                    <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#a8a29e]/30 mb-1 block">Liste séparée par des virgules</label>
                    <input 
                      type="text" 
                      value={subCategoriesInput}
                      onChange={(e) => setSubCategoriesInput(e.target.value)}
                      className="w-full bg-transparent outline-none text-xs text-[#F5F1EB]" 
                      placeholder="Ex: Canapés, Fauteuils, Poufs" 
                    />
                  </div>
                  <p className="text-[8px] text-[#a8a29e]/30 uppercase tracking-widest mt-1">
                    Les slugs d'URL des sous-catégories seront calculés automatiquement.
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 flex gap-4 shrink-0">
                  <button 
                    type="button" 
                    onClick={() => setIsCategoryModalOpen(false)} 
                    className="flex-1 text-[9px] uppercase tracking-[0.4em] font-bold text-[#a8a29e]/40 hover:text-[#F5F1EB] transition-colors py-4 rounded-full border border-[#2C2A29] cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSavingCategory}
                    className="group relative flex-[2] flex items-center justify-center gap-4 overflow-hidden rounded-full border border-[#CA8A04] bg-[#CA8A04]/10 py-4 transition-all text-[#CA8A04] hover:text-[#0E0F0F] duration-500 cursor-pointer"
                  >
                    <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.4em]">
                      {isSavingCategory ? "Enregistrement..." : (editingCategory ? "Mettre à jour la collection" : "Publier la collection")}
                    </span>
                    <div className="absolute inset-0 bg-[#CA8A04] translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
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

// Wrapper for Suspense (required by next.js useSearchParams in static builds)
export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-8 bg-[#0E0F0F] text-[#F5F1EB]">
        <div className="h-16 w-[1px] bg-[#2C2A29] relative overflow-hidden">
          <div className="absolute inset-0 bg-[#CA8A04] animate-pulse" />
        </div>
        <p className="text-[9px] uppercase tracking-[0.8em] text-[#a8a29e]/40 animate-pulse">Initialisation du Dashboard...</p>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
