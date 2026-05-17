'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/products';
import { ChevronRight, ChevronUp, MessageCircle } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TrendingSection from '@/components/sections/TrendingSection';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isDescOpen, setIsDescOpen] = useState(true);
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
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="h-10 w-10 border-t-2 border-black rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-serif text-gray-500">Produit introuvable.</h2>
        <Link href="/shop" className="text-sm font-bold uppercase border-b border-black pb-1">
          Retour au Catalogue
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const discount = product.discount || '24';
  const oldPrice = product.oldPrice || (Number(product.price) * 1.25).toFixed(0);

  return (
    <main className="min-h-screen bg-white font-sans text-black">
      <Navbar />
      <div className="pt-[100px] md:pt-[128px]"></div>
      
      <div className="container-wide mx-auto px-4 md:px-8 py-4 md:py-12">
        {/* Breadcrumb - Refined */}
        <nav className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-8 md:mb-12">
          <Link href="/" className="hover:text-black transition-colors">Accueil</Link>
          <ChevronRight size={10} className="text-gray-300" />
          <Link href={`/categories/${product.category?.toLowerCase()}`} className="hover:text-black transition-colors">{product.category}</Link>
          <ChevronRight size={10} className="text-gray-300" />
          <span className="text-black truncate max-w-[150px] md:max-w-none">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24">
          {/* Left: Gallery (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/3] md:aspect-[1.2/1] bg-[#f9f9f9] overflow-hidden group"
            >
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                className="object-contain p-4 md:p-12 transition-transform duration-700 group-hover:scale-105"
                priority
              />
              
              {/* Badge */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="bg-[#d11124] text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase shadow-xl">
                  Promotion -{discount}%
                </span>
                {product.isNew && (
                  <span className="bg-black text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase shadow-xl">
                    Nouveauté
                  </span>
                )}
              </div>
            </motion.div>
            
            {/* Thumbnails - Horizontal Scroll on Mobile, Grid on Desktop */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {images.map((img, i) => (
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-shrink-0 w-20 md:w-28 aspect-square transition-all duration-300 ${
                      activeImage === i ? 'ring-1 ring-black p-1' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="w-full h-full bg-[#f9f9f9] relative">
                      <Image src={img} alt="" fill className="object-contain p-2" />
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#d11124]">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.1] mb-6">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-10 pb-8 border-b border-gray-100">
                <span className="text-3xl font-medium tracking-tight">
                  {Number(product.price).toLocaleString('fr-FR')} <span className="text-lg">DH</span>
                </span>
                <span className="text-xl line-through text-gray-300 font-light italic">
                  {Number(oldPrice).toLocaleString('fr-FR')} DH
                </span>
              </div>

              {/* Purchase Section */}
              <div className="space-y-6 mb-12">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-gray-200 h-[56px] w-full sm:w-auto">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-14 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-lg"
                    >
                      -
                    </button>
                    <div className="w-14 h-full flex items-center justify-center font-medium border-x border-gray-200">
                      {quantity}
                    </div>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-14 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button 
                    onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); }}
                    className="flex-1 bg-[#2a2a2a] hover:bg-black text-white h-[56px] font-bold text-[11px] uppercase tracking-[0.3em] transition-all duration-300 shadow-lg shadow-black/5"
                  >
                    AJOUTER AU PANIER
                  </button>
                </div>

                {/* WhatsApp Premium Integration */}
                <button className="w-full bg-[#25d366] hover:bg-[#128c7e] text-white p-4 flex items-center justify-center gap-4 transition-all duration-300 group rounded-sm">
                  <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">COMMANDER VIA WHATSAPP</span>
                </button>
              </div>

              {/* Product Info Accordion */}
              <div className="border-t border-gray-100">
                <div className="py-6">
                  <button 
                    onClick={() => setIsDescOpen(!isDescOpen)}
                    className="w-full flex items-center justify-between group"
                  >
                    <span className="font-bold text-[11px] uppercase tracking-[0.3em]">DESCRIPTION DU PRODUIT</span>
                    <div className={`transition-transform duration-500 ${!isDescOpen ? 'rotate-180' : ''}`}>
                      <ChevronUp size={16} />
                    </div>
                  </button>
                  <motion.div 
                    initial={false}
                    animate={{ height: isDescOpen ? "auto" : 0, opacity: isDescOpen ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 text-[15px] font-light text-gray-500 leading-relaxed space-y-4">
                      <p className="font-medium text-black italic">Excellence et durabilité pour votre espace</p>
                      <p>
                        {product.description || `La collection ${product.name} incarne une alliance parfaite entre modernité et durabilité. Conçue pour résister aux éléments tout en conservant une esthétique minimaliste et luxueuse, elle s'intègre harmonieusement dans les intérieurs comme les extérieurs les plus exigeants.`}
                      </p>
                      <ul className="space-y-2 pt-4">
                        <li className="flex items-center gap-3">
                          <div className="w-1 h-1 bg-black rounded-full" />
                          <span className="text-[13px] uppercase tracking-wider text-black font-medium">Structure:</span> 
                          <span className="text-[13px]">Aluminium haute densité & Bois de hêtre massif</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-1 h-1 bg-black rounded-full" />
                          <span className="text-[13px] uppercase tracking-wider text-black font-medium">Textile:</span> 
                          <span className="text-[13px]">Revêtement antitaches déperlant</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-1 h-1 bg-black rounded-full" />
                          <span className="text-[13px] uppercase tracking-wider text-black font-medium">Garantie:</span> 
                          <span className="text-[13px]">2 ans de sérénité absolue</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Brand Promise Labels */}
              <div className="grid grid-cols-2 gap-4 pt-12 border-t border-gray-100 mt-12">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Livraison</span>
                  <span className="text-[11px] font-medium">Sur tout le Maroc</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Paiement</span>
                  <span className="text-[11px] font-medium">À la livraison sécurisé</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <section className="border-t border-gray-100 bg-gray-50/50 py-20 mt-12">
        <div className="container-wide mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest text-center mb-12">
              Spécifications <span className="font-medium italic">Techniques</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Catégorie</span>
                <span className="text-sm font-medium">{product.category || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Dimensions</span>
                <span className="text-sm font-medium">{product.dimensions || 'Sur mesure'}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Matériaux</span>
                <span className="text-sm font-medium">{product.material || 'Premium Mix'}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Garantie</span>
                <span className="text-sm font-medium">{product.warranty || '2 Ans'}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200 md:col-span-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Délai de Livraison</span>
                <span className="text-sm font-medium">{product.deliveryTime || '10 à 15 jours ouvrables'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <div className="pt-20 pb-10 text-center">
        <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest">
          Vous aimerez <span className="font-medium italic">aussi</span>
        </h3>
      </div>
      <TrendingSection />
      
    </main>
  );
}
