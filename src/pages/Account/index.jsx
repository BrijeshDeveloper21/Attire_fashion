import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, CreditCard, Settings, ChevronRight, Heart, Gift, LogOut, ArrowLeft, Plus } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/features/product/ProductCard';


const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'dashboard';
  
  const [activeTab, setActiveTab] = useState(initialTab);

  const { user, logout } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: user?.name || "Brijesh Guest",
      street: "123 Fashion Street, Suite 400",
      city: "Manhattan, New York 10001",
      country: "United States",
      isDefault: true
    }
  ]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', country: '', isDefault: false });
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/26',
      isDefault: true
    }
  ]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', type: 'Visa', expiry: '', isDefault: false });
  const [profile, setProfile] = useState({
    name: user?.name || "Brijesh Guest",
    email: user?.email || "guest@attire.com",
    phone: "+1 (555) 000-0000",
    notifications: {
      newsletter: true,
      orders: true,
      offers: false
    }
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setActiveTab(queryParams.get('tab') || 'dashboard');
  }, [location.search]);

  const handleSignOut = () => {
    logout();
    navigate('/login');
    console.log('Signed out successfully');
  };

  const removeAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
    console.log('Address removed');
  };

  const removePayment = (id) => {
    setPaymentMethods(paymentMethods.filter(p => p.id !== id));
    console.log('Payment method removed');
  };

  const saveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      console.log('Settings Saved', profile);
      window.alert('Account settings updated successfully!');
    }, 800);
  };

  const deleteAccount = () => {
    if (window.confirm('Are you absolutely sure you want to delete your account? This action is permanent and cannot be undone.')) {
      logout();
      navigate('/');
      window.alert('Your account has been deleted. We are sorry to see you go.');
    }
  };

  const savePayment = () => {
    const id = Math.max(0, ...paymentMethods.map(p => p.id)) + 1;
    const last4 = newCard.number.slice(-4) || '0000';
    setPaymentMethods([...paymentMethods, { ...newCard, id, last4 }]);
    setShowPaymentModal(false);
    setNewCard({ number: '', type: 'Visa', expiry: '', isDefault: false });
    console.log('Payment method added');
  };

  const saveAddress = () => {
    if (editingAddress) {
      setAddresses(addresses.map(a => a.id === editingAddress.id ? { ...editingAddress } : a));
      console.log('Address updated');
    } else {
      const id = Math.max(0, ...addresses.map(a => a.id)) + 1;
      setAddresses([...addresses, { ...newAddress, id, name: user?.name || "Brijesh Guest" }]);
      console.log('New address added');
    }
    setShowAddressModal(false);
    setEditingAddress(null);
    setNewAddress({ street: '', city: '', country: '', isDefault: false });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'My Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-black uppercase tracking-tighter">Your Orders</h2>
              <div className="flex gap-4">
                 <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b-2 border-transparent hover:text-black">All</button>
                 <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b-2 border-transparent">Processing</button>
                 <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b-2 border-transparent">Shipped</button>
              </div>
            </div>
            
            <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-lg py-20 flex flex-col items-center justify-center text-center px-6">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Package className="w-6 h-6 text-gray-300" />
               </div>
               <h3 className="text-sm font-black uppercase tracking-widest mb-2">No orders found</h3>
               <p className="text-[11px] text-gray-400 uppercase tracking-widest max-w-[240px] mb-8">You haven't placed any orders yet. Start shopping to fill this space!</p>
               <Link to="/shop" className="bg-black text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all">
                  Shop Collection
               </Link>
            </div>
          </div>
        );
      case 'addresses':
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[20px] font-black uppercase tracking-tighter">Saved Addresses</h2>
              <button 
                onClick={() => {
                  setEditingAddress(null);
                  setShowAddressModal(true);
                }}
                className="flex items-center gap-2 bg-black text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all"
              >
                 <Plus className="w-4 h-4" /> Add New
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {addresses.map(address => (
                 <div key={address.id} className={`border-2 p-6 rounded-sm relative transition-all ${address.isDefault ? 'border-black' : 'border-gray-100 hover:border-gray-300'}`}>
                    {address.isDefault && (
                      <span className="absolute top-4 right-4 bg-black text-white text-[8px] font-black px-2 py-1 uppercase tracking-widest">Default</span>
                    )}
                    <p className="text-[11px] font-black uppercase tracking-widest mb-1">{address.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                      {address.street}<br/>
                      {address.city}<br/>
                      {address.country}
                    </p>
                    <div className="flex gap-4 mt-6">
                       <button 
                         onClick={() => {
                           setEditingAddress(address);
                           setShowAddressModal(true);
                         }}
                         className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black"
                       >
                         Edit
                       </button>
                       <button 
                         onClick={() => removeAddress(address.id)}
                         className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700"
                       >
                         Remove
                       </button>
                    </div>
                 </div>
               ))}
            </div>

            {/* Address Modal */}
            <AnimatePresence>
              {showAddressModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowAddressModal(false)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white w-full max-w-md p-8 relative z-10 shadow-2xl"
                  >
                    <h3 className="text-[16px] font-black uppercase tracking-widest mb-8">{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Street Address</label>
                        <input 
                          type="text" 
                          value={editingAddress ? editingAddress.street : newAddress.street}
                          onChange={(e) => editingAddress ? setEditingAddress({...editingAddress, street: e.target.value}) : setNewAddress({...newAddress, street: e.target.value})}
                          className="w-full border-b border-gray-200 py-3 text-[11px] font-bold uppercase tracking-widest focus:border-black outline-none transition-colors"
                          placeholder="SHIPPING ADDRESS"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">City, State, Zip</label>
                        <input 
                          type="text" 
                          value={editingAddress ? editingAddress.city : newAddress.city}
                          onChange={(e) => editingAddress ? setEditingAddress({...editingAddress, city: e.target.value}) : setNewAddress({...newAddress, city: e.target.value})}
                          className="w-full border-b border-gray-200 py-3 text-[11px] font-bold uppercase tracking-widest focus:border-black outline-none transition-colors"
                          placeholder="CITY, STATE PINCODE"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Country</label>
                        <input 
                          type="text" 
                          value={editingAddress ? editingAddress.country : newAddress.country}
                          onChange={(e) => editingAddress ? setEditingAddress({...editingAddress, country: e.target.value}) : setNewAddress({...newAddress, country: e.target.value})}
                          className="w-full border-b border-gray-200 py-3 text-[11px] font-bold uppercase tracking-widest focus:border-black outline-none transition-colors"
                          placeholder="COUNTRY"
                        />
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <input 
                          type="checkbox" 
                          id="default-addr"
                          checked={editingAddress ? editingAddress.isDefault : newAddress.isDefault}
                          onChange={(e) => editingAddress ? setEditingAddress({...editingAddress, isDefault: e.target.checked}) : setNewAddress({...newAddress, isDefault: e.target.checked})}
                          className="w-4 h-4 accent-black"
                        />
                        <label htmlFor="default-addr" className="text-[9px] font-black uppercase tracking-widest cursor-pointer">Set as default address</label>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-12">
                      <button 
                        onClick={() => setShowAddressModal(false)}
                        className="flex-1 py-4 border border-gray-100 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={saveAddress}
                        className="flex-1 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all"
                      >
                        Save Address
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        );
      case 'wishlist':
        return (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-black uppercase tracking-tighter">My Wishlist</h2>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{wishlist.length} Items Liked</span>
            </div>
            
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                 {wishlist.map(product => (
                   <div key={product.id} className="group relative">
                      <ProductCard product={product} />
                   </div>
                 ))}
              </div>
            ) : (
              <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-lg py-20 flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                   <Heart className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest mb-2">Wishlist is empty</h3>
                <p className="text-[11px] text-gray-400 uppercase tracking-widest max-w-[240px] mb-8">You haven't added any products to your wishlist yet.</p>
                <Link to="/shop" className="bg-black text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all">
                   Explore Shop
                </Link>
              </div>
            )}
          </div>
        );
      case 'payments':
        return (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-black uppercase tracking-tighter">Payment Methods</h2>
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="flex items-center gap-2 bg-black text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all"
              >
                 <Plus className="w-4 h-4" /> Add New Card
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {paymentMethods.map(method => (
                 <div key={method.id} className={`border-2 p-8 rounded-sm relative transition-all bg-white ${method.isDefault ? 'border-black' : 'border-gray-50 hover:border-gray-200'}`}>
                    <div className="flex justify-between items-start mb-10">
                       <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-gray-400" />
                       </div>
                       {method.isDefault && (
                         <span className="bg-black text-white text-[8px] font-black px-2 py-1 uppercase tracking-widest">Primary</span>
                       )}
                    </div>
                    
                    <div className="space-y-1">
                       <p className="text-[12px] font-black uppercase tracking-widest text-gray-300">{method.type} CARD</p>
                       <p className="text-[16px] font-black tracking-widest">•••• •••• •••• {method.last4}</p>
                    </div>

                    <div className="flex justify-between items-center mt-10">
                       <div>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Expires On</p>
                          <p className="text-[10px] font-black uppercase tracking-widest">{method.expiry}</p>
                       </div>
                       <button 
                         onClick={() => removePayment(method.id)}
                         className="text-[9px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-red-500 transition-all"
                       >
                         Remove
                       </button>
                    </div>
                 </div>
               ))}

               {/* Digital Wallet / UPI Option */}
               <div className="border border-dashed border-gray-200 p-8 rounded-sm flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <Plus className="w-5 h-5 text-gray-300" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Connect Wallet</p>
                  <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">UPI, PayPal or Apple Pay</p>
               </div>
            </div>

            {/* Payment Modal */}
            <AnimatePresence>
              {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowPaymentModal(false)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white w-full max-w-md p-8 relative z-10 shadow-2xl"
                  >
                    <h3 className="text-[16px] font-black uppercase tracking-widest mb-8">Add Card</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Card Number</label>
                        <input 
                          type="text" 
                          maxLength="19"
                          value={newCard.number}
                          onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                          className="w-full border-b border-gray-200 py-3 text-[11px] font-bold uppercase tracking-widest focus:border-black outline-none transition-colors"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Expiry</label>
                          <input 
                            type="text" 
                            maxLength="5"
                            value={newCard.expiry}
                            onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                            className="w-full border-b border-gray-200 py-3 text-[11px] font-bold uppercase tracking-widest focus:border-black outline-none transition-colors"
                            placeholder="MM / YY"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Type</label>
                          <select 
                            value={newCard.type}
                            onChange={(e) => setNewCard({...newCard, type: e.target.value})}
                            className="w-full border-b border-gray-200 py-3 text-[11px] font-bold uppercase tracking-widest focus:border-black outline-none transition-colors bg-transparent"
                          >
                            <option value="Visa">Visa</option>
                            <option value="Mastercard">Mastercard</option>
                            <option value="Amex">Amex</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <input 
                          type="checkbox" 
                          id="default-card"
                          checked={newCard.isDefault}
                          onChange={(e) => setNewCard({...newCard, isDefault: e.target.checked})}
                          className="w-4 h-4 accent-black"
                        />
                        <label htmlFor="default-card" className="text-[9px] font-black uppercase tracking-widest cursor-pointer">Set as primary method</label>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-12">
                      <button 
                        onClick={() => setShowPaymentModal(false)}
                        className="flex-1 py-4 border border-gray-100 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={savePayment}
                        className="flex-1 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all"
                      >
                        Save Card
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <div className="bg-gray-50 p-8 rounded-sm border border-gray-100 mt-12">
               <h4 className="text-[11px] font-black uppercase tracking-widest mb-4">Secure Billing</h4>
               <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                 All transactions are secured and encrypted. Your card information is never stored directly on our servers under the Payment Card Industry Data Security Standard (PCI DSS).
               </p>
            </div>
          </div>
        );
      case 'rewards':
        return (
          <div className="space-y-8">
            <h2 className="text-[20px] font-black uppercase tracking-tighter">Your Rewards</h2>
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg text-white">
               <div className="flex justify-between items-start mb-12">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Tier Level</p>
                    <p className="text-[24px] font-black uppercase tracking-tighter">Elite Member</p>
                  </div>
                  <Gift className="w-8 h-8 opacity-40" />
               </div>
               <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-1">Available Credits</p>
                    <p className="text-[32px] font-black tracking-tighter">$142.50</p>
                  </div>
                  <button className="bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                     Redeem Points
                  </button>
               </div>
            </div>
            <div className="border border-gray-100 p-6 rounded-lg">
               <p className="text-[11px] font-black uppercase tracking-widest mb-4">Refer a Friend</p>
               <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 leading-relaxed">Get $20 off for every friend you refer to Attire Fashion. They get $10 off too!</p>
               <div className="flex gap-2">
                  <input type="text" readOnly value="ATTIRE-REF-909" className="flex-1 bg-gray-50 border border-gray-100 px-4 text-[11px] font-bold uppercase tracking-widest outline-none" />
                  <button className="bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest">Copy</button>
               </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-2xl space-y-12">
            <h2 className="text-[20px] font-black uppercase tracking-tighter">Account Settings</h2>
            
            {/* Profile Section */}
            <div className="space-y-8">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                  <h3 className="text-[12px] font-black uppercase tracking-[0.3em]">Personal Profile</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                     <input 
                       type="text" 
                       value={profile.name}
                       onChange={(e) => setProfile({...profile, name: e.target.value})}
                       className="w-full border-b border-gray-200 py-3 text-[11px] font-bold uppercase tracking-widest focus:border-black outline-none transition-colors"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                     <input 
                       type="email" 
                       value={profile.email}
                       onChange={(e) => setProfile({...profile, email: e.target.value})}
                       className="w-full border-b border-gray-200 py-3 text-[11px] font-bold uppercase tracking-widest focus:border-black outline-none transition-colors"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                     <input 
                       type="text" 
                       value={profile.phone}
                       onChange={(e) => setProfile({...profile, phone: e.target.value})}
                       className="w-full border-b border-gray-200 py-3 text-[11px] font-bold uppercase tracking-widest focus:border-black outline-none transition-colors"
                     />
                  </div>
               </div>
            </div>

            {/* Notifications Section */}
            <div className="space-y-8">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                  <h3 className="text-[12px] font-black uppercase tracking-[0.3em]">Notification Preferences</h3>
               </div>
               
               <div className="space-y-6">
                  {[
                    { key: 'newsletter', label: 'Signature Newsletter', desc: 'Get updates on new collections and editorial stories.' },
                    { key: 'orders', label: 'Order Status Updates', desc: 'Real-time notifications about your shipment and delivery.' },
                    { key: 'offers', label: 'Personalized Offers', desc: 'Exclusive early access and member-only rewards.' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-start justify-between group">
                       <div className="max-w-[80%]">
                          <p className="text-[11px] font-black uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">{item.desc}</p>
                       </div>
                       <button 
                         onClick={() => setProfile({
                           ...profile, 
                           notifications: { ...profile.notifications, [item.key]: !profile.notifications[item.key] }
                         })}
                         className={`w-10 h-5 rounded-full relative transition-all duration-300 ${profile.notifications[item.key] ? 'bg-black' : 'bg-gray-200'}`}
                       >
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${profile.notifications[item.key] ? 'left-6' : 'left-1'}`} />
                       </button>
                    </div>
                  ))}
               </div>
            </div>

            <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
               <div className="flex gap-4 items-center">
                 <button 
                   onClick={saveSettings}
                   disabled={isSaving}
                   className="bg-black text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                 >
                   {isSaving ? (
                     <>
                       <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                       Saving...
                     </>
                   ) : 'Save All Changes'}
                 </button>
                 {isSaving === false && (
                   <span className="text-[9px] font-black uppercase text-green-500 tracking-widest animate-pulse">Changes synced</span>
                 )}
               </div>
               
               <button 
                 onClick={deleteAccount}
                 className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors border-b-2 border-transparent hover:border-red-700"
               >
                 Delete Account
               </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-12">
            <div className="flex items-center gap-8 bg-gray-50/50 p-8 rounded-lg border border-gray-100">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-premium">
                  <User className="w-10 h-10 text-gray-800" />
               </div>
               <div>
                  <h1 className="text-[24px] font-black uppercase tracking-tighter text-gray-900">Brijesh Guest</h1>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Premium Tier Member</p>
                  <div className="flex gap-4 mt-6">
                     <div className="flex flex-col">
                        <span className="text-[14px] font-black">04</span>
                        <span className="text-[8px] font-bold uppercase text-gray-400 tracking-widest">Orders</span>
                     </div>
                     <div className="w-px h-8 bg-gray-200 mt-1" />
                     <div className="flex flex-col">
                        <span className="text-[14px] font-black">12</span>
                        <span className="text-[8px] font-bold uppercase text-gray-400 tracking-widest">Wishlist</span>
                     </div>
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    <h2 className="text-[14px] font-black uppercase tracking-[0.3em]">Loved Products</h2>
                  </div>
                  <Link to="/shop" className="text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:border-black transition-all text-gray-400 hover:text-black">Add More</Link>
                </div>

                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                    {wishlist.slice(0, 6).map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50/50 border border-dashed border-gray-200 p-16 text-center rounded-lg">
                     <Heart className="w-10 h-10 text-gray-200 mx-auto mb-4" />
                     <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-900 mb-2">No Liked Items</h4>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">Save your favorite signature pieces<br/>to see them here.</p>
                  </div>
                )}
              </div>
            </div>
          );
      }
    };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-12 md:py-20">
         <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sidebar Navigation - Hidden on mobile when a tab is active */}
            <aside className={`lg:w-80 shrink-0 ${activeTab !== 'dashboard' ? 'hidden lg:block' : 'block'}`}>
               <div className="lg:sticky lg:top-32">
                  <div className="mb-8 lg:mb-10">
                     <h2 className="text-[24px] lg:text-[28px] font-black uppercase tracking-tighter mb-1">My Account</h2>
                     <p className="text-[9px] lg:text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Manage your profile and settings</p>
                  </div>
                  
                  {/* Grid Layout for Mobile, Sidebar for Desktop */}
                  <nav className="grid grid-cols-2 lg:flex lg:flex-col gap-2 md:gap-3 mb-10 lg:mb-0">
                     {menuItems.filter(item => item.id !== 'dashboard').map((item) => (
                        <button
                          key={item.id}
                          onClick={() => navigate(`/account?tab=${item.id}`)}
                          className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-4 p-4 lg:px-6 lg:py-4 rounded-sm transition-all duration-300 border lg:border-0 bg-white text-gray-500 border-gray-100 hover:border-black hover:text-black shadow-sm"
                        >
                          <item.icon className="w-5 h-5 lg:w-4 lg:h-4 mb-2 lg:mb-0 text-gray-400" />
                          <span className="text-[9px] lg:text-[11px] font-black uppercase tracking-widest text-center lg:text-left">{item.label}</span>
                        </button>
                     ))}
                  </nav>

                  <div className="hidden lg:block mt-12 pt-12 border-t border-gray-100">
                     <button 
                        onClick={handleSignOut}
                        className="flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 w-full transition-all rounded-sm font-black text-[11px] uppercase tracking-widest"
                     >
                        <LogOut className="w-4 h-4" /> Sign Out
                     </button>
                  </div>
               </div>
            </aside>

            {/* Main Content Area */}
            <main className={`flex-1 min-h-[60vh] pt-4 lg:pt-0 ${activeTab === 'dashboard' ? 'hidden lg:block' : 'block'}`}>
               {/* Mobile Back Button */}
               {activeTab !== 'dashboard' && (
                 <button 
                   onClick={() => navigate('/account?tab=dashboard')}
                   className="lg:hidden flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-[0.2em] group"
                 >
                   <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                   Back to Account
                 </button>
               )}

               <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderContent()}
                  </motion.div>
               </AnimatePresence>

               {/* Mobile Sign Out (Only on Dashboard) */}
               {activeTab === 'dashboard' && (
                 <div className="lg:hidden mt-20 pt-10 border-t border-gray-100">
                    <button 
                       onClick={handleSignOut}
                       className="flex items-center justify-center gap-4 w-full py-5 text-red-500 font-black text-[11px] uppercase tracking-[0.3em] border border-red-100"
                    >
                       <LogOut className="w-4 h-4" /> Sign Out from Account
                    </button>
                 </div>
               )}
            </main>

         </div>
      </div>
    </div>
  );
};

export default Account;
