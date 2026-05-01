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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
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
          className="absolute bottom-1 right-1 w-6 h-6 md:w-9 md:h-9 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-100 active:scale-90 transition-all z-20 shadow-sm group/cart"
        >
          <ShoppingBag className="w-3 h-3 md:w-4.5 md:h-4.5 text-black stroke-[2.5px] group-hover/cart:text-brand-gold transition-colors" />
        </button>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-1 right-1 w-6 h-6 md:w-9 md:h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-100 z-20 shadow-sm active:scale-90 transition-all"
        >
          <Heart className={`w-3 h-3 md:w-4.5 md:h-4.5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-black'}`} />
        </button>

        {/* Brand Tag */}
        <div className="absolute top-1 left-1 md:top-2 md:left-2">
           <span className="bg-black/60 backdrop-blur-[2px] text-white px-1 py-0.5 md:px-2.5 md:py-1 text-[5px] md:text-[9px] font-bold tracking-widest uppercase border border-white/10 rounded-[1px]">
             {product.brand}
           </span>
        </div>
      </Link>

      <div className="flex flex-col gap-0 px-0.5">
        <h3 className="text-[9px] md:text-[11px] font-black text-gray-950 tracking-tighter leading-[1.1] uppercase truncate">
          {product.name}
        </h3>
        <div className="flex flex-col gap-0 mt-0.5">
          <p className="text-[6px] md:text-[8px] text-gray-400 font-bold uppercase tracking-wider leading-none">{product.category}</p>
          <span className="text-[9px] md:text-[12px] font-black text-gray-950 leading-tight">₹{product.price.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
