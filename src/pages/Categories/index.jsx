import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGlobalStore } from '@/store/globalStore';


const Categories = () => {
  const navigate = useNavigate();
  const products = useGlobalStore(state => state.products);
  
  const categoriesList = [
    { name: 'Signature Ethnic', img: '/products/Gujarati_Kurta_Collection/asymmetrical.png', path: '/shop?category=Signature Ethnic' },
    { name: 'Footwear', img: '/products/mojadi/mojadi_3.jpg', path: '/shop?category=Footwear' },
    { name: 'Streetwear', img: '/products/T-shirt/Coastel Vibes Design Black T-Shirt.jpg', path: '/shop?category=Streetwear' },
    { name: 'Urban Denim', img: '/products/jeans_baggy/jeans_5.jpg', path: '/shop?category=Urban Denim Collective' },
    { name: 'Best Sellers', img: '/products/Best_Seller/Camiseta Oversized.jpg', path: '/shop?category=Best Sellers' },
    { name: 'Luxury Signature', img: '/products/premium/signature_01.jpg', path: '/shop?category=Luxury Signature' }
  ];

  const categories = categoriesList.map(cat => ({
    ...cat,
    count: `${products.filter(p => p.category === cat.name || (cat.name === 'Urban Denim' && p.category === 'Urban Denim Collective')).length} Items`
  }));

  return (
    <div className="bg-white min-h-screen pb-32">
      <div className="max-w-[1600px] mx-auto px-4 py-12">
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-[10px] font-black tracking-[0.5em] text-brand-gold uppercase">The Collection</span>
          <h1 className="text-[28px] font-black uppercase tracking-tighter text-black leading-none">Shop Categories</h1>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(cat.path)}
              className="relative aspect-[3/4] overflow-hidden rounded-sm group cursor-pointer border border-gray-100 shadow-sm"
            >
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-all" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                 <h3 className="text-white text-[13px] font-black uppercase tracking-widest leading-tight mb-1">{cat.name}</h3>
                 <div className="h-0.5 w-6 bg-brand-gold mb-2 transition-all group-hover:w-12"></div>
                 <p className="text-white/70 text-[9px] font-bold uppercase tracking-[0.2em]">{cat.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
