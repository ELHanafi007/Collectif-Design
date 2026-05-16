'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
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
    <header className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="container-wide mx-auto px-4 md:px-8 flex items-center justify-between h-20 md:h-24">
        
        {/* Mobile Hamburger Icon */}
        <button 
          className="md:hidden text-black p-2 -ml-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} strokeWidth={1.5} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
          {/* Logo is super big on mobile (h-20 scale-125), and large on desktop (h-14) */}
          <Image 
            src="/logo.jpg" 
            alt="Collectif Design" 
            width={300} 
            height={80} 
            className="object-contain h-16 sm:h-20 md:h-14 w-auto transform scale-125 md:scale-100 origin-center md:origin-left" 
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
        <div className="flex items-center gap-4 md:gap-6 text-gray-600">
          <Link href="/account" className="hidden sm:block hover:text-black transition-colors">
            <User size={22} strokeWidth={1.5} />
          </Link>
          <Link href="/wishlist" className="hidden sm:block hover:text-black transition-colors">
            <Heart size={22} strokeWidth={1.5} />
          </Link>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            <div className="relative">
              <ShoppingBag size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
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
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white z-[120] flex flex-col md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <Image src="/logo.jpg" alt="Collectif Design" width={150} height={40} className="object-contain h-10 w-auto" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-black">
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-gray-100 relative">
                <input 
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-gray-400 font-sans"
                />
                <button className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={18} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex-1 py-4">
                <ul className="flex flex-col text-sm font-bold tracking-widest uppercase">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-4 px-6 border-b border-gray-50 ${
                          item.highlight ? 'text-[#0f8742]' : 'text-black'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-6 bg-gray-50 flex items-center justify-around text-black border-t border-gray-200">
                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center gap-1">
                  <User size={20} strokeWidth={1.5} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Compte</span>
                </Link>
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center gap-1">
                  <Heart size={20} strokeWidth={1.5} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Favoris</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

