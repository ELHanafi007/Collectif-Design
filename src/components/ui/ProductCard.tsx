'use client';

import { motion } from 'framer-motion';
import { Product } from '@/lib/products';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function ProductCard(product: Product) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={`/products/${product.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface mb-6">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-[1500ms] ease-expo group-hover:scale-105"
          />
          
          {/* Badge */}
          {product.discount && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-foreground text-background px-3 py-1.5 rounded-none text-[8px] font-bold uppercase tracking-widest">
                -{product.discount}%
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5">
            <div className="h-14 w-14 rounded-full bg-background text-foreground shadow-2xl flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500 backdrop-blur-md">
              <ShoppingBag size={18} strokeWidth={1} />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2 px-1 text-center md:text-left">
          <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-muted">{product.category}</p>
          <h3 className="text-sm md:text-base font-serif italic tracking-tight truncate group-hover:text-muted transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <p className="text-sm font-medium tracking-tight">
              {Number(product.price).toLocaleString('fr-FR')} <span className="text-[10px] font-light text-muted uppercase tracking-widest ml-1">MAD</span>
            </p>
            {product.oldPrice && (
              <p className="text-[11px] text-muted/30 line-through font-light italic">
                {Number(product.oldPrice).toLocaleString('fr-FR')}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
