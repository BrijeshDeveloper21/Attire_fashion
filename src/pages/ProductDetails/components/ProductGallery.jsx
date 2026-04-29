import React from 'react';
import { motion } from 'framer-motion';

const ProductGallery = ({ product, activeImg, setActiveImg }) => {
  const images = [product.image, product.image, product.image]; // Mocking multiple images

  return (
    <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
      {/* Thumbnail sidebar for desktop */}
      <div className="hidden md:flex flex-col gap-4 w-20">
        {images.map((img, i) => (
          <div 
            key={i} 
            className={`aspect-square overflow-hidden cursor-pointer border-2 transition-all ${activeImg === i ? 'border-black' : 'border-transparent'}`}
            onClick={() => setActiveImg(i)}
          >
             <img src={img} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>

      {/* 70/30 LUXE MOBILE GRID */}
      <div className="flex flex-row md:flex-col flex-1 gap-2 md:gap-4">
        {/* 70% HERO IMAGE */}
        <div className="w-[70%] md:w-full h-[50vh] md:h-[700px] overflow-hidden bg-white relative rounded-sm shadow-sm border border-gray-100">
            <motion.img 
               key={activeImg}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               src={product.image} 
               className="w-full h-full object-contain" 
               alt={product.name} 
            />
        </div>

        {/* 30% THUMBNAIL GALLERY */}
        <div className="w-[30%] flex flex-col gap-2 md:hidden">
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[50vh] hide-scrollbar">
                {images.map((img, i) => (
                   <div 
                     key={i} 
                     className={`aspect-[3/4] rounded-sm overflow-hidden border-2 transition-all ${activeImg === i ? 'border-black shadow-md' : 'border-gray-100 opacity-60'}`}
                     onClick={() => setActiveImg(i)}
                   >
                      <img src={img} className="w-full h-full object-cover" alt="" />
                   </div>
                ))}
            </div>
        </div>
      </div>

      {/* MOBILE ONLY: Full Width Title & Price below Image Grid */}
      <div className="md:hidden mt-3 px-1 uppercase">
        <p className="text-[9px] font-black tracking-[0.4em] text-brand-gold mb-1">{product.brand}</p>
        <div className="flex justify-between items-baseline">
           <h1 className="text-[20px] font-black tracking-tighter leading-none">{product.name}</h1>
           <span className="text-[18px] font-black italic">₹{product.price.toLocaleString()}</span>
        </div>
        <div className="h-[1px] w-full bg-gray-50 mt-1"></div>
      </div>
    </div>
  );
};

export default ProductGallery;
