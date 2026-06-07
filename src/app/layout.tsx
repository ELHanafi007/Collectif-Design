import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/providers/PageTransition";
import { CartProvider } from "@/components/providers/CartProvider";
import CartDrawer from "@/components/layout/CartDrawer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import WhatsAppFloatingButton from "@/components/ui/WhatsAppFloatingButton";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collectif Design | Mobilier & Design d'Intérieur au Maroc",
  description: "Mobilier premium, packs salon et chambre, accompagnement design et livraison au Maroc par Collectif Design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">
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
