"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, MessageSquare, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

const stats = [
  { name: "Total Pieces", value: PRODUCTS.length || "42", icon: ShoppingBag, change: "+3", changeType: "increase" },
  { name: "Inquiries", value: "28", icon: MessageSquare, change: "+12%", changeType: "increase" },
  { name: "Total Views", value: "8.4k", icon: Users, change: "+18%", changeType: "increase" },
  { name: "Market Rate", value: "92%", icon: TrendingUp, change: "-1%", changeType: "decrease" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-16">
      <header>
        <span className="text-accent uppercase tracking-[0.6em] text-[10px] font-bold block mb-4">
          Performance Overview
        </span>
        <h1 className="text-5xl font-medium tracking-tightest lowercase">
          Tableau <span className="italic font-light">de Bord</span>
        </h1>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-surface p-10 transition-all duration-700 hover:bg-surface/80"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="w-12 h-12 rounded-full border border-border/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-700">
                <stat.icon size={18} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted/40">{stat.name}</span>
            </div>

            <div className="flex items-end justify-between">
              <span className="text-4xl font-medium tracking-tighter">{stat.value}</span>
              <div className={cn(
                "flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest",
                stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
              )}>
                {stat.changeType === 'increase' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Recent Activity */}
        <div className="space-y-10">
          <div className="flex justify-between items-center border-b border-border/10 pb-6">
            <h3 className="text-[10px] uppercase tracking-[0.6em] font-bold text-accent">Demandes Récentes</h3>
            <button className="text-[9px] uppercase tracking-[0.4em] font-bold text-muted/40 hover:text-foreground transition-colors">Explorer tout</button>
          </div>
          
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center group cursor-pointer p-6 bg-surface/30 hover:bg-surface/60 transition-all duration-500 rounded-sm">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full border border-border/20 flex items-center justify-center text-xs font-light tracking-widest">
                    {i === 1 ? 'AB' : i === 2 ? 'SK' : 'ML'}
                  </div>
                  <div>
                    <p className="text-sm font-medium tracking-tight">Client #{Math.floor(Math.random() * 9000) + 1000}</p>
                    <p className="text-[9px] text-muted/40 uppercase tracking-[0.3em] mt-1 font-bold">Casablanca • 12 min ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-accent font-bold">Pending Review</p>
                  <p className="text-[8px] text-muted/20 uppercase tracking-widest mt-1">4 Objects requested</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Interests */}
        <div className="space-y-10">
          <div className="flex justify-between items-center border-b border-border/10 pb-6">
            <h3 className="text-[10px] uppercase tracking-[0.6em] font-bold text-accent">Pièces Vedettes</h3>
            <button className="text-[9px] uppercase tracking-[0.4em] font-bold text-muted/40 hover:text-foreground transition-colors">Analytics</button>
          </div>
          
          <div className="space-y-8">
            {PRODUCTS.slice(0, 3).length > 0 ? PRODUCTS.slice(0, 3).map((product) => (
              <div key={product.id} className="flex justify-between items-center p-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 aspect-square bg-surface overflow-hidden grayscale">
                    <img src={product.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-medium tracking-tight lowercase">{product.name}</p>
                    <p className="text-[9px] text-muted/40 uppercase tracking-[0.3em] mt-1 font-bold">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium tracking-tighter">{Math.floor(Math.random() * 400) + 100}</p>
                  <p className="text-[8px] text-muted/20 uppercase tracking-[0.4em] font-bold">Interactions</p>
                </div>
              </div>
            )) : (
                <div className="py-12 text-center border border-dashed border-border/20">
                   <p className="text-[10px] uppercase tracking-widest text-muted/20">Aucune donnée disponible</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
