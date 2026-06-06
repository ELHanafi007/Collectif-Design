'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { CONTACT_INFO } from '@/data/contact';
import { useCart } from '@/components/providers/CartProvider';

export default function WhatsAppFloatingButton({ productName }: { productName?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isCartOpen } = useCart();

  // Delay the entrance of the WhatsApp button for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const message = productName 
      ? `Bonjour Collectif Design, je souhaiterais obtenir des informations sur la pièce "${productName}".`
      : `Bonjour Collectif Design, je souhaiterais obtenir des informations sur votre mobilier sur mesure.`;
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Hide button if cart drawer is active to prevent UI overlap
  if (isCartOpen) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] flex items-center gap-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tooltip text - Slide and fade in on hover (Desktop only) */}
          <AnimatePresence>
            {isHovered && (
              <motion.button
                onClick={handleClick}
                initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="hidden md:flex h-12 items-center bg-[#1C1917] text-white border border-white/10 rounded-full px-5 py-2 shadow-xl hover:bg-[#2C2927] transition-colors cursor-pointer text-[10px] font-bold uppercase tracking-widest gap-2"
              >
                <span>Conseiller en ligne</span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Floating WhatsApp Action Button */}
          <button
            onClick={handleClick}
            className="relative w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-95 group focus:outline-none"
            aria-label="Contacter sur WhatsApp"
          >
            {/* Pulsating background ring */}
            <span className="absolute inset-0 rounded-full bg-emerald-600/30 scale-100 group-hover:scale-125 opacity-100 group-hover:opacity-0 transition-all duration-700 ease-out -z-10" />

            {/* Notification Badge */}
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-yellow-500 border-2 border-background rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping" />
            </span>

            {/* Icon with spin effect on hover */}
            <MessageCircle 
              size={24} 
              className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-115" 
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
