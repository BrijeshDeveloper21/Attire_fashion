import React from 'react';

const ShopHeader = ({ searchParam, categoryParam, resultCount }) => {
  return (
    <div className="bg-white pt-4 pb-2 px-6 md:px-12 relative border-b border-gray-50">
       <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-1 md:gap-2 text-[9px] md:text-[11px] font-black uppercase tracking-widest hover:text-brand-gold transition-colors group absolute left-4 md:left-12 top-1/2 -translate-y-1/2"
          >
            <span className="text-[12px] md:text-[18px] group-hover:-translate-x-1 transition-transform">←</span>
            <span className="hidden md:inline">Back</span>
          </button>

          <div className="flex-1 text-center">
             <h1 className="text-[20px] md:text-[32px] font-black tracking-tighter uppercase mb-0 leading-none">
               {searchParam ? `Results for "${searchParam}"` : 'Shop The Archive'}
             </h1>
             <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.5em] mt-1">
               {searchParam ? `${resultCount} Matches Found` : (categoryParam === 'All' ? 'Every Signature Piece' : categoryParam)}
             </p>
          </div>
          
          <div className="w-10 md:w-20 hidden md:block" /> 
       </div>
    </div>
  );
};

export default ShopHeader;
