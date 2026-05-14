"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/verify");
        if (response.ok) {
          router.push("/admin/dashboard");
        }
      } catch {
        // Not authenticated
      }
    };
    checkAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Clé d'accès incorrecte");
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-20">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-block"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-accent block">
              Restricted Area
            </span>
          </motion.div>
          <h1 className="text-6xl font-medium tracking-tightest text-foreground lowercase mb-4">
            Atelier <br />
            <span className="italic font-light">Control</span>
          </h1>
          <p className="text-[9px] uppercase tracking-[0.4em] text-muted/40 font-bold">
            Collectif Design — Systems Access
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-12">
          <div className="space-y-4">
            <div className="relative group">
              <input 
                required
                type="password" 
                placeholder="Access Key"
                className="w-full bg-transparent border-b border-border/50 py-6 px-4 outline-none focus:border-accent transition-all duration-700 text-sm tracking-[0.5em] text-center placeholder:text-muted/20 placeholder:tracking-widest"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent transition-all duration-700 group-focus-within:w-full" />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-[9px] uppercase tracking-[0.2em] font-bold text-red-500 text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full group relative flex items-center justify-center gap-6 overflow-hidden rounded-full border border-border bg-foreground/5 px-8 py-6 transition-all hover:border-accent/50 disabled:opacity-50"
          >
            <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.5em] text-foreground">
              {isLoading ? "Verifying..." : "Enter Workspace"}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-accent transition-transform duration-1000 ease-expo group-hover:scale-[6]" />
          </button>
        </form>

        <footer className="mt-32 text-center">
          <p className="text-[8px] uppercase tracking-[0.6em] text-muted/20">
            Authorized Personnel Only. © 2024 Collectif Design.
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
