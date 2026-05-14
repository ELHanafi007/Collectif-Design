'use client';

import Link from 'next/link';
import { ArrowUpRight, Globe } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'Packs Promo', href: '/packs-promo' },
    { name: 'Salons', href: '/categories/salons' },
    { name: 'Canapés', href: '/categories/canapes' },
    { name: 'Chambre', href: '/categories/chambre' },
  ],
  studio: [
    { name: 'Notre Histoire', href: '/about' },
    { name: 'Showroom', href: '/about#showroom' },
    { name: 'Artisanat', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Confidentialité', href: '#' },
    { name: 'Conditions', href: '#' },
    { name: 'Livraison', href: '#' },
  ]
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface text-foreground pt-48 pb-16 px-6 md:px-12 lg:px-24 rounded-t-[5rem] transition-colors duration-700">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-48">
          {/* Brand Col */}
          <div className="space-y-10">
            <Link href="/" className="inline-block">
              <img 
                src="/logo.jpg" 
                alt="Collectif Design Logo" 
                className="h-14 w-auto object-contain dark:brightness-0 dark:invert brightness-0" 
              />
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs font-light">
              Redéfinir l'art de vivre marocain à travers le design contemporain et l'artisanat d'exception.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-700">
                <Globe size={18} strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent">Boutique</h4>
            <ul className="space-y-5">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted hover:text-foreground transition-all text-sm flex items-center gap-3 group font-light">
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent">Studio</h4>
            <ul className="space-y-5">
              {footerLinks.studio.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted hover:text-foreground transition-all text-sm flex items-center gap-3 group font-light">
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent">Newsletter</h4>
            <p className="text-sm text-muted font-light leading-relaxed">Inscrivez-vous pour recevoir nos actualités et invitations exclusives.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Votre email"
                className="w-full bg-background border border-border rounded-full px-8 py-5 text-sm focus:outline-none focus:border-accent/50 transition-all font-light"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-accent text-white px-6 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-border flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex gap-10 text-[9px] font-bold uppercase tracking-[0.4em] text-muted">
            {footerLinks.legal.map(link => (
              <Link key={link.name} href={link.href} className="hover:text-foreground transition-colors">{link.name}</Link>
            ))}
          </div>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.5em] text-muted hover:text-foreground transition-all group"
          >
            Back to top
            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-accent transition-all duration-700">
              <ArrowUpRight size={16} className="-rotate-45" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
