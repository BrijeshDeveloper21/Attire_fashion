import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '@/components/features';

const ProductSection = ({ 
  title, 
  subtitle, 
  tagline, 
  products = [], 
  viewAllPath = "/shop",
  theme = "light",
  gridCols = "md:grid-cols-5",
  maxContentWidth = "max-w-[1600px]",
  mobileGridCols = "flex overflow-x-auto"
}) => {
  const isDark = theme === "dark";

  return (
    <section className={`py-4 md:py-4 ${isDark ? 'bg-black text-white' : 'bg-white border-y border-gray-50'}`}>
      <div className={`${maxContentWidth} mx-auto px-4 md:px-12`}>
        <div className="flex justify-between items-end mb-3 md:mb-4">
          <div className="flex flex-col gap-1">
            {tagline && (
              <div className="flex items-center gap-3">
                <span className={`w-8 h-[1px] ${isDark ? 'bg-brand-gold' : 'bg-brand-gold'}`} />
                <span className="text-[9px] md:text-[12px] font-black tracking-[0.5em] uppercase text-brand-gold">{tagline}</span>
              </div>
            )}
            {subtitle && <h3 className={`text-[9px] md:text-[12px] font-black uppercase tracking-[0.5em] text-brand-gold mb-1 md:mb-2`}>{subtitle}</h3>}
            <h2 className={`text-[18px] md:text-[32px] font-black tracking-tighter uppercase leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
              {title}
            </h2>
          </div>
          <Link
            to={viewAllPath}
            className={`text-[10px] md:text-[11px] font-black uppercase tracking-widest border-b-2 ${isDark ? 'border-white text-white' : 'border-black text-black'} pb-1 hover:text-brand-gold hover:border-brand-gold transition-all`}
          >
            {isDark ? 'Discover Full Series' : 'View More'}
          </Link>
        </div>

        <div className={`${mobileGridCols} md:grid ${gridCols} gap-4 md:gap-8 pb-8 md:pb-0 hide-scrollbar -mx-2 px-2 md:mx-0 md:px-0`}>
          {products.map(product => (
            <div key={product.id} className={`${mobileGridCols.includes('grid-cols') ? '' : 'w-[160px]'} md:w-auto shrink-0 md:shrink group`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
