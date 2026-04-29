import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-8 text-center pb-32">
      <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
         <Heart className="w-10 h-10 text-gray-200" />
      </div>
      <h1 className="text-[20px] font-black uppercase tracking-[0.2em] mb-4">Your Wishlist is Empty</h1>
      <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest max-w-xs mb-10 leading-relaxed">
        Save your favorite luxury pieces to your wishlist and we'll keep them here for you.
      </p>
      
      <button 
        onClick={() => navigate('/shop')}
        className="bg-black text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all"
      >
        Explore Collection
      </button>
    </div>
  );
};

export default Wishlist;
