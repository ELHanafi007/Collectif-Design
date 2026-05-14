import { products } from '@/data/products';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { Filter, ChevronDown, ArrowRight } from 'lucide-react';

export default function CategoryPage({ params, searchParams }: { params: { slug: string }, searchParams: { sub?: string } }) {
  const categoryProducts = products.filter(p => p.category === params.slug);
  const subcategory = searchParams.sub;
  
  const filteredProducts = subcategory 
    ? categoryProducts.filter(p => p.subcategory.toLowerCase() === subcategory.toLowerCase())
    : categoryProducts;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <div className="pt-48 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-4 block">Collection</span>
            <h1 className="text-7xl font-bold tracking-tighter capitalize lowercase">
              {params.slug}<span className="text-accent">.</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-3 px-6 py-3 border border-gray-100 rounded-full text-xs font-bold uppercase tracking-widest hover:border-accent transition-colors">
              <Filter size={14} />
              Filtrer
            </button>
            <button className="flex items-center gap-3 px-6 py-3 border border-gray-100 rounded-full text-xs font-bold uppercase tracking-widest hover:border-accent transition-colors">
              Trier par
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-full bg-white/90 backdrop-blur-md py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest">
                    Voir le Produit
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="text-lg font-bold tracking-tight mb-1">{product.name}</h3>
                  <p className="text-xs text-muted uppercase tracking-widest">{product.subcategory}</p>
                </div>
                <p className="font-bold text-accent">{product.price.toLocaleString()} MAD</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
