import type { Metadata } from "next";
import { Jost, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], variable: "--font-sans" });
const bodoni = Bodoni_Moda({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/providers/PageTransition";
import { CartProvider } from "@/components/providers/CartProvider";
import CartDrawer from "@/components/layout/CartDrawer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import WhatsAppFloatingButton from "@/components/ui/WhatsAppFloatingButton";

export const metadata: Metadata = {
  title: "Collectif Design | Studio-Grade Furniture & Interiors",
  description: "Exquisite furniture and interior design solutions. Reimagined with a studio-grade experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} ${bodoni.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          <CartProvider>
            <ScrollProgress />
            <SmoothScroll>
              <PageTransition>
                {children}
              </PageTransition>
              <Footer />
            </SmoothScroll>
            <CartDrawer />
            <WhatsAppFloatingButton />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
