'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowLeft, Check, Loader2, AlertCircle } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  
  // Checkout & form states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: ''
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  // Reset form states when the drawer closes
  useEffect(() => {
    if (!isCartOpen) {
      const timer = setTimeout(() => {
        setIsCheckingOut(false);
        setFormData({ name: '', phone: '', city: '', address: '' });
        setTouched({});
        setErrors({});
        setStatus('idle');
        setErrorMessage(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  // Input validation
  const validateField = (name: string, value: string) => {
    let error = '';
    if (!value.trim()) {
      error = 'Ce champ est requis';
    } else if (name === 'phone') {
      const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;
      if (!phoneRegex.test(value)) {
        error = 'Format de téléphone invalide';
      }
    }
    return error;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};
    
    Object.keys(formData).forEach(key => {
      newTouched[key] = true;
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    setTouched(newTouched);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    try {
      setStatus('loading');
      setErrorMessage(null);
      
      const payload = {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        totalPrice: cartTotal,
        items: cart.map(item => ({
          name: item.name,
          category: item.category,
          material: item.material,
          price: item.price,
          image: item.image,
          quantity: item.quantity
        }))
      };
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Une erreur est survenue lors de la transmission.');
      }
      
      setStatus('success');
      clearCart();
    } catch (err: unknown) {
      console.error('Checkout error:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Impossible de transmettre la commande. Veuillez réessayer.');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (status !== 'loading') setIsCartOpen(false);
            }}
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
            <div className="flex h-full flex-col p-6 sm:p-10 lg:p-20">
              
              {/* Dynamic Header */}
              <div className="flex items-center justify-between mb-12">
                {status !== 'success' && isCheckingOut ? (
                  <button
                    onClick={() => {
                      if (status !== 'loading') setIsCheckingOut(false);
                    }}
                    className="flex items-center gap-2 group text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors duration-300"
                  >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>Retour au Panier</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent">
                      {status === 'success' ? 'Confirmation' : 'Votre Sélection'}
                    </span>
                    <h2 className="text-4xl font-medium tracking-tightest lowercase">
                      {status === 'success' ? (
                        <>Sélection <span className="italic font-light">transmise</span></>
                      ) : (
                        <>Le <span className="italic font-light">Panier</span></>
                      )}
                    </h2>
                  </div>
                )}
                {status !== 'loading' && (
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-4 hover:rotate-90 transition-all duration-700 text-muted/40 hover:text-foreground"
                  >
                    <X size={24} />
                  </button>
                )}
              </div>

              {/* Dynamic Main Body Content */}
              <div className="flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar">
                
                {status === 'success' ? (
                  /* --- Success View --- */
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col h-full justify-center items-center text-center space-y-8 py-10"
                  >
                    <div className="w-16 h-16 rounded-full border border-accent/20 flex items-center justify-center text-emerald-600 bg-emerald-500/5">
                      <Check size={28} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-serif italic text-foreground">Merci pour votre intérêt.</h3>
                      <p className="text-sm text-muted leading-relaxed font-light max-w-md">
                        Votre sélection a été transmise avec succès à notre conciergerie. 
                        Un conseiller de l&apos;Atelier prendra contact avec vous par téléphone sous 24h 
                        pour valider les détails techniques et planifier votre livraison.
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full border border-border bg-foreground px-10 py-5 transition-all active:scale-95 cursor-pointer"
                    >
                      <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.4em] text-background">
                        Retour à la Boutique
                      </span>
                      <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo" />
                    </button>
                  </motion.div>
                ) : isCheckingOut ? (
                  /* --- Checkout Form View --- */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-10"
                  >
                    {/* Collapsed Items Summary */}
                    <div className="bg-surface/50 border border-border/10 p-6 rounded-sm space-y-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                        Résumé de la Commande
                      </p>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-muted/65 font-light">
                          {cart.reduce((sum, i) => sum + i.quantity, 0)} {cart.reduce((sum, i) => sum + i.quantity, 0) > 1 ? 'pièces sélectionnées' : 'pièce sélectionnée'}
                        </span>
                        <span className="text-lg font-serif font-medium text-accent">
                          {cartTotal.toLocaleString()} MAD
                        </span>
                      </div>
                    </div>

                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted block">
                          Nom Complet
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          autoComplete="name"
                          className={`w-full bg-surface/30 border-b ${errors.name && touched.name ? 'border-red-500' : 'border-border/50'} focus:border-foreground py-4 px-2 outline-none text-sm font-light transition-colors duration-500`}
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                          required
                          disabled={status === 'loading'}
                        />
                        {errors.name && touched.name && (
                          <div className="flex items-center gap-1.5 text-[10px] text-red-500 font-medium tracking-wide mt-1.5">
                            <AlertCircle size={10} />
                            <span>{errors.name}</span>
                          </div>
                        )}
                      </div>

                      {/* Phone input */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted block">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          autoComplete="tel"
                          inputMode="tel"
                          className={`w-full bg-surface/30 border-b ${errors.phone && touched.phone ? 'border-red-500' : 'border-border/50'} focus:border-foreground py-4 px-2 outline-none text-sm font-light transition-colors duration-500`}
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          required
                          disabled={status === 'loading'}
                        />
                        {errors.phone && touched.phone && (
                          <div className="flex items-center gap-1.5 text-[10px] text-red-500 font-medium tracking-wide mt-1.5">
                            <AlertCircle size={10} />
                            <span>{errors.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* City input */}
                      <div className="space-y-2">
                        <label htmlFor="city" className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted block">
                          Ville
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          className={`w-full bg-surface/30 border-b ${errors.city && touched.city ? 'border-red-500' : 'border-border/50'} focus:border-foreground py-4 px-2 outline-none text-sm font-light transition-colors duration-500`}
                          value={formData.city}
                          onChange={(e) => handleChange('city', e.target.value)}
                          onBlur={() => handleBlur('city')}
                          required
                          disabled={status === 'loading'}
                        />
                        {errors.city && touched.city && (
                          <div className="flex items-center gap-1.5 text-[10px] text-red-500 font-medium tracking-wide mt-1.5">
                            <AlertCircle size={10} />
                            <span>{errors.city}</span>
                          </div>
                        )}
                      </div>

                      {/* Address textarea */}
                      <div className="space-y-2">
                        <label htmlFor="address" className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted block">
                          Adresse de Livraison
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          autoComplete="street-address"
                          rows={3}
                          className={`w-full bg-surface/30 border-b ${errors.address && touched.address ? 'border-red-500' : 'border-border/50'} focus:border-foreground py-4 px-2 outline-none text-sm font-light transition-colors duration-500 resize-none`}
                          value={formData.address}
                          onChange={(e) => handleChange('address', e.target.value)}
                          onBlur={() => handleBlur('address')}
                          required
                          disabled={status === 'loading'}
                        />
                        {errors.address && touched.address && (
                          <div className="flex items-center gap-1.5 text-[10px] text-red-500 font-medium tracking-wide mt-1.5">
                            <AlertCircle size={10} />
                            <span>{errors.address}</span>
                          </div>
                        )}
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  /* --- Standard Cart Items View --- */
                  cart.length === 0 ? (
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
                          <div className="h-32 w-24 shrink-0 overflow-hidden bg-surface grayscale group-hover:grayscale-0 transition-all duration-700 border border-border/5">
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
                                  className="text-muted/20 hover:text-red-500 transition-colors p-2 cursor-pointer"
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
                                  className="text-muted/40 hover:text-accent transition-colors cursor-pointer"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="text-[10px] font-bold tracking-widest w-4 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="text-muted/40 hover:text-accent transition-colors cursor-pointer"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <p className="text-sm font-medium tracking-tight">
                                 {Number(item.price).toLocaleString()} MAD
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )
                )}
              </div>

              {/* Dynamic Footer */}
              {cartTotal > 0 && status !== 'success' && (
                <div className="mt-12 pt-10 border-t border-border/10 space-y-8 shrink-0">
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.4em] text-muted/40">
                      <span>Estimation Partielle</span>
                      <span className="text-foreground">{cartTotal.toLocaleString()} MAD</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.4em] text-muted/40">
                      <span>Logistique Studio</span>
                      <span className="text-accent italic font-light lowercase">Gracieuse</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-4 border-t border-border/5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-foreground">Total Global</span>
                      <span className="text-4xl font-medium tracking-tighter text-accent">{cartTotal.toLocaleString()} MAD</span>
                    </div>
                  </div>
                  
                  {isCheckingOut ? (
                    <div className="space-y-4">
                      {status === 'error' && (
                        <div className="flex items-start gap-2 bg-red-500/5 border border-red-500/10 p-4 rounded-sm text-red-500 text-xs">
                          <AlertCircle size={16} className="shrink-0 mt-0.5" />
                          <span>{errorMessage}</span>
                        </div>
                      )}
                      
                      <button 
                        type="submit"
                        form="checkout-form"
                        disabled={status === 'loading'}
                    className="group relative w-full flex items-center justify-center gap-4 overflow-hidden rounded-full border border-border bg-foreground px-6 sm:px-12 py-6 sm:py-7 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                        <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.6em] text-background flex items-center gap-3">
                          {status === 'loading' ? (
                            <>
                              <Loader2 size={14} className="animate-spin" />
                              Transmission en cours...
                            </>
                          ) : (
                            'Transmettre la Sélection'
                          )}
                        </span>
                        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsCheckingOut(true)}
                      className="group relative w-full flex items-center justify-center gap-4 overflow-hidden rounded-full border border-border bg-foreground px-6 sm:px-12 py-6 sm:py-7 transition-all active:scale-95 cursor-pointer"
                    >
                      <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.6em] text-background">
                        Procéder au Devis par E-mail
                      </span>
                      <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
