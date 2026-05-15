'use client';

import { useState } from 'react';
import { ShoppingBag, Search, User, Heart, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/providers/CartProvider';

const navigation = [
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
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="w-full flex flex-col bg-white border-b border-gray-200">
      {/* Top Bar - White */}
      <div className="container-wide px-4 h-[90px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex flex-col justify-center">
          <div className="flex items-center">
            <span className="text-4xl font-light tracking-tight text-black">
              <span className="font-bold border border-black rounded-full px-2 py-0.5 mr-0.5">S</span>
              KETCH
            </span>
          </div>
          <span className="text-[10px] tracking-[0.3em] ml-12 text-gray-500 uppercase">Design</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-3xl mx-8 px-4 hidden md:block">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for products" 
              className="w-full border border-gray-300 py-2.5 px-4 text-sm focus:outline-none focus:border-gray-400"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              <Search size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 text-gray-700 flex-shrink-0">
          <button className="hover:text-black transition-colors">
            <User size={22} strokeWidth={1.5} />
          </button>
          <button className="hover:text-black transition-colors">
            <Heart size={22} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            <div className="relative">
              <ShoppingBag size={22} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span className="text-sm font-medium hidden sm:block">0 DH</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar - Black */}
      <div className="bg-[#2a2a2a] w-full border-t-[3px] border-[#2a2a2a]">
        <div className="container-wide flex items-center justify-center relative">
          <div className="flex items-center h-[46px]">
            {/* Promo Button */}
            <Link 
              href="/packs-promo" 
              className="bg-[#0b6f3b] text-white text-xs font-bold uppercase tracking-wider h-full flex items-center px-6 hover:bg-[#09592f] transition-colors"
            >
              Packs Promo
            </Link>
            
            {/* Navigation Links */}
            <div className="flex items-center h-full">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/90 hover:text-white text-[11px] font-medium uppercase tracking-wider h-full flex items-center px-5 gap-1 group transition-colors"
                >
                  {item.name}
                  <ChevronDown size={12} className="opacity-50 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
