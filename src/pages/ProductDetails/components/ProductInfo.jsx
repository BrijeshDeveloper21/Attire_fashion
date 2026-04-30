import React from 'react';
import { ShoppingBag, Heart, Share2, ShieldCheck, Truck, Star } from 'lucide-react';
import { useReviews } from '@/context/ReviewContext';

const ProductInfo = ({ product, addToCart, selectedSize, setSelectedSize }) => {
  const { getAverageRating, getProductReviews } = useReviews();
  const averageRating = getAverageRating(product.id);
  const totalReviews = getProductReviews(product.id).length;

  return (
    <div className="lg:col-span-5 flex flex-col pt-1 md:pt-0">
      {/* Standard Desktop Title Block */}
      <div className="hidden md:block mb-8">
        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-yellow-600 mb-2">{product.brand}</p>
        <h1 className="text-[40px] font-black tracking-tighter uppercase leading-tight mb-4">{product.name}</h1>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-[24px] font-black italic">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-[14px]">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="flex items-center gap-3 bg-yellow-50/50 px-5 py-2.5 rounded-full border border-yellow-500/20 shadow-sm">
            <div className="flex text-yellow-500 gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-4 h-4 ${averageRating >= star ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#D4AF37]/20'}`} />
              ))}
            </div>
            <div className="flex items-center gap-2 border-l border-yellow-500/20 pl-3">
              <span className="text-[14px] font-black text-yellow-600">{averageRating || '0.0'}</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-200 cursor-pointer hover:text-black transition-colors">{totalReviews} Reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* SIZES + ADD TO BAG */}
      <div className="flex items-start gap-4 mb-2 md:mb-8">
        <div className="flex-1">
          <h4 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-1 md:mb-4">Size</h4>
          <div className="grid grid-cols-4 md:flex gap-1.5 md:gap-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 md:w-14 md:h-14 border text-[9px] md:text-[11px] font-black uppercase transition-all ${selectedSize === size ? 'bg-black text-white border-black shadow-md scale-105' : 'bg-white text-gray-400 border-gray-100'
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="w-[45%] lg:w-full flex md:hidden items-end h-full pt-2">
          <button
            onClick={() => addToCart(product, selectedSize)}
            className="w-full bg-black text-white h-[42px] text-[8px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Action Buttons - Desktop Only */}
      <div className="hidden md:flex flex-col gap-2 mb-10">
        <button
          onClick={() => addToCart(product, selectedSize)}
          className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.4em] shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          Add to Shopping Bag
        </button>
      </div>

      <div className="flex gap-2 mb-6 md:mb-10">
        <button className="flex-1 border border-gray-100 py-3 text-[8px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          <Heart className="w-3.5 h-3.5 text-red-500" />
          Wishlist
        </button>
        <button className="border border-gray-100 px-4 py-3 flex items-center justify-center">
          <Share2 className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>

      <div className="mb-4 pt-4 border-t border-gray-50 mt-2 px-1">
        <h4 className="text-[9px] font-black uppercase tracking-[0.3em] mb-4">Product Narrative</h4>
        <p className="text-[11px] md:text-[13px] text-gray-500 font-medium leading-relaxed uppercase tracking-wider">
          {product.description || "A masterwork of contemporary craftsmanship. This limited-edition piece explores the intersection of raw texture and refined silhouette, utilizing premium fabrics tailored for a lifetime of sartorial excellence."}
        </p>
      </div>

      {/* Guarantees */}
      <div className="grid grid-cols-1 gap-3 md:gap-6 border-t border-gray-50 pt-4">
        <div className="flex gap-3">
          <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-brand-gold shrink-0" />
          <div>
            <h5 className="text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-0.5">Authentic Lux</h5>
            <p className="text-[8px] md:text-[9px] text-gray-400 font-medium">100% genuine guaranteed.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Truck className="w-4 h-4 md:w-5 md:h-5 text-brand-gold shrink-0" />
          <div>
            <h5 className="text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-0.5">Express Delivery</h5>
            <p className="text-[8px] md:text-[9px] text-gray-400 font-medium">Insured shipping in 2-3 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
