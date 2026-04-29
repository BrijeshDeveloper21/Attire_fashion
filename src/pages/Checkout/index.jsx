import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

import { CheckCircle, Truck, CreditCard, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [shippingData, setShippingData] = useState({ 
    name: user?.name || '', 
    email: user?.email || '', 
    address: '', 
    city: '' 
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login?redirect=checkout');
    }
  }, [isLoggedIn, navigate]);

  const handleNext = () => setStep(prev => prev + 1);

  if (step === 3) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
             <CheckCircle className="w-12 h-12 text-yellow-500" />
          </div>
          <h2 className="text-[24px] font-black uppercase tracking-[0.4em] mb-4">Order Confirmed</h2>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed mb-10">
            Thank you for choosing ATTIRE. Your order #AT-99218 has been accepted and is being prepared by our concierge.
          </p>
          <div className="space-y-4">
             <Link to="/" className="block w-full bg-black text-white py-5 text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all">
                Continue Shopping
             </Link>
             <button className="block w-full border border-gray-100 py-5 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                Download Invoice
             </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
         <ShoppingBag className="w-12 h-12 text-gray-200 mb-6" />
         <p className="text-[14px] font-black uppercase tracking-widest mb-8">Nothing to checkout</p>
         <Link to="/shop" className="bg-black text-white px-12 py-5 text-[10px] font-black uppercase tracking-widest">
            Browse Store
         </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Checkout Header */}
        <div className="flex flex-col items-center mb-16">
           <Link to="/">
             <img src="/LOGO.png" className="h-10 w-auto mb-8" alt="Logo" />
           </Link>
           <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${step >= 1 ? 'text-black' : 'text-gray-300'}`}>
                 <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 1 ? 'border-black bg-black text-white' : 'border-gray-200'}`}>1</span>
                 Shipping
              </div>
              <ChevronRight className="w-4 h-4 text-gray-200" />
              <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${step >= 2 ? 'text-black' : 'text-gray-300'}`}>
                 <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 2 ? 'border-black bg-black text-white' : 'border-gray-200'}`}>2</span>
                 Payment
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Flow */}
          <div className="lg:col-span-7">
             <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="shipping"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white p-8 md:p-12 shadow-sm rounded-sm"
                  >
                     <h3 className="text-[14px] font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                        <Truck className="w-5 h-5" />
                        Shipping Details
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="flex flex-col gap-2">
                           <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                           <input 
                             type="text" 
                             className="border-b border-gray-100 py-2 focus:border-black outline-none text-[13px] font-medium" 
                             placeholder="John Doe"
                             value={shippingData.name}
                             onChange={e => setShippingData({...shippingData, name: e.target.value})}
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                           <input 
                             type="email" 
                             className="border-b border-gray-100 py-2 focus:border-black outline-none text-[13px] font-medium" 
                             placeholder="john@example.com"
                             value={shippingData.email}
                             onChange={e => setShippingData({...shippingData, email: e.target.value})}
                           />
                        </div>
                        <div className="col-span-full flex flex-col gap-2">
                           <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Shipping Address</label>
                           <input 
                             type="text" 
                             className="border-b border-gray-100 py-2 focus:border-black outline-none text-[13px] font-medium" 
                             placeholder="Street name, House no."
                             value={shippingData.address}
                             onChange={e => setShippingData({...shippingData, address: e.target.value})}
                           />
                        </div>
                     </div>
                     <div className="flex flex-col gap-4">
                        <button 
                          onClick={handleNext}
                          className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-gray-900 transition-all"
                        >
                          Continue to Payment
                        </button>
                        <button 
                          onClick={() => navigate('/')}
                          className="w-full text-center text-[9px] font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors py-2"
                        >
                          Return to Shopping Bag
                        </button>
                     </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="payment"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white p-8 md:p-12 shadow-sm rounded-sm"
                  >
                     <h3 className="text-[14px] font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                        <CreditCard className="w-5 h-5" />
                        Payment Method
                     </h3>
                     <div className="space-y-4 mb-12">
                        <div className="border border-black p-6 flex justify-between items-center cursor-pointer">
                           <div className="flex items-center gap-4">
                              <div className="w-4 h-4 rounded-full border-4 border-black"></div>
                              <span className="text-[11px] font-black uppercase tracking-widest">Credit / Debit Card</span>
                           </div>
                           <div className="flex gap-2">
                              {/* Simple card icons placeholders */}
                              <div className="w-8 h-5 bg-gray-100 rounded"></div>
                              <div className="w-8 h-5 bg-gray-100 rounded"></div>
                           </div>
                        </div>
                        <div className="border border-gray-100 p-6 flex justify-between items-center opacity-50 cursor-not-allowed">
                           <div className="flex items-center gap-4">
                              <div className="w-4 h-4 rounded-full border border-gray-200"></div>
                              <span className="text-[11px] font-black uppercase tracking-widest">UPI / Net Banking</span>
                           </div>
                        </div>
                     </div>
                      <div className="flex flex-col gap-4">
                         <button 
                           onClick={() => {
                             clearCart();
                             handleNext();
                           }}
                           className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.5em] shadow-2xl hover:bg-gray-900 transition-all"
                         >
                           Pay ₹{subtotal.toLocaleString()} Now
                         </button>
                         <button 
                           onClick={() => setStep(1)} 
                           className="w-full text-center text-[9px] font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors py-2"
                         >
                           ↑ Modify Shipping Details
                         </button>
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
             <div className="bg-white p-8 md:p-10 shadow-sm rounded-sm">
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 pb-4 border-b border-gray-50">Order Summary</h4>
                <div className="flex flex-col gap-6 mb-8">
                   {cartItems.map(item => (
                     <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-20 bg-gray-50 rounded-sm overflow-hidden shrink-0">
                           <img src={item.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                           <h5 className="text-[10px] font-black uppercase tracking-widest mb-1">{item.name}</h5>
                           <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Size: {item.selectedSize} × {item.quantity}</p>
                           <p className="text-[11px] font-black mt-1">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="space-y-4 pt-6 border-t border-gray-100">
                   <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400 font-black uppercase tracking-widest">Subtotal</span>
                      <span className="font-black">₹{subtotal.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400 font-black uppercase tracking-widest">Shipping</span>
                      <span className="text-green-600 font-black uppercase tracking-widest">Free</span>
                   </div>
                   <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                      <span className="text-[12px] font-black uppercase tracking-[0.2em]">Grand Total</span>
                      <span className="text-[20px] font-black tracking-tighter">₹{subtotal.toLocaleString()}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
