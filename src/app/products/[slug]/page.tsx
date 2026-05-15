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
      <div className="pt-[128px]"></div>
      
      <div className="container-wide mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-8">
          <Link href="/" className="hover:text-black transition-colors">Accueil</Link>
          <span>/</span>
          <Link href={`/categories/${product.category?.toLowerCase()}`} className="hover:text-black transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] md:aspect-square bg-white border border-gray-100 overflow-hidden">
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-24 aspect-[4/3] border ${
                      activeImage === i ? 'border-black' : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col pt-4">
            <div className="mb-6 flex justify-end w-full max-w-md">
              <span className="bg-black text-white text-[10px] font-bold px-2 py-1">
                -{discount}%
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-6">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-xl line-through text-gray-400 font-light">
                {Number(oldPrice).toLocaleString('fr-FR')} DH
              </span>
              <span className="text-2xl font-bold text-[#d11124]">
                {Number(product.price).toLocaleString('fr-FR')} DH
              </span>
            </div>

            <div className="w-full max-w-md space-y-4 mb-8">
              {/* WhatsApp Button */}
              <button className="w-full bg-[#1bc53e] hover:bg-[#16a333] transition-colors text-white p-3 flex items-center gap-3 rounded-sm">
                <MessageCircle size={28} />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-medium">Sketch Design Online</span>
                  <span className="text-sm font-bold">Commander via WhatsApp</span>
                </div>
              </button>

              {/* Add to Cart Group */}
              <div className="flex gap-4">
                <div className="flex items-center bg-[#2a2a2a] text-white">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-black transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 border-x border-gray-600 font-medium">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-black transition-colors"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); }}
                  className="flex-1 bg-[#2a2a2a] hover:bg-black transition-colors text-white font-bold text-xs uppercase tracking-widest"
                >
                  AJOUTER AU PANIER
                </button>
              </div>
            </div>

            <div className="text-xs font-semibold mb-8">
              Catégorie : <span className="font-light text-gray-500">{product.category}</span>
            </div>

            {/* Description Accordion */}
            <div className="w-full max-w-md border border-gray-100">
              <button 
                onClick={() => setIsDescOpen(!isDescOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50"
              >
                <span className="font-bold text-xs tracking-wide">Description</span>
                <ChevronUp size={16} className={`transition-transform ${!isDescOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDescOpen && (
                <div className="p-4 pt-0 text-sm font-light text-gray-600 leading-relaxed border-t border-gray-100">
                  <br />
                  <p className="font-bold mb-2 text-black">Confort généreux et style contemporain</p>
                  <p className="mb-4">
                    {product.description || `Le pouf ${product.name} est conçu pour offrir une expérience d'assise agréable et polyvalente. Son garnissage associe des mousses HR35 et HR30, enrichies par la technologie Magic 4 et une souplesse maîtrisée, garantissant un accueil confortable et durable. Revêtu d'une toile texturée traitée antitaches, il allie esthétique et praticité, tout en conservant un aspect soigné au fil du temps.`}
                  </p>
                  
                  <p className="font-bold mb-2 text-black">Base solide et idées d'intégration</p>
                  <p>
                    Reposant sur une structure en bois massif avec un socle en hêtre massif teinté noyer, le pouf se distingue par sa robustesse et son allure chaleureuse. Pour le sublimer, placez-le à proximité d'un canapé ou d'un fauteuil afin de créer un espace détente harmonieux.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
