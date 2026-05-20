'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';
import { CONTACT_INFO } from '@/data/contact';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  // Disable page scroll when cart drawer is active to prevent scroll leak
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

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
            className="fixed inset-0 z-[150] bg-background/80 backdrop-blur-xl"
          />

          {/* Drawer */}
          <motion.div
            data-lenis-prevent
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[160] h-full w-full max-w-xl bg-background border-l border-border/10"
          >
            <div className="flex h-full flex-col p-12 lg:p-20">
              {/* Header */}
              <div className="flex items-center justify-between mb-16">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent">Votre Sélection</span>
                  <h2 className="text-4xl font-medium tracking-tightest lowercase">Le <span className="italic font-light">Panier</span></h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-4 hover:rotate-90 transition-all duration-700 text-muted/40 hover:text-foreground"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center space-y-8 text-center opacity-40">
                    <ShoppingBag size={48} strokeWidth={1} />
                    <p className="text-sm font-medium tracking-tight lowercase italic">Votre panier est vide.</p>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-8 group"
                      >
                        <div className="h-32 w-24 shrink-0 overflow-hidden bg-surface grayscale group-hover:grayscale-0 transition-all duration-700">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between py-1">
                          <div className="space-y-1">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-medium tracking-tight lowercase">{item.name}</h3>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-muted/20 hover:text-red-500 transition-colors p-2"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-accent">{item.category}</p>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-border/5">
                            <div className="flex items-center gap-6">
                              <button 
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="text-muted/40 hover:text-accent transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-[10px] font-bold tracking-widest w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-muted/40 hover:text-accent transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <p className="text-sm font-medium tracking-tight">
                               {item.price} MAD
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="mt-16 pt-12 border-t border-border/10 space-y-10">
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.4em] text-muted/40">
                      <span>Estimation Partielle</span>
                      <span className="text-foreground">{cartTotal.toLocaleString()} MAD</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.4em] text-muted/40">
                      <span>Logistique Studio</span>
                      <span className="text-accent italic font-light lowercase">Gracieuse</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-foreground">Total Global</span>
                      <span className="text-4xl font-medium tracking-tighter text-accent">{cartTotal.toLocaleString()} MAD</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      if (cart.length === 0) return;
                      
                      let message = `*Bonjour Collectif Design,*\n\n`;
                      message += `Je souhaite finaliser ma sélection et obtenir un devis pour les pièces de prestige suivantes :\n\n`;
                      
                      cart.forEach((item, index) => {
                        message += `*${index + 1}. ${item.name}*\n`;
                        message += `• Catégorie : ${item.category || 'Mobilier'}\n`;
                        message += `• Quantité : ${item.quantity}\n`;
                        message += `• Prix estimé : ${Number(item.price).toLocaleString('fr-FR')} MAD\n`;
                        message += `• Matériaux : ${item.material || 'Standard premium'}\n\n`;
                      });
                      
                      message += `*Total Global Estimé : ${cartTotal.toLocaleString('fr-FR')} MAD*\n\n`;
                      message += `Pouvez-vous me confirmer les délais de fabrication artisanale et les modalités de livraison ?\n\n`;
                      message += `Merci de votre accompagnement d'exception.`;
                      
                      const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="group relative w-full flex items-center justify-center gap-8 overflow-hidden rounded-full border border-border bg-foreground px-12 py-7 transition-all active:scale-95 cursor-pointer"
                  >
                    <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.6em] text-background">
                      Finaliser la Sélection
                    </span>
                    <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo" />
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
