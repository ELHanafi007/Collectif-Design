'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCart } from '@/components/providers/CartProvider';

const navigation = {
  main: [
    { name: 'Accueil', href: '/' },
    { name: 'Catalogue', href: '/shop' },
    { name: 'Packs Promo', href: '/packs-promo' },
    { name: 'L\'Atelier', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ],
  categories: [
    { name: 'Salon', href: '/categories/salons' },
    { name: 'Chambre', href: '/categories/tables-de-chevet' },
    { name: 'Salle à Manger', href: '/categories/tables-a-manger' },
    { name: 'Tables Basses', href: '/categories/tables-basses' },
    { name: 'Décoration', href: '/categories/decoration' },
    { name: 'Rangement', href: '/categories/bibliotheques' }
  ]
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsCartOpen, cart } = useCart();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed left-0 top-0 z-[100] w-full transition-all duration-500',
          isScrolled ? 'py-3' : 'py-5'
        )}
      >
        <div className="container-wide px-6">
          <div
            className={cn(
              'mx-auto flex items-center justify-between rounded-full transition-all duration-500 px-6 md:px-8 py-3',
              isScrolled 
                ? 'bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-border/50' 
                : 'bg-transparent'
            )}
          >
            {/* Logo */}
            <Link href="/" className="relative z-10" onClick={() => setIsMenuOpen(false)}>
              <span className="text-lg md:text-xl font-serif tracking-tightest uppercase">
                Collectif<span className="text-muted italic lowercase font-light">.design</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 lg:flex">
              {navigation.main.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[10px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-muted"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-5">
              <button className="hidden md:block transition-colors hover:text-muted">
                <Search size={17} strokeWidth={1.5} />
              </button>
              <Link href="/admin" className="hidden md:block transition-colors hover:text-muted">
                <User size={17} strokeWidth={1.5} />
              </Link>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative transition-colors hover:text-muted"
              >
                <ShoppingBag size={17} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[7px] font-bold text-background">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="flex items-center justify-center transition-colors hover:text-muted lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
              {/* Desktop menu toggle */}
              <button
                className="hidden lg:flex items-center justify-center transition-colors hover:text-muted"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-background/98 backdrop-blur-3xl flex items-center"
          >
            <div className="container-wide px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
              {/* Main Nav */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted block mb-8">
                  Navigation
                </span>
                {navigation.main.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-4xl md:text-6xl font-serif hover:text-muted transition-colors py-1"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Categories + Contact */}
              <div className="hidden lg:flex flex-col justify-center border-l border-border pl-16 space-y-12">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted block">Catégories</span>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {navigation.categories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-base font-light hover:text-muted transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted block">Contact</span>
                  <div className="space-y-2">
                    <p className="text-sm font-light text-muted">Casablanca · Rabat · Marrakech · Tanger</p>
                    <p className="text-sm font-light text-muted">contact@collectif.design</p>
                    <p className="text-sm font-light text-muted">+212 5 22 00 00 00</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
