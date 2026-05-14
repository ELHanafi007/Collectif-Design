'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCart } from '@/components/providers/CartProvider';
import { useTheme } from '@/components/providers/ThemeProvider';

const navigation = {
  categories: [
    {
      name: 'Salons',
      href: '/categories/salons',
      subcategories: ['Salons Marocains', 'Salons Modernes', 'Salons en L', 'Fauteuils'],
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Canapés',
      href: '/categories/canapes',
      subcategories: ['Canapés Fixes', 'Canapés Convertibles', 'Canapés d’Angle'],
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Chambre',
      href: '/categories/chambre',
      subcategories: ['Chambres à Coucher', 'Lits', 'Armoires', 'Tables de Chevet'],
      image: 'https://images.unsplash.com/photo-1505693419148-db306597aa38?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Salle à Manger',
      href: '/categories/salle-a-manger',
      subcategories: ['Tables à Manger', 'Chaises', 'Buffets'],
      image: 'https://images.unsplash.com/photo-1617806118233-18e1db20706a?auto=format&fit=crop&q=80&w=600'
    }
  ],
  featured: [
    { name: 'Packs Promo', href: '/packs-promo' },
    { name: 'Nouveautés', href: '/new-arrivals' },
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
            isScrolled || isMenuOpen ? 'bg-[#121414]/80 backdrop-blur-3xl shadow-2xl border border-[#e3e2e2]/5' : 'bg-transparent'
          )}
        >
          <Link href="/" className="flex items-center gap-4" onClick={() => setIsMenuOpen(false)}>
            <img 
              src="/logo.jpg" 
              alt="Collectif Design Logo" 
              className={cn(
                "h-12 md:h-14 w-auto object-contain transition-all duration-700",
                theme === 'dark' 
                  ? (isScrolled || isMenuOpen ? "brightness-100" : "brightness-0 invert")
                  : (isScrolled || isMenuOpen ? "brightness-0" : "brightness-0")
              )} 
            />
          </Link>

          <div className="hidden items-center gap-12 lg:flex">
            {navigation.featured.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[9px] font-bold uppercase tracking-[0.6em] transition-all hover:text-accent",
                  isScrolled || isMenuOpen ? "text-[#e3e2e2]/40" : "text-[#e3e2e2]/60"
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
            <button className={cn(
              "transition-colors hover:text-accent hidden md:block",
              isScrolled || isMenuOpen ? "text-[#e3e2e2]" : "text-[#e3e2e2]"
            )}>
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className={cn(
                "relative transition-colors hover:text-accent",
                isScrolled || isMenuOpen ? "text-[#e3e2e2]" : "text-[#e3e2e2]"
              )}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[7px] font-bold text-[#121414] shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className={cn(
                "group flex items-center gap-5 rounded-full px-10 py-3.5 transition-all duration-700",
                isScrolled || isMenuOpen ? "bg-[#e3e2e2] text-[#121414]" : "bg-[#e3e2e2]/10 text-[#e3e2e2] backdrop-blur-3xl border border-[#e3e2e2]/10"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.4em]">{isMenuOpen ? 'Fermer' : 'Menu'}</span>
              <div className="flex flex-col gap-1.5 w-5">
                <span className={cn("h-[1px] w-full bg-current transition-all duration-500", isMenuOpen && "rotate-45 translate-y-2")} />
                <span className={cn("h-[1px] w-full bg-current transition-all duration-500", isMenuOpen && "opacity-0 scale-x-0")} />
                <span className={cn("h-[1px] w-full bg-current transition-all duration-500", isMenuOpen && "-rotate-45 -translate-y-2")} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mega Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-premium-dark text-white pt-48"
          >
            <div className="mx-auto max-w-[1800px] px-12 h-full flex flex-col lg:flex-row gap-24 pb-24">
              {/* Left Side: Categories */}
              <div className="flex-[1.5] flex flex-col justify-center space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 mb-12 block">
                  Collections Studio
                </span>
                {navigation.categories.map((cat) => (
                  <button
                    key={cat.name}
                    onMouseEnter={() => setActiveCategory(cat)}
                    className={cn(
                      "group flex w-full items-center justify-between text-left transition-all duration-700",
                      activeCategory.name === cat.name ? "text-accent translate-x-6" : "text-white/10 hover:text-white"
                    )}
                  >
                    <span className="text-6xl md:text-[10vw] font-medium tracking-tightest lowercase leading-[0.8]">
                      {cat.name}<span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">.</span>
                    </span>
                  </button>
                ))}
              </div>

              {/* Right Side: Visual & Links */}
              <div className="flex-1 hidden lg:flex flex-col justify-center gap-16">
                <div className="relative aspect-[16/11] rounded-[4rem] overflow-hidden bg-white/5 shadow-3xl">
                  <motion.img
                    key={activeCategory.image}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "expo.out" }}
                    src={activeCategory.image}
                    alt={activeCategory.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-premium-dark/20" />
                </div>

                <div className="space-y-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 block">
                    Explorer {activeCategory.name}
                  </span>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                    {activeCategory.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        href={`${activeCategory.href}?sub=${sub.toLowerCase().replace(/ /g, '-')}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-light text-white/40 hover:text-accent transition-all hover:translate-x-3"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="absolute bottom-0 left-0 w-full px-12 py-12 border-t border-white/5 flex items-center justify-between">
               <div className="flex gap-16">
                <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-[10px] font-bold uppercase tracking-[0.4em] hover:text-accent transition-colors">L'Histoire</Link>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-[10px] font-bold uppercase tracking-[0.4em] hover:text-accent transition-colors">Showroom</Link>
              </div>
              <div className="flex items-center gap-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">© 2024 Collectif Design Studio</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
