'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';

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
  
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="container-wide mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
          <div className="flex flex-col items-start leading-none">
            <span className="text-3xl font-light tracking-widest text-black flex items-center">
              <span className="font-bold mr-[2px]">S</span>KETCH
            </span>
            <span className="text-[10px] tracking-[0.3em] text-gray-500 ml-6 uppercase">Design</span>
          </div>
        </Link>

        {/* Search Bar */}
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
        <div className="flex items-center gap-6 text-gray-600">
          <Link href="/account" className="hover:text-black transition-colors">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <Link href="/wishlist" className="hover:text-black transition-colors">
            <Heart size={20} strokeWidth={1.5} />
          </Link>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            <div className="relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
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

      {/* Bottom Navigation */}
      <nav className="w-full bg-[#2a2a2a] text-white">
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
    </header>
  );
}

