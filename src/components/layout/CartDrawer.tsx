'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';
import Link from 'next/link';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[160] h-full w-full max-w-md bg-white shadow-2xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={20} className="text-accent" />
                  <h2 className="text-xl font-bold tracking-tight">Votre Panier</h2>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold">
                    {cart.length} Articles
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                    <div className="rounded-full bg-gray-50 p-6">
                      <ShoppingBag size={40} className="text-gray-300" />
                    </div>
                    <p className="text-muted">Votre panier est vide.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-sm font-bold uppercase tracking-widest text-accent hover:underline"
                    >
                      Continuer les achats
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-50">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="text-sm font-bold line-clamp-1">{item.name}</h3>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <p className="text-xs text-muted mt-1 uppercase tracking-tighter">{item.category}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-100 rounded-full px-2 py-1 gap-4">
                              <button 
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="hover:text-accent"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="hover:text-accent"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <p className="text-sm font-bold">
                              {(item.price * item.quantity).toLocaleString()} MAD
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gray-100 p-6 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Sous-total</span>
                      <span className="font-medium">{total.toLocaleString()} MAD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Livraison</span>
                      <span className="font-medium text-accent">Gratuite</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-4">
                      <span className="font-bold">Total</span>
                      <span className="text-xl font-bold">{total.toLocaleString()} MAD</span>
                    </div>
                  </div>
                  <button className="w-full bg-black text-white py-5 rounded-full font-bold hover:bg-accent transition-all shadow-xl active:scale-[0.98]">
                    Passer la commande
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
