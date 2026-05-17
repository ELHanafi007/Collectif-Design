import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import TrendingSection from '@/components/sections/TrendingSection';
import OffersSection from '@/components/sections/OffersSection';

export default function Home() {
  return (
    <main className="relative bg-white overflow-hidden font-sans">
      <Navbar />
      {/* Spacer for fixed Navbar */}
      <div className="pt-[84px] md:pt-[166px]"></div> 
      <Hero />
      <TrendingSection />
      <OffersSection />
    </main>
  );
}
