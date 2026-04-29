import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '@/components/features';

const RelatedProducts = ({ products, currentProductId, category }) => {
  const related = products
    .filter(p => p.category === category && p.id !== currentProductId)
    .slice(0, 5);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-gray-100">
       <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="flex flex-col gap-2">
             <span className="text-[10px] font-black tracking-[0.5em] text-brand-gold uppercase">The Collection</span>
             <h2 className="text-[28px] md:text-[40px] font-black uppercase tracking-tighter leading-none">More from the Series</h2>
          </div>
          <Link to={`/shop?category=${category}`} className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-all w-fit">
             View Full Category
          </Link>
       </div>

       <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
          {related.map(relatedProduct => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
       </div>
    </section>
  );
};

export default RelatedProducts;
