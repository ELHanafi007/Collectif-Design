'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Product, PRODUCTS } from '@/lib/products';
import { ChevronRight, ChevronDown, MessageCircle, Truck, ShieldCheck, Package, Heart, Share2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';
import { CONTACT_INFO } from '@/data/contact';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import TrendingSection from '@/components/sections/TrendingSection';

import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';

/* ─── Easing ─── */
const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Animation Orchestration ─── */
const stagger = {
  parent: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  },
  child: {
    hidden: { opacity: 0, y: 24 },
    show: { 
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease }
    }
  }
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.02 },
  show: { 
    opacity: 1, scale: 1,
    transition: { duration: 1.2, ease }
  }
};

/* ─── Accordion Item ─── */
function AccordionItem({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 group cursor-pointer"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
          {title}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <ChevronDown size={14} className="text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ─── */
const mockPromoPacks: Record<string, Product> = {
  "pack-chambre-exclusive": {
    id: "pack-chambre-exclusive",
    name: "Pack Chambre Exclusive",
    price: "25000",
    old_price: "32000",
    discount: 22,
    image: "/tablesdechevet.jpeg",
    images: ["/tablesdechevet.jpeg", "/hero.jpeg"],
    category: "Packs Promo",
    sub_category: "Chambre",
    material: "Bois chêne massif, Velours italien premium",
    description: "Le Pack Chambre Exclusive est composé de : 1x Lit King Size, 2x Tables de Chevet assorties, 1x Commode 6 tiroirs et 1x Miroir Mural. Conçu pour apporter élégance et confort absolu à votre suite parentale.",
    dimensions: "Lit: L200 x H140 x P210 cm",
    in_stock: true
  },
  "pack-salon-exclusive": {
    id: "pack-salon-exclusive",
    name: "Pack Salon Exclusive",
    price: "18500",
    old_price: "24000",
    discount: 23,
    image: "/salon.jpeg",
    images: ["/salon.jpeg", "/tabledebasse.jpeg"],
    category: "Packs Promo",
    sub_category: "Salon",
    material: "Tissu bouclé premium, Structure acier doré",
    description: "Le Pack Salon Exclusive comprend : 1x Canapé 3 Places grand confort, 1x Table Basse ATLAS, 1x Meuble TV suspendu et 2x Tables d'Appoint Sonata. Un équilibre parfait entre modernité marocaine et finitions d'atelier.",
    dimensions: "Canapé: L230 x P95 x H80 cm",
    in_stock: true
  },
  "pack-salle-a-manger-exclusive": {
    id: "pack-salle-a-manger-exclusive",
    name: "Pack Salle à Manger",
    price: "15000",
    old_price: "19500",
    discount: 23,
    image: "/table a manger.jpeg",
    images: ["/table a manger.jpeg", "/decoration.jpeg"],
    category: "Packs Promo",
    sub_category: "Salle à manger",
    material: "Marbre naturel blanc Calacatta, Chêne teinté",
    description: "Le Pack Salle à Manger comprend : 1x Table à Manger 6 Places avec plateau en marbre, 6x Chaises design ergonomiques et 1x Buffet de rangement PYRAMIDES. Idéal pour des dîners prestigieux.",
    dimensions: "Table: L200 x P100 x H75 cm",
    in_stock: true
  }
};

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const slugStr = slug as string;
        
        // Try Supabase first
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', slug)
            .single();
          if (!error && data) {
            setProduct(data);
            return;
          }
        } catch (dbErr) {
          console.warn("Supabase fetch error, trying static fallback:", dbErr);
        }

        // Intercept mock promo packs
        if (mockPromoPacks[slugStr]) {
          setProduct(mockPromoPacks[slugStr]);
          return;
        }

        // Intercept local static products
        const localProd = PRODUCTS.find(p => p.id === slugStr);
        if (localProd) {
          setProduct(localProd);
          return;
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  }, [product, quantity, addToCart]);

  /* ─── Loading State ─── */
  if (loading) {
    return (
      <div className="h-screen bg-background flex flex-col items-center justify-center gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border border-border border-t-foreground rounded-full"
        />
        <span className="text-[10px] uppercase tracking-[0.5em] text-muted font-medium">
          Chargement
        </span>
      </div>
    );
  }

  /* ─── Not Found State ─── */
  if (!product) {
    return (
      <div className="h-screen bg-background flex flex-col items-center justify-center gap-8">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-serif italic text-muted/40">Introuvable</h2>
          <p className="text-sm text-muted tracking-wide">Ce produit n&apos;existe plus ou a été déplacé.</p>
        </div>
        <Link href="/shop" className="text-[10px] font-semibold uppercase tracking-[0.4em] border-b border-foreground pb-1.5 hover:text-muted hover:border-muted transition-colors duration-300">
          Retour au Catalogue
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const discount = product.discount || 24;
  const oldPriceValue = product.old_price || (Number(product.price) * 1.25).toFixed(0);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ─── Spacer for fixed navbar ─── */}
      <div className="pt-[84px] md:pt-[166px]" />

      {/* ─── Breadcrumb ─── */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-20">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 py-6 md:py-8"
        >
          <Link href="/" className="text-[10px] uppercase tracking-[0.3em] text-muted hover:text-foreground transition-colors duration-300 cursor-pointer">
            Accueil
          </Link>
          <ChevronRight size={9} className="text-muted/40" />
          <Link href={`/categories/${product.category?.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.3em] text-muted hover:text-foreground transition-colors duration-300 cursor-pointer">
            {product.category}
          </Link>
          <ChevronRight size={9} className="text-muted/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground truncate max-w-[140px] md:max-w-none">
            {product.name}
          </span>
        </motion.nav>
      </div>

      {/* ─── Product Layout ─── */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24">
          
          {/* ════════════════════════════════════════ */}
          {/* LEFT: Gallery (7 cols)                   */}
          {/* ════════════════════════════════════════ */}
          <div className="lg:col-span-7">
            {/* Main Image */}
            <motion.div
              variants={imageReveal}
              initial="hidden"
              animate="show"
              className="relative aspect-[4/3] md:aspect-[1.15/1] bg-[#f3f2ef] overflow-hidden mb-4"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[activeImage]}
                    alt={product.name}
                    fill
                    className="object-contain p-6 md:p-16"
                    priority
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating Discount Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="absolute top-5 left-5 md:top-8 md:left-8"
              >
                <span className="bg-[#1C1917] text-white text-[9px] font-semibold px-3 py-1.5 tracking-[0.25em] uppercase">
                  -{discount}%
                </span>
              </motion.div>

              {/* Floating Action Icons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col gap-4 z-10"
              >
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-12 h-12 rounded-full backdrop-blur-lg border border-white/20 flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer active:scale-90 ${
                    isWishlisted ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-surface/80 text-foreground/80 hover:bg-surface hover:text-foreground'
                  }`}
                >
                  <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
                <button className="w-12 h-12 rounded-full bg-surface/80 backdrop-blur-lg border border-white/20 flex items-center justify-center text-foreground/80 hover:bg-surface hover:text-foreground shadow-lg transition-all duration-300 cursor-pointer active:scale-90">
                  <Share2 size={18} />
                </button>
              </motion.div>

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8 text-[10px] tracking-[0.3em] text-gray-400 font-medium">
                  {String(activeImage + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </div>
              )}
            </motion.div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-3 overflow-x-auto pb-2 no-scrollbar"
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-shrink-0 w-[72px] md:w-[88px] aspect-square transition-all duration-500 cursor-pointer ${
                      activeImage === i
                        ? 'bg-[#f3f2ef] ring-1 ring-[#1C1917] ring-offset-2 ring-offset-[#fafaf8]'
                        : 'bg-[#f3f2ef] opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-contain p-2" />
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* ════════════════════════════════════════ */}
          {/* RIGHT: Product Details (5 cols)          */}
          {/* ════════════════════════════════════════ */}
          <motion.div
            className="lg:col-span-5 flex flex-col lg:pt-4"
            variants={stagger.parent}
            initial="hidden"
            animate="show"
          >
            {/* Category Tag */}
            <motion.div variants={stagger.child} className="mb-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#CA8A04]">
                {product.category}
              </span>
            </motion.div>

            {/* Product Title */}
            <motion.h1
              variants={stagger.child}
              className="font-serif text-[32px] md:text-[40px] lg:text-[44px] font-normal leading-[1.15] tracking-[-0.01em] mb-6"
            >
              {product.name}
            </motion.h1>

            {/* Short Description */}
            <motion.p
              variants={stagger.child}
              className="text-[15px] leading-[1.7] text-gray-500 font-light mb-8 max-w-md"
            >
              {product.description 
                ? product.description.substring(0, 120) + (product.description.length > 120 ? '...' : '')
                : `Une pièce d'exception conçue pour sublimer votre espace avec élégance et raffinement.`
              }
            </motion.p>

            {/* Price Block */}
            <motion.div variants={stagger.child} className="flex items-baseline gap-4 mb-10">
              <span className="text-[28px] md:text-[32px] font-light tracking-tight text-[#1C1917]">
                {Number(product.price).toLocaleString('fr-FR')}
                <span className="text-[16px] ml-1 font-normal text-gray-400">DH</span>
              </span>
              <span className="text-[16px] line-through text-gray-300 font-light">
                {Number(oldPriceValue).toLocaleString('fr-FR')} DH
              </span>
            </motion.div>

            {/* Divider */}
            <motion.div variants={stagger.child} className="w-full h-px bg-border mb-8" />

            {/* Quantity + Add to Cart */}
            <motion.div variants={stagger.child} className="space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity */}
                <div className="flex items-center justify-between h-14 min-h-[56px] border border-border bg-surface rounded-full px-2 sm:w-36 shrink-0 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-background text-muted hover:text-foreground transition-colors duration-200 cursor-pointer active:scale-90 shrink-0"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-medium w-8 text-center text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-background text-muted hover:text-foreground transition-colors duration-200 cursor-pointer active:scale-90 shrink-0"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-1 h-14 min-h-[56px] rounded-full font-bold text-[10px] uppercase tracking-[0.4em] transition-all duration-500 cursor-pointer shrink-0 shadow-lg shadow-black/5 hover:shadow-black/10 flex items-center justify-center ${
                    addedToCart
                      ? 'bg-[#CA8A04] text-white'
                      : 'bg-[#1C1917] text-white hover:bg-[#44403C]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={addedToCart ? 'added' : 'add'}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="block"
                    >
                      {addedToCart ? '✓ AJOUTÉ AU PANIER' : 'AJOUTER AU PANIER'}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* WhatsApp Inquiry */}
              <button 
                onClick={() => {
                  if (!product) return;
                  const message = `*Bonjour Collectif Design,*\n\nJe souhaite commander la pièce de prestige suivante :\n\n• *Nom* : ${product.name}\n• *Prix* : ${Number(product.price).toLocaleString('fr-FR')} MAD\n• *Catégorie* : ${product.category}\n• *Lien* : ${window.location.href}\n\nMerci de m'accompagner pour finaliser ma commande d'exception.`;
                  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="w-full h-14 min-h-[56px] rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-3 transition-all duration-500 shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 active:scale-97 cursor-pointer shrink-0 font-bold text-[10px] uppercase tracking-[0.25em] group"
              >
                <MessageCircle size={16} className="transition-transform duration-300 group-hover:scale-110" />
                <span>
                  Commander via WhatsApp
                </span>
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={stagger.child} className="grid grid-cols-3 gap-4 py-6 mb-6 border-y border-gray-100">
              {[
                { icon: Truck, label: 'Livraison', sub: 'Partout au Maroc' },
                { icon: ShieldCheck, label: 'Garantie', sub: '2 Ans minimum' },
                { icon: Package, label: 'Retour', sub: 'Sous 14 jours' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2">
                  <Icon size={18} strokeWidth={1.2} className="text-[#CA8A04]" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-900">{label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Accordions */}
            <motion.div variants={stagger.child}>
              <AccordionItem title="Description" defaultOpen={true}>
                <div className="text-[14px] leading-[1.8] text-gray-500 font-light space-y-4">
                  <p>
                    {product.description || `La collection ${product.name} incarne une alliance parfaite entre modernité et durabilité. Conçue pour résister aux éléments tout en conservant une esthétique minimaliste et luxueuse, elle s'intègre harmonieusement dans les intérieurs comme les extérieurs les plus exigeants.`}
                  </p>
                </div>
              </AccordionItem>

              <AccordionItem title="Matériaux & Dimensions">
                <div className="space-y-3">
                  {[
                    { label: 'Matériaux', value: product.material || 'Bois massif & Aluminium' },
                    { label: 'Dimensions', value: product.dimensions || 'Sur mesure' },
                    { label: 'Poids', value: product.weight ? `${product.weight} kg` : 'Variable' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-2">
                      <span className="text-[12px] uppercase tracking-[0.2em] text-gray-400 font-medium">{label}</span>
                      <span className="text-[13px] text-gray-700 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </AccordionItem>

              <AccordionItem title="Livraison & Retours">
                <div className="text-[14px] leading-[1.8] text-gray-500 font-light space-y-3">
                  <p>Livraison gratuite sur tout le territoire marocain. Délai estimé : 10 à 15 jours ouvrables après confirmation de commande.</p>
                  <p>Retours acceptés sous 14 jours dans l&apos;emballage d&apos;origine. Contactez notre service client pour initier un retour.</p>
                </div>
              </AccordionItem>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* FULL-WIDTH: Specification Band                   */}
      {/* ════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-[#1C1917] text-white py-20 md:py-28"
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.6em] text-[#CA8A04] font-medium block mb-4">
              Fiche Technique
            </span>
            <h3 className="font-serif text-[28px] md:text-[36px] font-normal italic">
              Spécifications
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
            {[
              { label: 'Catégorie', value: product.category || 'N/A' },
              { label: 'Matériaux', value: product.material || 'Premium Mix' },
              { label: 'Dimensions', value: product.dimensions || 'Sur mesure' },
              { label: 'Garantie', value: product.warranty || '2 Ans' },
            ].map(({ label, value }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="text-center"
              >
                <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-3 font-medium">{label}</p>
                <p className="text-[15px] md:text-[17px] font-light">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════ */}
      {/* RELATED PRODUCTS                                 */}
      {/* ════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="text-center mb-4">
          <span className="text-[10px] uppercase tracking-[0.6em] text-[#CA8A04] font-medium">
            Inspirations
          </span>
        </div>
        <div className="text-center mb-12">
          <h3 className="font-serif text-[28px] md:text-[36px] font-normal">
            Vous aimerez <span className="italic">aussi</span>
          </h3>
        </div>
        <TrendingSection />
      </section>

      {/* Dynamic WhatsApp Button for this specific product */}
      <WhatsAppFloatingButton productName={product.name} />
    </main>
  );
}
