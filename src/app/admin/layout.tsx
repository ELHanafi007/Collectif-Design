"use client";

import AdminNav from "@/components/admin/AdminNav";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin";
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(!isLoginPage);

  useEffect(() => {
    if (!isLoginPage) {
      const checkAuth = async () => {
        try {
          const response = await fetch("/api/admin/verify");
          if (!response.ok) {
            router.push("/admin");
          } else {
            setAuthorized(true);
          }
        } catch {
          router.push("/admin");
        }
        setLoading(false);
      };
      
      checkAuth();
    }
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="h-16 w-[1px] bg-border relative overflow-hidden">
            <div className="absolute inset-0 bg-accent animate-pulse" />
          </div>
          <p className="text-[9px] uppercase tracking-[0.8em] text-muted/40 animate-pulse">Authenticating Atelier Access</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background lg:pl-64 pb-24 lg:pb-0 font-inter text-foreground antialiased selection:bg-accent selection:text-background">
      <AdminNav />
      <main className="p-8 md:p-16 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
