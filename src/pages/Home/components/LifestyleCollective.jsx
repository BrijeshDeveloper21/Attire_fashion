import React from 'react';
import { Link } from 'react-router-dom';

const LifestyleCollective = () => {
  const items = [
    { name: 'Blazers', photo: '/products/Blazzer/blazer_1.jpg', path: '/shop?category=Blazers' },
    { name: 'Sherwani', photo: '/products/SHERVANI/sherwani_1.jpg', path: '/shop?category=Sherwani' },
    { name: 'Indianwear', photo: '/products/Gujarati_Kurta_Collection/asymmetrical.png', path: '/shop?category=Signature Ethnic' },
    { name: 'Shirts', photo: '/products/SHIRT/nakuul_mehta.jpg', path: '/shop?category=Shirts' },
    { name: 'Jeans', photo: '/products/jeans_baggy/jeans_5.jpg', path: '/shop?category=Urban Denim Collective' },
    { name: 'Streetwear', photo: '/products/T-shirt/coastal_vibes_black.jpg', path: '/shop?category=Streetwear' },
    { name: 'Exclusive', photo: '/products/premium/signature_01.jpg', path: '/shop?category=Luxury Signature' },
    { name: 'Bags', photo: '/products/BAGS/bag_1.jpg', path: '/shop?category=Bags' },
    { name: 'Belts', photo: '/products/BELTS/belt_1.jpg', path: '/shop?category=Belts' },
    { name: 'Footwear', photo: '/products/mojadi/mojadi_3.jpg', path: '/shop?category=Footwear' }
  ];

  return (
    <section className="py-4 md:py-8 bg-gray-50/50 border-y border-gray-100">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        <div className="flex flex-col items-center md:items-start gap-1 mb-4 md:mb-10 text-center md:text-left">
          <span className="text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase text-brand-gold">Curated Lifestyle</span>
          <h2 className="text-[20px] md:text-[32px] font-black tracking-tighter uppercase text-black">The Luxe Collective</h2>
        </div>
        <div className="overflow-x-auto hide-scrollbar overscroll-x-contain -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-4 md:gap-10 min-w-max">
            {items.map((item, idx) => (
              <Link key={idx} to={item.path} className="flex flex-col items-center gap-3 group cursor-pointer w-20 md:w-32">
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-brand-gold transition-all duration-500 shadow-md">
                  <img 
                    src={item.photo} 
                    alt={item.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-all duration-700 active:scale-95" 
                  />
                </div>
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.15em] text-gray-500 group-hover:text-black text-center whitespace-nowrap">
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleCollective;
