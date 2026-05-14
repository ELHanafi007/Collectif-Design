"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, MessageSquare, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { name: "Stats", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Produits", href: "/admin/products", icon: ShoppingBag },
  { name: "Demandes", href: "/admin/orders", icon: MessageSquare },
  { name: "Réglages", href: "/admin/settings", icon: Settings },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-premium-dark h-screen fixed left-0 top-0 p-8 border-r border-border/10">
        <div className="mb-16">
          <span className="text-xl font-serif text-premium-white tracking-tighter uppercase block">
            COLLECTIF
            <span className="text-accent italic block text-[9px] tracking-[0.4em] mt-2 font-light">Atelier Control</span>
          </span>
        </div>
        
        <nav className="flex-1 space-y-4">
          {adminLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "group flex items-center gap-4 px-0 py-3 transition-all duration-500",
                pathname === link.href ? "text-accent" : "text-premium-white/40 hover:text-premium-white"
              )}
            >
              <link.icon size={16} className={cn("transition-transform duration-500 group-hover:scale-110", pathname === link.href ? "text-accent" : "text-premium-white/20")} />
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold">{link.name}</span>
              {pathname === link.href && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        <button className="flex items-center gap-4 px-0 py-6 text-premium-white/20 hover:text-red-400 transition-colors mt-auto border-t border-border/10">
          <LogOut size={16} />
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Déconnexion</span>
        </button>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-premium-dark border-t border-border/20 z-[100] px-8 py-5 flex justify-between items-center backdrop-blur-xl">
        {adminLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex flex-col items-center gap-2 transition-all duration-500",
              pathname === link.href ? "text-accent" : "text-premium-white/40"
            )}
          >
            <link.icon size={18} />
            <span className="text-[8px] uppercase tracking-[0.3em] font-bold">{link.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
