import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Cairo, Salon en L',
    category: "Salons d'angle",
    oldPrice: '24 570 DH',
    newPrice: '14 500 DH',
    discount: '-41%',
    image: '/salon.jpeg'
  },
  {
    id: 2,
    name: 'Orvalo PM, Salon en L',
    category: "Salons d'angle",
    oldPrice: '30 100 DH',
    newPrice: '19 850 DH',
    discount: '-34%',
    image: '/salon.jpeg'
  }
];

export default function OffersSection() {
  return (
    <section className="w-full bg-white">
      <div className="flex flex-col-reverse lg:flex-row w-full">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center bg-white">
          <div className="text-center mb-12">
            <h3 className="text-xs md:text-sm tracking-widest uppercase font-light text-gray-400 mb-2">
              REPOSEZ-VOUS SUR UN SAVOIR-FAIRE UNIQUE
            </h3>
            <h2 className="text-2xl md:text-3xl tracking-wide uppercase font-light text-black">
              DÉCOUVRIR NOS OFFRES SALONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-6">
            {products.map((product) => (
              <div key={product.id} className="border border-gray-100 p-4 flex flex-col group hover:shadow-lg transition-shadow bg-white">
                <div className="relative w-full aspect-[4/3] mb-4">
                  {/* Discount Tag */}
                  <div className="absolute top-0 left-0 bg-[#d11124] text-white text-[10px] font-bold px-2 py-1 z-10">
                    {product.discount}
                  </div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center mt-auto">
                  <h3 className="text-sm font-semibold text-black">{product.name}</h3>
                  <p className="text-xs text-gray-400 mt-1 mb-2">{product.category}</p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span className="line-through text-gray-400">{product.oldPrice}</span>
                    <span className="font-bold text-[#d11124] text-sm">{product.newPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button className="w-2 h-2 rounded-full border border-gray-400"></button>
            <button className="w-2 h-2 rounded-full bg-black"></button>
          </div>

          <Link 
            href="/categories/salons"
            className="w-full max-w-3xl bg-[#2a2a2a] text-white text-xs font-bold tracking-widest uppercase py-4 text-center hover:bg-black transition-colors"
          >
            VOIR PLUS
          </Link>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-screen">
          <Image
            src="/salon.jpeg" // Big living room image
            alt="Living Room Offer"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
