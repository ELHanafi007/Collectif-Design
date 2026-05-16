'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
  },
  {
    id: 3,
    name: 'Bering, Salon en U',
    category: "Salons en U",
    oldPrice: '45 000 DH',
    newPrice: '35 500 DH',
    discount: '-21%',
    image: '/table a manger.jpeg'
  },
  {
    id: 4,
    name: 'Hugo, Salon en L',
    category: "Salons d'angle",
    oldPrice: '25 740 DH',
    newPrice: '19 500 DH',
    discount: '-24%',
    image: '/salon.jpeg'
  }
];

export default function OffersSection() {
  const [currentPage, setCurrentPage] = useState(0);
  
  // 2 products per page
  const itemsPerPage = 2;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const visibleProducts = products.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row w-full">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center bg-white"
        >
          <div className="text-center mb-12">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs md:text-sm tracking-widest uppercase font-light text-gray-400 mb-2"
            >
              REPOSEZ-VOUS SUR UN SAVOIR-FAIRE UNIQUE
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl md:text-3xl tracking-wide uppercase font-light text-black"
            >
              DÉCOUVRIR NOS OFFRES SALONS
            </motion.h2>
          </div>

          {/* Slider Container */}
          <div className="w-full max-w-3xl mb-6 relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
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
              href="/categories/salons"
              className="block w-full bg-[#2a2a2a] text-white text-xs font-bold tracking-widest uppercase py-4 text-center hover:bg-black transition-colors"
            >
              VOIR PLUS
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image */}
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
              alt="Living Room Offer"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
