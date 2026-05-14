'use client';

import { motion } from 'framer-motion';
import { Product } from '@/lib/products';
import Link from 'next/link';

export default function ProductCard(product: Product) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={`/products/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-surface">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-[2000ms] ease-expo group-hover:scale-110"
          />
          
          {/* Badge */}
          {product.discount && (
            <div className="absolute top-6 left-6 z-10 bg-accent px-4 py-1.5 text-[8px] font-bold uppercase tracking-[0.3em] text-white">
              -{product.discount}%
            </div>
          )}

          {/* Quick View Overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-premium-dark/10 backdrop-blur-[2px]">
             <div className="h-16 w-16 rounded-full border border-white/20 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-700 bg-white/5">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white">View</span>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted/60">
                {product.category}
              </span>
              <h3 className="text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-accent">
                {product.name}
              </h3>
            </div>
            <div className="text-right">
               <span className="text-sm font-medium tracking-tight text-foreground">
                 {product.price} MAD
               </span>
               {product.oldPrice && (
                 <p className="text-[10px] text-muted/40 line-through tracking-tight mt-1">
                   {product.oldPrice} MAD
                 </p>
               )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 pt-2">
            <div className="h-[1px] w-8 bg-border group-hover:w-full transition-all duration-700 ease-expo group-hover:bg-accent/30" />
            <span className="shrink-0 text-[8px] font-bold uppercase tracking-[0.3em] text-muted/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              Selection Royale
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
