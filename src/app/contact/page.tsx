'use client';

import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Hash } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      <div className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-32">
          {/* Left: Info */}
          <div className="lg:w-1/3">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-8 block">
              Contactez-nous
            </span>
            <h1 className="text-6xl font-bold tracking-tighter mb-12 lowercase">
              Visitez notre <br /> Studio<span className="text-accent">.</span>
            </h1>
            
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Localisation</h4>
                  <p className="text-muted leading-relaxed">
                    123 Rue de l'Artisanat,<br />
                    Quartier Gauthier, Casablanca
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Horaires</h4>
                  <p className="text-muted leading-relaxed">
                    Lun — Ven: 09:00 - 19:00<br />
                    Sam: 10:00 - 15:00
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <Hash size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Suivez-nous</h4>
                  <p className="text-muted leading-relaxed">
                    @collectif_design_
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:w-2/3 bg-gray-50 rounded-[4rem] p-12 md:p-20">
            <h2 className="text-3xl font-bold mb-12 tracking-tight">Demander un Rendez-vous</h2>
            
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-4">Nom Complet</label>
                  <input 
                    type="text" 
                    placeholder="Jean Dupont"
                    className="w-full bg-white rounded-full px-8 py-5 border-none shadow-sm focus:ring-2 focus:ring-accent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-4">Adresse Email</label>
                  <input 
                    type="email" 
                    placeholder="jean@example.com"
                    className="w-full bg-white rounded-full px-8 py-5 border-none shadow-sm focus:ring-2 focus:ring-accent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-4">Objet</label>
                <select className="w-full bg-white rounded-full px-8 py-5 border-none shadow-sm focus:ring-2 focus:ring-accent outline-none transition-all appearance-none">
                  <option>Consultation Design d'Intérieur</option>
                  <option>Demande de Mobilier Sur Mesure</option>
                  <option>Visite du Showroom</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-4">Message</label>
                <textarea 
                  rows={6}
                  placeholder="Parlez-nous de votre projet..."
                  className="w-full bg-white rounded-[2rem] px-8 py-6 border-none shadow-sm focus:ring-2 focus:ring-accent outline-none transition-all resize-none"
                />
              </div>

              <button className="w-full bg-accent text-white py-6 rounded-full font-bold hover:bg-black transition-all active:scale-[0.98] shadow-xl">
                Envoyer la Demande
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
