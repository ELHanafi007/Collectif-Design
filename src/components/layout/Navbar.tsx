'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Sun, Moon, User } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCart } from '@/components/providers/CartProvider';
import { useTheme } from '@/components/providers/ThemeProvider';

const navigation = {
  categories: [
    {
      name: 'Salons',
      href: '/categories/salons',
      subcategories: ['Canapés', 'Fauteuils', 'Chaises', 'Poufs'],
      image: '/salon.jpeg'
    },
    {
      name: 'Tables',
      href: '/categories/tables-basses',
      subcategories: ['Tables Basses', 'Consoles', 'Tables à Manger', 'Tables d’Appoint'],
      image: '/tabledebasse.jpeg'
    },
    {
      name: 'Chambre',
      href: '/categories/tables-de-chevet',
      subcategories: ['Tables de Chevet', 'Suites', 'Lits'],
      image: '/tablesdechevet.jpeg'
    },
    {
      name: 'Rangement',
      href: '/categories/bibliotheques',
      subcategories: ['Bibliothèques', 'Buffets', 'Meubles TV'],
      image: '/bibliotheque.jpeg'
    }
  ],
  featured: [
    { name: 'Catalogue', href: '/shop' },
    { name: 'Packs Promo', href: '/packs-promo' },
    { name: 'Showroom', href: '/about' }
  ]
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(navigation.categories[0]);
  const { setIsCartOpen, cart } = useCart();
  const { theme, toggleTheme } = useTheme();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed left-0 top-0 z-[100] w-full transition-all duration-1000 px-6 py-6 md:px-12',
          isScrolled ? 'py-4' : 'py-10'
        )}
      >
        <div
          className={cn(
            'mx-auto max-w-[1800px] rounded-full transition-all duration-700 px-10 py-5 flex items-center justify-between',
            isScrolled || isMenuOpen ? 'bg-premium-dark/80 backdrop-blur-3xl shadow-2xl border border-white/5' : 'bg-transparent'
          )}
        >
          <Link href="/" className="flex items-center gap-4" onClick={() => setIsMenuOpen(false)}>
             <span className={cn(
                "text-2xl font-serif tracking-tightest uppercase transition-colors duration-700",
                isScrolled || isMenuOpen ? "text-premium-white" : "text-foreground"
              )}>
                Collectif<span className="text-accent">.</span>
              </span>
          </Link>

          <div className="hidden items-center gap-12 lg:flex">
            {navigation.featured.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[9px] font-bold uppercase tracking-[0.6em] transition-all hover:text-accent",
                  isScrolled || isMenuOpen ? "text-premium-white/40" : "text-foreground/40"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-10">
            <button 
              onClick={toggleTheme}
              className={cn(
                "group relative flex h-7 w-14 items-center rounded-full transition-all duration-500 p-1",
                theme === 'dark' ? "bg-accent/20" : "bg-foreground/5"
              )}
            >
              <div 
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full transition-all duration-500 shadow-sm",
                  theme === 'dark' ? "translate-x-7 bg-accent" : "translate-x-0 bg-foreground"
                )}
              >
                {theme === 'light' ? (
                  <Moon size={10} className="text-background" strokeWidth={3} />
                ) : (
                  <Sun size={10} className="text-background" strokeWidth={3} />
                )}
              </div>
            </button>
            <Link href="/admin" className={cn(
              "transition-colors hover:text-accent hidden md:block",
              isScrolled || isMenuOpen ? "text-premium-white" : "text-foreground"
            )}>
              <User size={18} strokeWidth={1.5} />
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className={cn(
                "relative transition-colors hover:text-accent",
                isScrolled || isMenuOpen ? "text-premium-white" : "text-foreground"
              )}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[7px] font-bold text-premium-dark shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className={cn(
                "group flex items-center gap-5 rounded-full px-10 py-3.5 transition-all duration-700",
                isScrolled || isMenuOpen ? "bg-premium-white text-premium-dark" : "bg-foreground/10 text-foreground backdrop-blur-3xl border border-border/10"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.4em]">{isMenuOpen ? 'Close' : 'Menu'}</span>
              <div className="flex flex-col gap-1.5 w-5">
                <span className={cn("h-[1px] w-full bg-current transition-all duration-500", isMenuOpen && "rotate-45 translate-y-2")} />
                <span className={cn("h-[1px] w-full bg-current transition-all duration-500", isMenuOpen && "opacity-0 scale-x-0")} />
                <span className={cn("h-[1px] w-full bg-current transition-all duration-500", isMenuOpen && "-rotate-45 -translate-y-2")} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mega Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-premium-dark text-premium-white pt-48"
          >
            <div className="mx-auto max-w-[1800px] px-12 h-full flex flex-col lg:flex-row gap-24 pb-24">
              <div className="flex-[1.5] flex flex-col justify-center space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-premium-white/10 mb-12 block">
                  Studio Universes
                </span>
                {navigation.categories.map((cat) => (
                  <button
                    key={cat.name}
                    onMouseEnter={() => setActiveCategory(cat)}
                    className={cn(
                      "group flex w-full items-center justify-between text-left transition-all duration-700",
                      activeCategory.name === cat.name ? "text-accent translate-x-12" : "text-premium-white/10 hover:text-premium-white"
                    )}
                  >
                    <span className="text-6xl md:text-[10vw] font-medium tracking-tightest lowercase leading-[0.8]">
                      {cat.name}<span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">.</span>
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex-1 hidden lg:flex flex-col justify-center gap-16">
                <div className="relative aspect-[16/11] rounded-[4rem] overflow-hidden bg-white/5 border border-white/5">
                  <motion.img
                    key={activeCategory.image}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    src={activeCategory.image}
                    alt={activeCategory.name}
                    className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]"
                  />
                  <div className="absolute inset-0 bg-premium-dark/20" />
                </div>

                <div className="space-y-12">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-premium-white/10 block">
                    Curated {activeCategory.name} Selection
                  </span>
                  <div className="grid grid-cols-2 gap-x-20 gap-y-8">
                    {activeCategory.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        href={`${activeCategory.href}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-light text-premium-white/40 hover:text-accent transition-all hover:translate-x-4 lowercase"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full px-12 py-12 border-t border-white/5 flex items-center justify-between">
               <div className="flex gap-20">
                <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="text-[9px] font-bold uppercase tracking-[0.6em] hover:text-accent transition-colors">Catalogue</Link>
                <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-[9px] font-bold uppercase tracking-[0.6em] hover:text-accent transition-colors">Histoire</Link>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-[9px] font-bold uppercase tracking-[0.6em] hover:text-accent transition-colors">Contact</Link>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-premium-white/10">© 2024 Collectif Design Studio</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
