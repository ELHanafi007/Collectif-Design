import { products } from '@/data/products';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { ChevronRight, Star, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.id === params.slug);
  const { addToCart } = useCart();

  if (!product) {
    return <div className="h-screen flex items-center justify-center">Produit non trouvé</div>;
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Breadcrumbs */}
      <div className="pt-32 px-6 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/" className="hover:text-black">Accueil</Link>
          <ChevronRight size={14} />
          <Link href={`/categories/${product.category}`} className="hover:text-black capitalize">
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-black font-medium">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Gallery - Sticky on Desktop */}
          <div className="lg:w-3/5">
            <div className="sticky top-32 space-y-6">
              <div className="aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-50 rounded-2xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                     <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-2/5 pb-32">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span className="text-sm text-muted">(48 Avis)</span>
            </div>

            <h1 className="text-5xl font-bold mb-4 tracking-tighter">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-accent mb-8">
              {product.price.toLocaleString()} MAD
            </p>

            <div className="p-8 bg-gray-50 rounded-3xl mb-8">
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-muted">Description</h4>
              <p className="text-muted leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-10">
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-muted">Caractéristiques Clés</h4>
              <ul className="space-y-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-black text-white py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-accent transition-colors shadow-xl active:scale-95"
              >
                <ShoppingBag size={20} />
                Ajouter au Panier
              </button>
              <button className="p-5 border border-gray-200 rounded-full hover:border-accent hover:text-accent transition-all shadow-sm">
                <Heart size={24} />
              </button>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-100 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-sm">Livraison Studio Offerte</h5>
                  <p className="text-xs text-muted">Pour toutes les commandes supérieures à 5000 MAD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
