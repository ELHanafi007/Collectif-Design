"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, User, MapPin, Calendar, Clock, ChevronRight, CheckCircle2, XCircle, Clock3, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for orders/quotes
const mockOrders = [
  {
    id: "ORD-7241",
    customer: "Ahmed Benjelloun",
    phone: "06 61 22 33 44",
    city: "Rabat",
    address: "Hay Riad, Villa 14",
    date: "12 Avril 2026",
    time: "14:20",
    status: "pending",
    total: "22.700",
    items: [
      { name: "Canapé Royal Velours", price: "18.500" },
      { name: "Table Basse Marbre Noir", price: "4.200" }
    ]
  },
  {
    id: "ORD-7238",
    customer: "Siham Kasmi",
    phone: "06 70 88 99 00",
    city: "Casablanca",
    address: "Bouskoura Golf City",
    date: "11 Avril 2026",
    time: "10:15",
    status: "completed",
    total: "28.500",
    items: [
      { name: "Table Grand Palais", price: "28.500" }
    ]
  },
  {
    id: "ORD-7235",
    customer: "Marc Lefebvre",
    phone: "06 55 44 33 22",
    city: "Rabat",
    address: "Souissi",
    date: "10 Avril 2026",
    time: "16:45",
    status: "cancelled",
    total: "3.200",
    items: [
      { name: "Lampe à Poser Albâtre", price: "3.200" }
    ]
  }
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={12} className="text-green-500" />;
      case 'cancelled': return <XCircle size={12} className="text-red-400" />;
      default: return <Clock3 size={12} className="text-accent" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Validé';
      case 'cancelled': return 'Annulé';
      default: return 'En attente';
    }
  };

  return (
    <div className="space-y-16">
      <header>
        <span className="text-accent uppercase tracking-[0.6em] text-[10px] font-bold block mb-4">
          Conciergerie & Inquiries
        </span>
        <h1 className="text-5xl font-medium tracking-tightest lowercase">
          Demandes <span className="italic font-light">de Devis</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Orders List */}
        <div className="lg:col-span-5 space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              layoutId={order.id}
              onClick={() => setSelectedOrder(order)}
              className={cn(
                "group relative bg-surface p-8 transition-all duration-700 cursor-pointer overflow-hidden",
                selectedOrder?.id === order.id ? "bg-surface/80" : "hover:bg-surface/50"
              )}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-bold tracking-[0.4em] text-muted/40 uppercase">{order.id}</span>
                <div className="flex items-center gap-3 px-3 py-1.5 bg-foreground/5 rounded-full">
                  {getStatusIcon(order.status)}
                  <span className="text-[8px] uppercase font-bold tracking-[0.2em]">{getStatusText(order.status)}</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-medium tracking-tight text-foreground lowercase mb-2">{order.customer}</h3>
              <p className="text-[10px] text-muted/40 flex items-center gap-3 uppercase tracking-[0.4em] font-bold">
                <MapPin size={12} className="text-accent" /> {order.city}
              </p>

              <div className="mt-10 flex justify-between items-end">
                <div>
                  <p className="text-[8px] text-muted/20 uppercase tracking-[0.4em] font-bold mb-1">Total Estimé</p>
                  <p className="text-xl font-medium tracking-tight">{order.total} MAD</p>
                </div>
                <ChevronRight size={20} className={cn("transition-transform duration-700", selectedOrder?.id === order.id ? "text-accent translate-x-2" : "text-muted/20")} />
              </div>
              
              {selectedOrder?.id === order.id && (
                <motion.div layoutId="orderActiveLine" className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Order Details */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {selectedOrder ? (
              <motion.div
                key={selectedOrder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="bg-surface p-12 lg:p-20 sticky top-32"
              >
                <div className="flex justify-between items-start border-b border-border/10 pb-12 mb-12">
                  <div>
                    <h2 className="text-4xl font-medium tracking-tightest lowercase mb-4">{selectedOrder.customer}</h2>
                    <p className="text-accent font-bold text-[10px] uppercase tracking-[0.5em]">{selectedOrder.id}</p>
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={`https://wa.me/${selectedOrder.phone.replace(/\s/g, '')}`}
                      target="_blank"
                      className="w-14 h-14 rounded-full border border-border/20 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-700"
                    >
                      <MessageSquare size={18} />
                    </a>
                    <button className="w-14 h-14 rounded-full border border-border/20 flex items-center justify-center hover:bg-foreground/5 transition-all duration-700">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-muted/40">
                      <Calendar size={14} className="text-accent" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{selectedOrder.date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-muted/40">
                      <Clock size={14} className="text-accent" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{selectedOrder.time}</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-muted/40">
                      <User size={14} className="text-accent" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{selectedOrder.phone}</span>
                    </div>
                    <div className="flex items-start gap-4 text-muted/40">
                      <MapPin size={14} className="text-accent mt-0.5" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold leading-relaxed">{selectedOrder.city}, {selectedOrder.address}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 border-t border-border/10 pt-12">
                  <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-accent">Selection Details</h4>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-4 border-b border-border/5 last:border-0 group">
                        <span className="text-lg font-medium lowercase group-hover:text-accent transition-colors">{item.name}</span>
                        <span className="text-sm font-medium tracking-tight text-muted/40">{item.price} MAD</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-8 flex justify-between items-baseline">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted/20">Total Estimation</span>
                    <span className="text-4xl font-medium tracking-tighter text-accent">{selectedOrder.total} MAD</span>
                  </div>
                </div>

                <div className="mt-20 flex gap-8">
                  <button className="group relative flex-[2] flex items-center justify-center gap-8 overflow-hidden rounded-full border border-border bg-foreground/5 px-10 py-7 transition-all hover:border-accent/50">
                    <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.5em]">Valider le Devis</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-[6] transition-transform duration-1000 ease-expo" />
                  </button>
                  <button className="flex-1 text-[9px] uppercase tracking-[0.5em] font-bold text-muted/40 hover:text-red-500 transition-colors">Annuler</button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[500px] border border-dashed border-border/20 flex flex-col items-center justify-center p-12 text-center">
                <MessageSquare size={48} strokeWidth={1} className="mb-10 text-muted/10" />
                <p className="text-3xl font-medium tracking-tightest lowercase italic text-muted/20">Sélectionnez une demande <br /> pour explorer les détails.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
