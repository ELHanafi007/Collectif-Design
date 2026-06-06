import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TrendingSection from '@/components/sections/TrendingSection';
import OffersSection from '@/components/sections/OffersSection';
import FeaturedCollection from '@/components/sections/FeaturedCollection';
import HorizontalFeatures from '@/components/sections/HorizontalFeatures';
import ClosingCTA from '@/components/sections/ClosingCTA';

export default function Home() {
  return (
    <main className="relative bg-background overflow-hidden font-sans">
      <Navbar />
      {/* Spacer for fixed Navbar */}
      <div className="pt-[84px] md:pt-[116px]"></div> 
      <Hero />
      <HorizontalFeatures />
      <TrendingSection />
      <FeaturedCollection />
      <OffersSection />
      <ClosingCTA />
      <Footer />
    </main>
  );
}
