'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
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

export default function Navbar() {
  const { setIsCartOpen, cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full z-[100]">
      {/* ─── Main Bar ─── */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-wide mx-auto px-4 md:px-8 flex items-center justify-between h-[72px] md:h-28">
          
          {/* Left: Hamburger (mobile) */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 -ml-2 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/logo-removebg-preview.png" 
              alt="Collectif Design" 
              width={280} 
              height={80} 
              className="h-[52px] md:h-[90px] w-auto object-contain" 
              priority
            />
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
            <input 
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-sm py-2.5 px-4 text-sm focus:outline-none focus:border-gray-500 font-sans transition-colors"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer">
              <Search size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-5 md:gap-6 text-gray-700">
            <Link href="/account" className="hidden md:flex hover:text-black transition-colors cursor-pointer">
              <User size={21} strokeWidth={1.5} />
            </Link>
            <Link href="/wishlist" className="hidden md:flex hover:text-black transition-colors cursor-pointer">
              <Heart size={21} strokeWidth={1.5} />
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 hover:text-black transition-colors cursor-pointer"
              aria-label="Panier"
            >
              <div className="relative">
                <ShoppingBag size={21} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-black text-white text-[9px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </div>
              <span className="text-sm font-medium text-black hidden md:block">Panier</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Bottom Navigation Bar (Desktop Only) ─── */}
      <nav className="w-full bg-[#1C1917] text-white hidden md:block">
        <div className="container-wide mx-auto px-4 md:px-8">
          <ul className="flex items-center justify-center text-[11px] font-semibold tracking-[0.15em] uppercase">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block py-3.5 px-5 hover:bg-white/10 transition-colors cursor-pointer ${
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

      {/* ─── Mobile Menu Drawer ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/40 z-[110] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-y-0 left-0 w-[82%] max-w-[340px] bg-white z-[120] flex flex-col md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 h-[72px] border-b border-gray-100 flex-shrink-0">
                <Image 
                  src="/logo-removebg-preview.png" 
                  alt="Collectif Design" 
                  width={200} 
                  height={60} 
                  className="h-[44px] w-auto object-contain" 
                />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black cursor-pointer"
                  aria-label="Fermer"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Search */}
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 rounded-lg py-3 px-4 pr-10 text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 font-sans"
                  />
                  <Search size={17} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-2">
                {navigation.map((item, idx) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-3.5 px-6 text-[13px] font-semibold tracking-[0.12em] uppercase cursor-pointer active:bg-gray-50 transition-colors ${
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
              <div className="flex-shrink-0 border-t border-gray-100 bg-gray-50/80 px-5 py-4 flex items-center justify-around">
                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center gap-1.5 cursor-pointer">
                  <User size={19} strokeWidth={1.3} />
                  <span className="text-[9px] uppercase font-semibold tracking-[0.15em] text-gray-500">Compte</span>
                </Link>
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center gap-1.5 cursor-pointer">
                  <Heart size={19} strokeWidth={1.3} />
                  <span className="text-[9px] uppercase font-semibold tracking-[0.15em] text-gray-500">Favoris</span>
                </Link>
                <button onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }} className="flex flex-col items-center gap-1.5 cursor-pointer">
                  <ShoppingBag size={19} strokeWidth={1.3} />
                  <span className="text-[9px] uppercase font-semibold tracking-[0.15em] text-gray-500">Panier</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
