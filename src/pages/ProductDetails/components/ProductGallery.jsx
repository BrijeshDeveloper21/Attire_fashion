import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ProductGallery = ({ product, activeImg, setActiveImg }) => {
  const images = product.images || Array(6).fill(product.image); // Use product.images if available, else mock 6 for visual consistency
  const scrollRef = useRef(null);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center' });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - window.scrollX - left) / width) * 100;
    const y = ((e.pageY - window.scrollY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%` });
  };

  const handleScrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
      {/* Thumbnail sidebar for desktop */}
      <div className="relative hidden md:block">
        <div 
          ref={scrollRef}
          className="flex flex-col gap-4 w-[163px] overflow-y-auto max-h-[700px] hide-scrollbar scroll-smooth"
        >
          {images.map((img, i) => (
            <div 
              key={i} 
              className={`aspect-square overflow-hidden shrink-0 cursor-pointer border-2 transition-all ${activeImg === i ? 'border-black' : 'border-transparent'}`}
              onClick={() => setActiveImg(i)}
            >
               <img src={img} className="w-full h-full object-cover" alt="" />
            </div>
          ))}
        </div>
        
        {/* Scroll Indicator */}
        {images.length > 4 && (
          <div 
            onClick={handleScrollDown}
            className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent flex items-end justify-center pb-2 cursor-pointer z-10 hover:h-20 transition-all"
          >
            <ChevronDown className="w-5 h-5 text-black animate-bounce" />
          </div>
        )}
      </div>

      {/* 70/30 LUXE MOBILE GRID */}
      <div className="flex flex-row md:flex-col flex-1 gap-2 md:gap-4">
        {/* 70% HERO IMAGE */}
        <div 
           className="w-[70%] md:w-full h-[50vh] md:h-[700px] overflow-hidden bg-white relative rounded-sm shadow-sm border border-gray-100 cursor-zoom-in"
           onMouseMove={handleMouseMove}
           onMouseLeave={() => setZoomStyle({ transformOrigin: 'center' })}
        >
            <motion.img 
               key={activeImg}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               whileHover={{ scale: 1.5 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               src={images[activeImg]} 
               style={zoomStyle}
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
                     className={`aspect-[3/4] rounded-sm overflow-hidden shrink-0 border-2 transition-all ${activeImg === i ? 'border-black shadow-md' : 'border-gray-100 opacity-60'}`}
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
