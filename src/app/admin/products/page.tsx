"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminProductsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard?tab=products");
  }, [router]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-8">
      <div className="h-16 w-[1px] bg-border relative overflow-hidden">
        <div className="absolute inset-0 bg-accent animate-pulse" />
      </div>
      <p className="text-[9px] uppercase tracking-[0.8em] text-muted/40 animate-pulse">Redirection vers l'Atelier...</p>
    </div>
  );
}
