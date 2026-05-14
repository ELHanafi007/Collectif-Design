import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import CategoryStack from '@/components/sections/CategoryStack';
import HorizontalFeatures from '@/components/sections/HorizontalFeatures';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <CategoryStack />
      <HorizontalFeatures />
    </main>
  );
}
