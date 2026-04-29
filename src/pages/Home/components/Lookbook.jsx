import React from 'react';
import { Link } from 'react-router-dom';

const Lookbook = () => {
  const stores = [
    { label: 'Artisan Heritage', sub: 'Ethnic Series', img: '/products/Gujarati_Kurta_Collection/abstract_fluid.png', path: '/shop?category=Signature Ethnic' },
    { label: 'Urban Collective', sub: 'Baggy Series', img: '/products/jeans_baggy/jeans_5.jpg', path: '/shop?category=Urban Denim Collective' },
    { label: 'Signature Luxe', sub: 'Silk Drop', img: '/products/premium/signature_01.jpg', path: '/shop?category=Luxury Signature' }
  ];

  return (
    <section className="py-2 md:py-8 border-t border-gray-50 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <span className="text-brand-gold text-[9px] md:text-[11px] font-black tracking-[0.5em] uppercase mb-2">The Archive</span>
          <h2 className="text-[18px] md:text-[28px] font-black text-gray-900 tracking-tighter uppercase leading-none">Editorial Lookbook</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 w-full">
          {stores.map((store, i) => (
            <Link key={i} to={store.path} className={`relative rounded-sm overflow-hidden aspect-[4/5] md:aspect-[16/9] shadow-sm group cursor-pointer border border-gray-100 ${i === 2 ? 'hidden md:block' : ''}`}>
              <img 
                src={store.img} 
                alt={store.label} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-[1s] group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-40 group-hover:opacity-60 transition-all duration-500" />

              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <h4 className="text-[12px] md:text-[18px] font-black tracking-tighter uppercase text-white leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{store.label}</h4>
                <p className="text-[7px] md:text-[10px] font-bold uppercase tracking-widest text-white/70 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">{store.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
