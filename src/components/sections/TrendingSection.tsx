'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
  {
    id: 1,
    name: 'Hugo, Salon en L',
    category: "Salons d'angle",
    oldPrice: '25 740 DH',
    newPrice: '19 500 DH',
    discount: '-24%',
    image: '/salon.jpeg'
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
  },
  {
    id: 5,
    name: 'Kaya, Fauteuil',
    category: 'Fauteuils',
    oldPrice: '11 000 DH',
    newPrice: '5 500 DH',
    discount: '-50%',
    image: '/salon.jpeg'
  },
  {
    id: 6,
    name: 'Alba, Fauteuil',
    category: 'Fauteuils',
    oldPrice: '6 350 DH',
    newPrice: '3 850 DH',
    discount: '-39%',
    image: '/table a manger.jpeg'
  }
];

export default function TrendingSection() {
  const [currentPage, setCurrentPage] = useState(0);
  
  // 2 products per page on this layout
  const itemsPerPage = 2;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const visibleProducts = products.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="w-full bg-white border-b border-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-screen overflow-hidden group"
        >
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.8 }} className="w-full h-full relative">
            <Image
              src="/salon.jpeg" // Big living room image
              alt="Living Room Setup"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center bg-white"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl tracking-widest uppercase font-light text-gray-500 mb-12"
          >
            SUIVEZ LA TENDANCE
          </motion.h2>

          {/* Slider Container */}
          <div className="w-full max-w-3xl mb-6 relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentPage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
              >
                {visibleProducts.map((product) => (
                  <div key={product.id} className="border border-gray-100 p-4 flex flex-col group hover:shadow-lg transition-all bg-white">
                    <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden">
                      {/* Discount Tag */}
                      <div className="absolute top-0 left-0 bg-[#d11124] text-white text-[10px] font-bold px-2 py-1 z-10">
                        {product.discount}
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} className="w-full h-full relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
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
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentPage === idx ? 'bg-black' : 'border border-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full max-w-3xl"
          >
            <Link 
              href="/shop"
              className="block w-full bg-[#2a2a2a] text-white text-xs font-bold tracking-widest uppercase py-4 text-center hover:bg-black transition-colors"
            >
              VOIR PLUS
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
