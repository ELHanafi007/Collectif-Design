'use client';

import Navbar from '@/components/layout/Navbar';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { CONTACT_INFO } from '@/data/contact';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: "Consultation Design d'Intérieur",
    message: '',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      `*Demande de rendez-vous - Collectif Design*`,
      ``,
      `*Nom:* ${formData.name}`,
      `*Email:* ${formData.email}`,
      `*Téléphone:* ${formData.phone}`,
      `*Objet:* ${formData.subject}`,
      ``,
      `*Message:*`,
      formData.message,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setStatus('sent');
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[40vh] overflow-hidden">
        <img src="/decoration.jpeg" alt="Contact" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-wide px-6 md:px-12 pb-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Contact</span>
              <h1 className="text-5xl md:text-6xl tracking-tightest">Parlons de Votre Projet</h1>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Info */}
            <div className="lg:col-span-4 space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">Nos Coordonnées</span>
                <h2 className="text-3xl tracking-tightest">Visitez Notre Showroom</h2>
              </div>
              
              <div className="space-y-8">
                {[
                  { icon: MapPin, label: 'Adresse', value: CONTACT_INFO.address },
                  { icon: Phone, label: 'Téléphone', value: CONTACT_INFO.phoneNumber },
                  { icon: Mail, label: 'Email', value: CONTACT_INFO.email },
                  { icon: Clock, label: 'Horaires', value: CONTACT_INFO.openingHours },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-muted" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-muted mb-1">{item.label}</p>
                      <p className="text-sm font-light whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8 bg-surface rounded-lg p-6 md:p-12">
              <h3 className="text-xl font-serif mb-8">Demander un Rendez-vous</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-[9px] font-bold uppercase tracking-widest text-muted">Nom Complet</label>
                    <input 
                      id="contact-name"
                      type="text" 
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      required
                      autoComplete="name"
                      className="w-full bg-background border border-border rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-foreground transition-all font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-[9px] font-bold uppercase tracking-widest text-muted">Email</label>
                    <input 
                      id="contact-email"
                      type="email" 
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      required
                      autoComplete="email"
                      className="w-full bg-background border border-border rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-foreground transition-all font-light"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-phone" className="text-[9px] font-bold uppercase tracking-widest text-muted">Téléphone</label>
                  <input 
                    id="contact-phone"
                    type="tel" 
                    placeholder="+212 6 00 00 00 00"
                    value={formData.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    required
                    autoComplete="tel"
                    className="w-full bg-background border border-border rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-foreground transition-all font-light"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-[9px] font-bold uppercase tracking-widest text-muted">Objet</label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(event) => updateField('subject', event.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-foreground transition-all font-light"
                  >
                    <option>Consultation Design d&apos;Intérieur</option>
                    <option>Demande de Mobilier Sur Mesure</option>
                    <option>Visite du Showroom</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-[9px] font-bold uppercase tracking-widest text-muted">Message</label>
                  <textarea 
                    id="contact-message"
                    rows={5}
                    placeholder="Parlez-nous de votre projet..."
                    value={formData.message}
                    onChange={(event) => updateField('message', event.target.value)}
                    required
                    className="w-full bg-background border border-border rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-foreground transition-all font-light resize-none"
                  />
                </div>

                <button className="w-full bg-foreground text-background py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-widest hover:opacity-90 transition-all active:scale-[0.99]">
                  Envoyer la Demande
                </button>
                {status === 'sent' && (
                  <p className="text-xs leading-6 text-muted">
                    Votre application WhatsApp va s’ouvrir avec la demande préparée. Vous pourrez l’envoyer après vérification.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
