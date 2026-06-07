'use client';

import Link from 'next/link';
import { ArrowUpRight, Globe, Mail, Share2 } from 'lucide-react';
import { CONTACT_INFO } from '@/data/contact';

const footerLinks = {
  shop: [
    { name: 'Packs Promo', href: '/packs-promo' },
    { name: 'Salons', href: '/categories/salons' },
    { name: 'Espaces Repas', href: '/categories/tables-a-manger' },
    { name: 'Chambre', href: '/categories/chambre' },
  ],
  studio: [
    { name: 'Notre Histoire', href: '/about' },
    { name: 'Showroom', href: '/about#showroom' },
    { name: 'Collaborations', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Confidentialité', href: '/confidentialite' },
    { name: 'Conditions', href: '/conditions' },
    { name: 'Livraison', href: '/livraison' },
  ]
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background text-foreground pt-32 pb-16 px-6 md:px-12 lg:px-24 border-t border-border mt-20">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-serif tracking-tightest uppercase">
                Collectif<span className="text-accent italic lowercase font-light">.design</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs font-light">
              L&apos;excellence du mobilier sur mesure. Chaque pièce est une narration, chaque espace une expérience.
            </p>
            <div className="flex gap-4">
              <a href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all cursor-pointer" aria-label="Partager sur WhatsApp">
                <Share2 size={16} strokeWidth={1.5} />
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all cursor-pointer">
                <Mail size={16} strokeWidth={1.5} />
              </a>
              <Link href="/about" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all cursor-pointer" aria-label="Découvrir Collectif Design">
                <Globe size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">Boutique</h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted hover:text-foreground transition-all text-sm font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">L&apos;Atelier</h4>
            <ul className="space-y-4">
              {footerLinks.studio.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted hover:text-foreground transition-all text-sm font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">Le Journal</h4>
            <p className="text-sm text-muted font-light leading-relaxed">
              Inscrivez-vous pour recevoir des inspirations exclusives et être informé de nos nouvelles collections.
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
                const message = `Bonjour Collectif Design, je souhaite m'inscrire à votre journal avec l'adresse : ${email}`;
                window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="flex gap-2"
            >
              <input 
                name="email"
                type="email" 
                required
                placeholder="Votre adresse email"
                className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-all font-light"
              />
              <button type="submit" className="bg-foreground text-background px-6 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all">
                Ok
              </button>
            </form>
          </div>
        </div>

        {/* Huge Text */}
        <div className="relative overflow-hidden mb-20 pointer-events-none select-none">
           <h2 className="text-[15vw] font-serif tracking-tightest leading-none text-muted/5 whitespace-nowrap">
             COLLECTIF DESIGN STUDIO
           </h2>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex gap-8 text-[9px] font-bold uppercase tracking-[0.4em] text-muted">
            {footerLinks.legal.map(link => (
              <Link key={link.name} href={link.href} className="hover:text-foreground transition-colors">{link.name}</Link>
            ))}
          </div>
          
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted">
            © 2026 Collectif Design. Tous droits réservés.
          </p>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em] text-muted hover:text-foreground transition-all"
          >
            Retour en haut
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
