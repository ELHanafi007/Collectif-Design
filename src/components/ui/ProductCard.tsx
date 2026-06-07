'use client';

import { Product } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard(product: Product) {
  // Mock discount if it doesn't exist, to match the vibe
  const discount = product.discount || '24';
  const oldPriceValue = product.old_price || (Number(product.price) * 1.25).toFixed(0);

  return (
    <div className="group relative border border-border p-4 bg-surface flex flex-col hover:shadow-lg transition-shadow h-full rounded-xl">
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        {/* Image & Discount */}
        <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg">
          <div className="absolute top-0 left-0 bg-accent text-white text-[10px] font-bold px-3 py-1 z-10 rounded-br-lg">
            -{discount}%
          </div>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="text-center mt-auto flex flex-col px-2">
          <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-accent font-serif line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[9px] text-muted mt-1 mb-2 uppercase tracking-widest">
            {product.category || 'Meubles'}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className="line-through text-muted/50">
              {Number(oldPriceValue).toLocaleString('fr-FR')} DH
            </span>
            <span className="font-bold text-accent text-sm">
              {Number(product.price).toLocaleString('fr-FR')} DH
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
