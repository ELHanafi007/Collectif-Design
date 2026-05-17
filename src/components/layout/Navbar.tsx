'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Heart, ShoppingBag, X, ChevronRight } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';
import { AnimatePresence, motion } from 'framer-motion';

const navigation = [
  { name: 'PACKS PROMO', href: '/packs-promo', highlight: true },
  { name: 'SALONS', href: '/categories/salons' },
  { name: 'CANAPÉS', href: '/categories/canapes' },
  { name: 'CHAMBRE', href: '/categories/chambre' },
  { name: 'TABLES', href: '/categories/tables' },
  { name: 'CHAISES', href: '/categories/chaises' },
  { name: 'JARDIN', href: '/categories/jardin' },
  { name: 'MEUBLES', href: '/categories/meubles' },
  { name: 'DÉCO', href: '/categories/deco' }
];

/* ─── Easing ─── */
const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const { setIsCartOpen, cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full z-[100]">
      {/* ─── Main Premium Bar ─── */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container-wide mx-auto px-5 md:px-12 flex items-center justify-between h-[84px] md:h-[116px]">
          
          {/* LEFT: Masterpiece Menu Trigger */}
          <div className="flex items-center gap-4 flex-1 md:flex-none">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="group relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer focus:outline-none"
              aria-label="Toggle Menu"
            >
              {/* Animated Outer Circle */}
              <span className="absolute inset-0 rounded-full border border-gray-200 group-hover:border-black group-hover:scale-105 transition-all duration-500 ease-out" />
              <span className="absolute inset-0 rounded-full bg-black scale-0 group-hover:scale-100 opacity-[0.03] transition-transform duration-500 ease-out" />
              
              {/* Asymmetric Morphing Lines */}
              <div className="relative w-5 h-3 flex flex-col justify-between items-center">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="w-5 h-[1.5px] bg-black block origin-center"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease }}
                  className="w-5 h-[1.5px] bg-black block"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -5.5, width: "20px" } : { rotate: 0, y: 0, width: "13px" }}
                  transition={{ duration: 0.4, ease }}
                  className="h-[1.5px] bg-black block origin-center self-end group-hover:w-5 transition-[width] duration-300"
                />
              </div>
            </button>
            <span className="hidden lg:inline-block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500 group-hover:text-black transition-colors cursor-pointer select-none" onClick={() => setIsMobileMenuOpen(true)}>
              Menu
            </span>
          </div>

          {/* CENTER: Grand Logo (Overlapping Masterpiece) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[101]">
            <Link href="/" className="relative block">
              <Image 
                src="/logo-removebg-preview.png" 
                alt="Collectif Design" 
                width={450} 
                height={150} 
                className="h-[120px] md:h-[210px] w-auto object-contain transition-transform duration-500 hover:scale-105" 
                priority
              />
            </Link>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2 md:gap-4 text-gray-700 flex-1 md:flex-none justify-end">
            {/* Elegant Search Trigger */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-50 transition-colors cursor-pointer active:scale-95"
              aria-label="Rechercher"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Account */}
            <Link 
              href="/account" 
              className="hidden md:flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <User size={20} strokeWidth={1.5} />
            </Link>

            {/* Wishlist */}
            <Link 
              href="/wishlist" 
              className="hidden md:flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Heart size={20} strokeWidth={1.5} />
            </Link>

            {/* Cart */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-50 transition-colors cursor-pointer active:scale-95"
              aria-label="Panier"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1.5 right-1.5 bg-black text-white text-[8px] font-bold min-w-[16px] h-[16px] rounded-full flex items-center justify-center px-1"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ─── Bottom Navigation Bar (Desktop Only) ─── */}
      <nav className="w-full bg-[#1C1917] text-white hidden md:block">
        <div className="container-wide mx-auto px-4 md:px-8">
          <ul className="flex items-center justify-center text-[10px] font-semibold tracking-[0.2em] uppercase">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block py-4 px-6 hover:bg-white/10 transition-colors cursor-pointer ${
                    item.highlight ? 'bg-[#0f8742] hover:bg-[#0d7338]' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ─── Drawer Menu (Desktop & Mobile Panel) ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 z-[110]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-[380px] bg-white z-[120] flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 h-[84px] md:h-[116px] border-b border-gray-100 flex-shrink-0">
                <Image 
                  src="/logo-removebg-preview.png" 
                  alt="Collectif Design" 
                  width={240} 
                  height={80} 
                  className="h-[52px] w-auto object-contain transform scale-110" 
                />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="w-11 h-11 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 cursor-pointer active:scale-95 transition-all"
                  aria-label="Fermer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-4 px-2">
                {navigation.map((item, idx) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.3, ease }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-4 px-6 text-[13px] font-semibold tracking-[0.15em] uppercase cursor-pointer hover:bg-gray-50/50 rounded-lg active:bg-gray-50 transition-colors ${
                        item.highlight ? 'text-[#0f8742]' : 'text-gray-800'
                      }`}
                    >
                      {item.name}
                      <ChevronRight size={14} className="text-gray-300" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Actions */}
              <div className="flex-shrink-0 border-t border-gray-100 bg-gray-50/80 px-6 py-5 flex items-center justify-around">
                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-transform">
                  <User size={19} strokeWidth={1.3} className="text-gray-600 hover:text-black" />
                  <span className="text-[9px] uppercase font-semibold tracking-[0.15em] text-gray-500">Compte</span>
                </Link>
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-transform">
                  <Heart size={19} strokeWidth={1.3} className="text-gray-600 hover:text-black" />
                  <span className="text-[9px] uppercase font-semibold tracking-[0.15em] text-gray-500">Favoris</span>
                </Link>
                <button onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }} className="flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-transform">
                  <ShoppingBag size={19} strokeWidth={1.3} className="text-gray-600 hover:text-black" />
                  <span className="text-[9px] uppercase font-semibold tracking-[0.15em] text-gray-500">Panier</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Search Overlay (Masterpiece Search Drawer) ─── */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/55 backdrop-blur-md z-[130] flex flex-col justify-start pt-24 md:pt-32"
          >
            {/* Exit trigger on empty space */}
            <div className="absolute inset-0 -z-10" onClick={() => setIsSearchOpen(false)} />

            <div className="container-wide mx-auto px-6 md:px-12 w-full max-w-4xl">
              <div className="flex items-center justify-between border-b-2 border-white/20 pb-4 mb-8">
                <input
                  autoFocus
                  type="text"
                  placeholder="Rechercher une collection, un meuble..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-white text-2xl md:text-4xl font-serif tracking-wide focus:outline-none placeholder:text-white/40 placeholder:italic"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 hover:border-white text-white/75 hover:text-white transition-all cursor-pointer active:scale-95 ml-4"
                  aria-label="Fermer la recherche"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Instant luxury suggestion categories */}
              <div className="text-white/80">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-4">Suggestions Populaires</p>
                <div className="flex flex-wrap gap-3">
                  {['Salons', 'Canapés en Velours', 'Tables de Repas', 'Promotions'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-medium tracking-wide transition-all cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
