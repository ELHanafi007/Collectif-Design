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
    <header className="fixed top-0 left-0 w-full z-[100] bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Top Bar */}
      <div className="container-wide mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-28">
        
        {/* Mobile Hamburger Icon */}
        <button 
          className="md:hidden text-black p-3 -ml-3 active:scale-95 transition-transform cursor-pointer"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
          <Image 
            src="/logo-removebg-preview.png" 
            alt="Collectif Design" 
            width={500} 
            height={150} 
            className="object-contain h-14 md:h-28 w-auto transform scale-[1.4] md:scale-150 origin-center md:origin-left" 
            priority
          />
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
          <input 
            type="text"
            placeholder="Search for products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-sm py-2 px-4 text-sm focus:outline-none focus:border-gray-400 font-sans"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
            <Search size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-6 text-gray-600">
          <Link href="/account" className="hidden sm:block hover:text-black transition-colors cursor-pointer">
            <User size={22} strokeWidth={1.5} />
          </Link>
          <Link href="/wishlist" className="hidden sm:block hover:text-black transition-colors cursor-pointer">
            <Heart size={22} strokeWidth={1.5} />
          </Link>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 hover:text-black transition-colors p-2 -mr-2 md:mr-0 md:p-0 active:scale-95 md:active:scale-100 cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </div>
            <span className="text-sm font-semibold text-black hidden sm:block">0 DH</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation (Desktop Only) */}
      <nav className="w-full bg-[#2a2a2a] text-white hidden md:block">
        <div className="container-wide mx-auto px-4 md:px-8">
          <ul className="flex items-center justify-center text-xs font-bold tracking-widest uppercase flex-wrap">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block py-3 px-6 hover:bg-black/20 transition-colors ${
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[110] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-[360px] bg-white z-[120] flex flex-col md:hidden overflow-y-auto safe-bottom"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="pl-2">
                  <Image src="/logo-removebg-preview.png" alt="Collectif Design" width={300} height={100} className="object-contain h-12 w-auto transform scale-[1.4] origin-left" />
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-black active:scale-95 transition-all cursor-pointer">
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="px-5 py-4 border-b border-gray-50 relative">
                <input 
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f5f5f3] border-0 rounded-lg py-3.5 px-4 text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 font-sans placeholder:text-gray-400"
                />
                <button className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                  <Search size={18} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex-1 py-2 overflow-y-auto">
                <ul className="flex flex-col">
                  {navigation.map((item, idx) => (
                    <motion.li 
                      key={item.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between py-4 px-6 text-[13px] font-semibold tracking-[0.15em] uppercase active:bg-gray-50 transition-colors cursor-pointer ${
                          item.highlight ? 'text-[#0f8742]' : 'text-gray-900'
                        }`}
                      >
                        {item.name}
                        <ChevronRight size={14} className="text-gray-300" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="px-5 py-5 bg-[#fafaf8] flex items-center justify-around text-black border-t border-gray-100">
                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-transform">
                  <User size={20} strokeWidth={1.3} />
                  <span className="text-[9px] uppercase font-semibold tracking-[0.2em] text-gray-500">Compte</span>
                </Link>
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-transform">
                  <Heart size={20} strokeWidth={1.3} />
                  <span className="text-[9px] uppercase font-semibold tracking-[0.2em] text-gray-500">Favoris</span>
                </Link>
                <button onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }} className="flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-transform">
                  <ShoppingBag size={20} strokeWidth={1.3} />
                  <span className="text-[9px] uppercase font-semibold tracking-[0.2em] text-gray-500">Panier</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

