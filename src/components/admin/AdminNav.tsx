"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ShoppingBag, Layers, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

const adminLinks = [
  { name: "Produits", href: "/admin/dashboard?tab=products", tabVal: "products", icon: ShoppingBag },
  { name: "Catégories", href: "/admin/dashboard?tab=categories", tabVal: "categories", icon: Layers },
];

function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "products";

  return (
    <>
      {adminLinks.map((link) => {
        const isActive = pathname === "/admin/dashboard" && activeTab === link.tabVal;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "group flex items-center gap-4 px-0 py-3 transition-all duration-500",
              isActive ? "text-[#CA8A04]" : "text-[#F5F1EB]/40 hover:text-[#F5F1EB]"
            )}
          >
            <link.icon 
              size={16} 
              className={cn(
                "transition-transform duration-500 group-hover:scale-110", 
                isActive ? "text-[#CA8A04]" : "text-[#F5F1EB]/20"
              )} 
            />
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold">{link.name}</span>
            {isActive && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#CA8A04]" />
            )}
          </Link>
        );
      })}
    </>
  );
}

function MobileNavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "products";

  return (
    <>
      {adminLinks.map((link) => {
        const isActive = pathname === "/admin/dashboard" && activeTab === link.tabVal;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex flex-col items-center gap-2 transition-all duration-500",
              isActive ? "text-[#CA8A04]" : "text-[#F5F1EB]/40"
            )}
          >
            <link.icon size={18} />
            <span className="text-[8px] uppercase tracking-[0.3em] font-bold">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin");
    router.refresh();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#121414] h-screen fixed left-0 top-0 p-8 border-r border-[#2C2A29]">
        <div className="mb-16">
          <span className="text-xl font-serif text-[#F5F1EB] tracking-tighter uppercase block">
            COLLECTIF
            <span className="text-[#CA8A04] italic block text-[9px] tracking-[0.4em] mt-2 font-light">Atelier Control</span>
          </span>
        </div>
        
        <nav className="flex-1 space-y-4">
          <Suspense fallback={
            <div className="text-[8px] text-[#F5F1EB]/30 uppercase tracking-widest py-4">Chargement...</div>
          }>
            <NavLinks />
          </Suspense>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-0 py-6 text-[#F5F1EB]/20 hover:text-red-400 transition-colors mt-auto border-t border-[#2C2A29] cursor-pointer"
        >
          <LogOut size={16} />
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Déconnexion</span>
        </button>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#121414] border-t border-[#2C2A29] z-[100] px-8 py-5 flex justify-between items-center backdrop-blur-xl">
        <Suspense fallback={null}>
          <MobileNavLinks />
        </Suspense>
        <button 
          onClick={handleLogout}
          className="flex flex-col items-center gap-2 text-[#F5F1EB]/40 hover:text-red-400 transition-colors cursor-pointer"
        >
          <LogOut size={18} />
          <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Quitter</span>
        </button>
      </nav>
    </>
  );
}
