import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import CategoryStack from '@/components/sections/CategoryStack';
import HorizontalFeatures from '@/components/sections/HorizontalFeatures';
import FeaturedCollection from '@/components/sections/FeaturedCollection';
import ClosingCTA from '@/components/sections/ClosingCTA';

export default function Home() {
  return (
    <main className="relative bg-background overflow-hidden">
      <Navbar />
      <Hero />
      <CategoryStack />
      <HorizontalFeatures />
      <FeaturedCollection />
      <ClosingCTA />
    </main>
  );
}
