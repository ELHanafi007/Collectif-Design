'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sun, Moon, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCart } from '@/components/providers/CartProvider';
import { useTheme } from '@/components/providers/ThemeProvider';

const navigation = {
  categories: [
    { name: 'Salons', href: '/categories/salons', image: '/salon.jpeg' },
    { name: 'Tables', href: '/categories/tables-basses', image: '/tabledebasse.jpeg' },
    { name: 'Chambre', href: '/categories/tables-de-chevet', image: '/tablesdechevet.jpeg' },
    { name: 'Rangement', href: '/categories/bibliotheques', image: '/bibliotheque.jpeg' }
  ],
  featured: [
    { name: 'Catalogue', href: '/shop' },
    { name: 'Showroom', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          'fixed left-0 top-0 z-[100] w-full transition-all duration-1000 px-6 py-8 md:px-12',
          isScrolled ? 'py-4' : 'py-8'
        )}
      >
        <div
          className={cn(
            'mx-auto max-w-[1800px] rounded-full transition-all duration-700 px-10 py-5 flex items-center justify-between',
            isScrolled || isMenuOpen ? 'glass shadow-2xl' : 'bg-transparent'
          )}
        >
          <Link href="/" className="flex items-center gap-4" onClick={() => setIsMenuOpen(false)}>
             <span className={cn(
                "text-2xl font-serif tracking-tightest uppercase transition-colors duration-700",
                isScrolled || isMenuOpen || theme === 'dark' ? "text-foreground" : "text-white"
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
                  isScrolled || isMenuOpen || theme === 'dark' ? "text-foreground/40" : "text-white/40"
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
              "transition-colors hover:text-accent",
              isScrolled || isMenuOpen || theme === 'dark' ? "text-foreground" : "text-white"
            )}>
              <User size={18} strokeWidth={1.5} />
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className={cn(
                "relative transition-colors hover:text-accent",
                isScrolled || isMenuOpen || theme === 'dark' ? "text-foreground" : "text-white"
              )}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-background shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className={cn(
                "group flex h-12 w-12 items-center justify-center rounded-full transition-all duration-700",
                isScrolled || isMenuOpen || theme === 'dark' ? "bg-foreground text-background" : "bg-white/10 text-white backdrop-blur-3xl border border-white/10"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-background text-foreground pt-48"
          >
            <div className="mx-auto max-w-[1800px] px-12 h-full grid grid-cols-1 lg:grid-cols-2 gap-24 pb-24">
              <div className="flex flex-col justify-center space-y-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-accent mb-12 block">
                  Studio Universes
                </span>
                {navigation.categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="group block text-6xl md:text-8xl font-medium tracking-tightest lowercase leading-[0.8] hover:text-accent transition-all hover:translate-x-12"
                  >
                    {cat.name}<span className="text-accent">.</span>
                  </Link>
                ))}
              </div>

              <div className="hidden lg:flex flex-col justify-center gap-16 border-l border-border/50 pl-24">
                <div className="space-y-12">
                   {navigation.featured.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-4xl font-light hover:text-accent transition-all hover:translate-x-4 lowercase"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                
                <div className="pt-24 space-y-6">
                   <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted/40">Atelier Rabat</p>
                   <p className="text-sm font-light text-muted">Hay Riad, Avenue Annakhil, Villa 14</p>
                   <p className="text-sm font-light text-muted">+212 6 61 22 33 44</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
