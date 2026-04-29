import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col gap-2 group active:opacity-90 transition-opacity"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-white border border-gray-100 shadow-sm">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        
        {/* Quick Add */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
          }}
          className="absolute bottom-1.5 right-1.5 w-7 h-7 md:w-9 md:h-9 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-100 active:scale-90 transition-all z-20 shadow-lg group/cart"
        >
          <ShoppingBag className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 text-black stroke-[2.5px] group-hover/cart:text-brand-gold transition-colors" />
        </button>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-1.5 right-1.5 w-7 h-7 md:w-9 md:h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-100 z-20 shadow-md active:scale-90 transition-all"
        >
          <Heart className={`w-3.5 h-3.5 md:w-4.5 md:h-4.5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-black'}`} />
        </button>

        {/* Brand Tag */}
        <div className="absolute top-1.5 left-1.5 md:top-2.5 md:left-2.5">
           <span className="bg-black/90 backdrop-blur-md text-white px-2 py-0.5 md:px-3 md:py-1 text-[7px] md:text-[9px] font-black tracking-[0.2em] uppercase shadow-md border border-white/10">
             {product.brand}
           </span>
        </div>
      </Link>

      <div className="flex flex-col gap-0.5 px-0.5">
        <h3 className="text-[10px] md:text-[11px] font-black text-gray-950 tracking-tighter leading-tight uppercase truncate">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-[8px] md:text-[9px] text-gray-400 font-black uppercase tracking-widest">{product.category}</p>
            <span className="hidden md:block w-1 h-1 rounded-full bg-green-500" />
            <span className="hidden md:block text-[8px] text-green-600 font-bold uppercase tracking-wider">In Stock</span>
          </div>
          <span className="text-[11px] md:text-[12px] font-black text-gray-950">₹{product.price.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
