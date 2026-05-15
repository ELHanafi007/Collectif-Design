'use client';

import Link from 'next/link';

const featured = [
  {
    name: 'Hugo, Salon en L',
    category: "Salons d'angle",
    image: '/salon.jpeg',
    oldPrice: '25 700',
    price: '19 500',
    badge: '-24%'
  },
  {
    name: 'Tempio, Table basse',
    category: 'Tables basses',
    image: '/table a manger.jpeg',
    oldPrice: '9 460',
    price: '6 990',
    badge: '-26%'
  },
  {
    name: 'Florenza, Table de salle à manger',
    category: 'Tables de salle à manger',
    image: '/table a manger.jpeg',
    oldPrice: '20 300',
    price: '15 200',
    badge: '-35%'
  },
  {
    name: 'Bering, Salon en U',
    category: 'Salons en U',
    image: '/salon.jpeg',
    oldPrice: '63 050',
    price: '41 800',
    badge: '-34%'
  }
];

export default function FeaturedCollection() {
  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[900px]">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full">
          <img 
            src="/salon.jpeg" 
            alt="Suivez la tendance" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Content & Products */}
        <div className="w-full lg:w-1/2 p-4 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-[28px] text-gray-500 font-light tracking-[0.1em] uppercase">
              Suivez la tendance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
            {featured.map((item, idx) => (
              <div key={idx} className="border border-gray-100 p-4 hover:shadow-lg transition-shadow group flex flex-col">
                <div className="relative aspect-[4/3] mb-4 bg-white">
                  <div className="absolute top-0 left-0 z-10 bg-red-600 text-white text-[11px] font-bold px-1.5 py-0.5">
                    {item.badge}
                  </div>
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="text-center space-y-1 mt-auto">
                  <h3 className="text-[13px] text-gray-800 font-medium">{item.name}</h3>
                  <p className="text-[11px] text-gray-400">{item.category}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-[11px] text-gray-400 line-through">{item.oldPrice} DH</span>
                    <span className="text-sm font-bold text-red-600">{item.price} DH</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center w-full max-w-2xl mx-auto">
             <Link href="/shop" className="bg-[#2a2a2a] text-white uppercase text-xs tracking-widest py-3.5 px-8 w-full text-center hover:bg-black transition-colors">
               VOIR PLUS
             </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
