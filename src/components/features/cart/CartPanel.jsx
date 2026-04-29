import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CartPanel = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none'; // Lock swipe
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[400px] bg-white z-[110] flex flex-col shadow-2xl"
          >
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-gray-100">
               <h2 className="text-[14px] font-black uppercase tracking-[0.4em]">Shopping Bag</h2>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] bg-gray-100 px-2 py-0.5 font-bold uppercase tracking-widest rounded-full">{cartItems.length} items</span>
                 <X className="w-6 h-6 cursor-pointer hover:rotate-90 transition-transform" onClick={onClose} />
               </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-8 hide-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                   <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 md:mb-6">
                      <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-gray-300" />
                   </div>
                   <p className="text-[12px] md:text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-1 md:mb-2">Your bag is empty</p>
                   <p className="text-[9px] md:text-[10px] text-gray-400 font-medium max-w-[180px]">No luxury pieces added yet.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4 md:gap-8">
                  {cartItems.map((item, i) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 md:gap-5 border-b border-gray-50 pb-4 md:pb-0 md:border-none">
                       <div className="w-16 md:w-24 aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden shrink-0">
                          <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                       </div>
                       <div className="flex flex-col justify-between flex-1 py-0.5 md:py-1">
                          <div>
                            <div className="flex justify-between mb-0.5 md:mb-1">
                               <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest truncate max-w-[120px] md:max-w-none">{item.name}</h3>
                               <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-300 cursor-pointer" onClick={() => removeFromCart(item.id, item.selectedSize)} />
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Size: {item.selectedSize}</p>
                            <p className="text-[12px] font-black">₹{item.price.toLocaleString()}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                             <div className="flex items-center border border-gray-100 rounded-full px-1 py-1 bg-gray-50">
                                <button className="p-1" onClick={() => updateQuantity(item.id, item.selectedSize, -1)}><Minus className="w-3 h-3" /></button>
                                <span className="w-8 text-center text-[10px] font-black">{item.quantity}</span>
                                <button className="p-1" onClick={() => updateQuantity(item.id, item.selectedSize, 1)}><Plus className="w-3 h-3" /></button>
                             </div>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                   <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Estimated Total</span>
                   <span className="text-[18px] font-black tracking-tight">₹{subtotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => {
                    onClose();
                    if (isLoggedIn) {
                      navigate('/checkout');
                    } else {
                      navigate('/login?redirect=checkout');
                    }
                  }}
                  className="w-full bg-black text-white py-5 text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-3 hover:bg-gray-900 transition-all active:scale-95"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[9px] text-gray-400 text-center mt-6 font-bold uppercase tracking-widest">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPanel;
