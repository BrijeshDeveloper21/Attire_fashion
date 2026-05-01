import React from 'react';
import { Link } from 'react-router-dom';

const CategoryNav = () => {
  const categories = [
    { name: 'Blazers', photo: '/img_1.webp', path: '/shop?category=Blazers' },
    { name: 'Indianwear', photo: '/img_2.webp', path: '/shop?category=Signature Ethnic' },
    { name: 'Sherwani', photo: '/img_3.webp', path: '/shop?category=Sherwani' },
    { name: 'Shirts', photo: '/img_4.webp', path: '/shop?category=Shirts' },
    { name: 'Jeans', photo: '/img_5.webp', path: '/shop?category=Urban Denim Collective' },
    { name: 'Streetwear', photo: '/img_6.webp', path: '/shop?category=Streetwear' },
    { name: 'Exclusive', photo: '/img_7.webp', path: '/shop?category=Luxury Signature' },
    { name: 'Bags', photo: '/img_8.webp', path: '/shop?category=Bags' },
    { name: 'Belts', photo: '/img_9.webp', path: '/shop?category=Belts' },
    { name: 'Footwear', photo: '/img_10.webp', path: '/shop?category=Footwear' }
  ];

  return (
    <section className="bg-white border-b border-gray-100 py-1 md:py-2">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        <div className="overflow-x-auto hide-scrollbar overscroll-x-contain">
          <div className="flex gap-4 md:gap-6 min-w-max md:justify-center">
            {categories.map((item, idx) => (
              <Link to={item.path} key={idx} className="flex flex-col items-center w-[85px] md:w-[120px] shrink-0 group cursor-pointer">
                <div className="relative w-full aspect-square md:h-28 overflow-hidden -mb-1 md:-mb-2 z-0">
                  <img 
                    src={item.photo} 
                    alt={item.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 translate-y-2 md:translate-y-3" 
                  />
                </div>
                <div className="relative z-10 border-2 border-gray-100 rounded-full px-4 py-1 bg-white/90 backdrop-blur-md transition-all group-hover:border-brand-gold text-center shadow-lg">
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] text-gray-900 leading-none whitespace-nowrap">{item.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;
