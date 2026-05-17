'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Heart, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';
import { AnimatePresence, motion } from 'framer-motion';

const navigation = [
  { name: 'PACKS PROMO', href: '/packs-promo', highlight: true, image: '/hero.jpeg' },
  { name: 'SALONS', href: '/categories/salons', image: '/salon.jpeg' },
  { name: 'CANAPÉS', href: '/categories/canapes', image: '/salon.jpeg' },
  { name: 'CHAMBRE', href: '/categories/chambre', image: '/tablesdechevet.jpeg' },
  { name: 'TABLES', href: '/categories/tables', image: '/table a manger.jpeg' },
  { name: 'CHAISES', href: '/categories/chaises', image: '/salon.jpeg' },
  { name: 'JARDIN', href: '/categories/jardin', image: '/salon.jpeg' },
  { name: 'MEUBLES', href: '/categories/meubles', image: '/hero.jpeg' },
  { name: 'DÉCO', href: '/categories/deco', image: '/decoration.jpeg' }
];

/* ─── Easing ─── */
const easeExpo = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const { setIsCartOpen, cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenuImage, setActiveMenuImage] = useState('/salon.jpeg');
  const [localTime, setLocalTime] = useState('');

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Scroll Lock when full-screen overlay is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Digital luxury clock inside menu
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Africa/Casablanca'
      };
      setLocalTime(date.toLocaleTimeString('fr-FR', options) + ' GMT+1 (CASABLANCA)');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[100]">
      {/* ─── Main Premium Bar ─── */}
      <div 
        className={`relative transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'bg-transparent border-transparent z-[125]' 
            : 'bg-white/95 backdrop-blur-md border-b border-gray-100 z-[105]'
        }`}
      >
        <div className="container-wide mx-auto px-5 md:px-12 flex items-center justify-between h-[84px] md:h-[116px]">
          
          {/* LEFT: Masterpiece Menu Trigger */}
          <div className="flex items-center gap-4 flex-1 md:flex-none relative z-[130]">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="group relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer focus:outline-none"
              aria-label="Toggle Menu"
            >
              {/* Animated Outer Circle */}
              <span className={`absolute inset-0 rounded-full border transition-all duration-500 ease-out ${isMobileMenuOpen ? 'border-white/20 group-hover:border-white' : 'border-gray-200 group-hover:border-black group-hover:scale-105'}`} />
              <span className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 opacity-[0.03] transition-transform duration-500 ease-out ${isMobileMenuOpen ? 'bg-white' : 'bg-black'}`} />
              
              {/* Asymmetric Morphing Lines */}
              <div className="relative w-5 h-3 flex flex-col justify-between items-center">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 5.5, backgroundColor: '#ffffff' } : { rotate: 0, y: 0, backgroundColor: '#000000' }}
                  transition={{ duration: 0.4, ease: easeExpo }}
                  className="w-5 h-[1.5px] block origin-center"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: easeExpo }}
                  className="w-5 h-[1.5px] bg-black block"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -5.5, width: "20px", backgroundColor: '#ffffff' } : { rotate: 0, y: 0, width: "13px", backgroundColor: '#000000' }}
                  transition={{ duration: 0.4, ease: easeExpo }}
                  className="h-[1.5px] block origin-center self-end group-hover:w-5 transition-[width] duration-300"
                />
              </div>
            </button>
            <span 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`hidden lg:inline-block text-[10px] font-bold uppercase tracking-[0.25em] cursor-pointer select-none transition-colors duration-500 ${
                isMobileMenuOpen ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-black'
              }`}
            >
              {isMobileMenuOpen ? 'Fermer' : 'Menu'}
            </span>
          </div>

          {/* CENTER: Grand Logo (Overlapping Masterpiece) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[126]">
            <Link href="/" className="relative block" onClick={() => setIsMobileMenuOpen(false)}>
              <Image 
                src="/logo-removebg-preview.png" 
                alt="Collectif Design" 
                width={500} 
                height={160} 
                className={`h-[160px] md:h-[280px] w-auto object-contain transition-all duration-500 hover:scale-105 ${
                  isMobileMenuOpen ? 'invert brightness-200' : ''
                }`} 
                priority
              />
            </Link>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2 md:gap-4 flex-1 md:flex-none justify-end relative z-[130]">
            {/* Elegant Search Trigger */}
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}
              className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors cursor-pointer active:scale-95 ${
                isMobileMenuOpen 
                  ? 'text-white/60 hover:text-white hover:bg-white/10' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
              aria-label="Rechercher"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Account */}
            <Link 
              href="/account" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`hidden md:flex items-center justify-center w-11 h-11 rounded-full transition-colors cursor-pointer ${
                isMobileMenuOpen 
                  ? 'text-white/60 hover:text-white hover:bg-white/10' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              <User size={20} strokeWidth={1.5} />
            </Link>

            {/* Wishlist */}
            <Link 
              href="/wishlist" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`hidden md:flex items-center justify-center w-11 h-11 rounded-full transition-colors cursor-pointer ${
                isMobileMenuOpen 
                  ? 'text-white/60 hover:text-white hover:bg-white/10' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              <Heart size={20} strokeWidth={1.5} />
            </Link>

            {/* Cart */}
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }}
              className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-colors cursor-pointer active:scale-95 ${
                isMobileMenuOpen 
                  ? 'text-white/60 hover:text-white hover:bg-white/10' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
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
      <nav className="w-full bg-[#1C1917] text-white hidden md:block relative z-[104]">
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

      {/* ─── Grand Masterpiece Full-Screen Curtain Overlay Menu ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Curtain Panel 1 (Gold Accent Panel) */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.6, ease: easeExpo }}
              className="fixed inset-0 bg-[#CA8A04] z-[110]"
            />

            {/* Curtain Panel 2 (Dark Charcoal Main Panel) */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.7, delay: 0.05, ease: easeExpo }}
              className="fixed inset-0 bg-[#1C1917] text-white z-[115] flex flex-col justify-between overflow-hidden"
            >
              {/* Background Subtle Lines */}
              <div className="absolute inset-0 grid grid-cols-4 opacity-5 pointer-events-none">
                <div className="border-r border-white h-full" />
                <div className="border-r border-white h-full" />
                <div className="border-r border-white h-full" />
                <div className="h-full" />
              </div>

              {/* Top Padding spacer to not clash with header bar */}
              <div className="h-[84px] md:h-[116px] flex-shrink-0" />

              {/* Main Menu Grid */}
              <div className="flex-1 container-wide mx-auto px-6 md:px-12 py-10 flex items-center justify-between relative z-10 overflow-y-auto">
                {/* Editorial Link List (Left Side) */}
                <div className="flex flex-col space-y-4 md:space-y-6 max-w-2xl w-full py-8">
                  {navigation.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + idx * 0.04, ease: easeExpo }}
                      onMouseEnter={() => setActiveMenuImage(item.image)}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group relative flex items-baseline gap-4 font-serif text-3xl md:text-6xl lg:text-7xl font-normal leading-tight tracking-wide hover:italic cursor-pointer select-none transition-all duration-300 ${
                          item.highlight ? 'text-[#CA8A04]' : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {/* Number Index */}
                        <span className="text-[10px] md:text-xs font-sans tracking-widest text-[#CA8A04] opacity-50 group-hover:opacity-100 transition-opacity">
                          0{idx + 1}
                        </span>
                        
                        {/* Label */}
                        <span className="relative">
                          {item.name}
                          
                          {/* Animated underline */}
                          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-500 ease-out" />
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Dynamic Cinematic Preview Frame (Right Side - Desktop Only) */}
                <div className="hidden lg:block w-[400px] xl:w-[500px] h-[55vh] relative rounded-lg overflow-hidden border border-white/10 group shadow-2xl mr-12 flex-shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMenuImage}
                      initial={{ opacity: 0, scale: 1.08, filter: 'blur(5px)' }}
                      animate={{ opacity: 0.7, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeMenuImage}
                        alt="Preview Category"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[9px] uppercase tracking-[0.4em] text-[#CA8A04] font-bold block mb-1">
                      COLLECTIF STUDIO
                    </span>
                    <h4 className="font-serif text-lg italic text-white/90">
                      Mobilier haut de gamme de fabrication artisanale.
                    </h4>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Info Section */}
              <div className="border-t border-white/10 bg-black/30 py-6 md:py-8 flex-shrink-0 relative z-10">
                <div className="container-wide mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Local Digital Clock */}
                  <div className="text-center md:text-left space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">DISPONIBILITÉ SHOWROOM</p>
                    <p className="text-xs font-mono text-white/70 tracking-wide">{localTime}</p>
                  </div>

                  {/* High-end Boutique Metadata */}
                  <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-semibold tracking-widest text-white/50 uppercase">
                    <span className="hover:text-[#CA8A04] transition-colors cursor-pointer">Boutique</span>
                    <span className="hover:text-[#CA8A04] transition-colors cursor-pointer">Inspiration</span>
                    <span className="hover:text-[#CA8A04] transition-colors cursor-pointer">Atelier</span>
                    <span className="hover:text-[#CA8A04] transition-colors cursor-pointer">Contact</span>
                  </div>

                  {/* Social links */}
                  <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest text-[#CA8A04]">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a>
                    <span className="text-white/20">|</span>
                    <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WHATSAPP</a>
                  </div>
                </div>
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
