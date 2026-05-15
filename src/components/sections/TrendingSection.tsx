import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Hugo, Salon en L',
    category: "Salons d'angle",
    oldPrice: '25 740 DH',
    newPrice: '19 500 DH',
    discount: '-24%',
    image: '/salon.jpeg' // Need isolated image
  },
  {
    id: 2,
    name: 'Tempio, Table basse',
    category: 'Tables basses',
    oldPrice: '9 440 DH',
    newPrice: '6 990 DH',
    discount: '-26%',
    image: '/table a manger.jpeg'
  },
  {
    id: 3,
    name: 'Floreno, Table de salle à manger',
    category: 'Tables de salle à manger',
    oldPrice: '20 200 DH',
    newPrice: '15 200 DH',
    discount: '-25%',
    image: '/tablesdechevet.jpeg'
  },
  {
    id: 4,
    name: 'Bering, Salon en U',
    category: 'Salons en U',
    oldPrice: '63 090 DH',
    newPrice: '41 800 DH',
    discount: '-34%',
    image: '/salon.jpeg'
  }
];

export default function TrendingSection() {
  return (
    <section className="w-full bg-white border-b border-gray-100">
      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-screen">
          <Image
            src="/salon.jpeg" // Big living room image
            alt="Living Room Setup"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center bg-white">
          <h2 className="text-xl md:text-2xl tracking-widest uppercase font-light text-gray-500 mb-12">
            SUIVEZ LA TENDANCE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-8">
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
                    className="object-cover" // Or object-contain if isolated images
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

          <Link 
            href="/shop"
            className="w-full max-w-3xl bg-[#2a2a2a] text-white text-xs font-bold tracking-widest uppercase py-4 text-center hover:bg-black transition-colors"
          >
            VOIR PLUS
          </Link>
        </div>
      </div>
    </section>
  );
}
