import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="w-full">
      <div className="w-full flex flex-col md:flex-row">
        {/* Left Side - Blue Sofa */}
        <div className="relative w-full md:w-1/3 aspect-[4/3] md:aspect-auto">
          <Image
            src="/salon.jpeg" // Reusing available images, ideally the blue sofa one
            alt="Salon"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Middle - Blue Banner */}
        <div className="w-full md:w-1/3 bg-[#2458a6] flex flex-col items-center justify-center text-center p-8 md:p-12 text-white">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-2">
            <span className="bg-[#b45d2f] px-4 py-2 inline-block shadow-sm">PACK PROMO</span>
          </h2>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mt-4">
            JUSQU'À -60%
          </h3>
        </div>

        {/* Right Side - Bedroom */}
        <div className="relative w-full md:w-1/3 aspect-[4/3] md:aspect-auto">
          <Image
            src="/tablesdechevet.jpeg" // Bedroom image
            alt="Chambre"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
