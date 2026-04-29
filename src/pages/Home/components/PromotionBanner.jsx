import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PromotionBanner = () => {
  return (
    <section className="py-2 md:py-4">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        <Link to="/shop" className="block relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm mb-6 md:mb-20 group">
          <img 
            src="/Gemini_Generated_Image_3bsrg33bsrg33bsr.png" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            alt="Main Collection" 
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-white text-[10px] md:text-[12px] font-black tracking-[0.6em] uppercase mb-4"
            >
              Summer Collection
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white text-[24px] md:text-[64px] font-black tracking-tighter uppercase leading-none mb-8"
            >
              Linen & Silk
            </motion.h3>
            <div className="bg-white text-black px-8 md:px-12 py-3 md:py-5 text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-2xl">
              Shop Edition
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default PromotionBanner;
