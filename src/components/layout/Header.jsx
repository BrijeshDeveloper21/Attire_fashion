import React, { useState } from 'react';
import { Menu, Heart, ShoppingBag, Search, User, X, Camera, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onCartClick }) => {
  const { cartItems } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isHome = location.pathname === '/';
  const showSearch = location.pathname === '/' || location.pathname === '/shop';

  return (
    <>
      {/* Top Utility Bar - Hidden on Mobile */}
      <div className="hidden md:flex bg-black text-white text-[11px] py-2 px-12 justify-end items-center gap-6 font-medium">
        <a href="#" className="hover:text-brand-gold transition-colors">📱 App Download</a>
        <a href="#" className="hover:text-brand-gold transition-colors text-[10px] bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest">Help</a>
      </div>

      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-1 md:py-2">
          {/* Main Top Bar */}
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile Left: Menu or Back */}
            <div className="md:hidden flex items-center">
              {!isHome ? (
                <button 
                  onClick={() => {
                    if (location.pathname === '/account' || location.pathname.startsWith('/account')) {
                      navigate('/');
                    } else {
                      navigate(-1);
                    }
                  }} 
                  className="p-1 -ml-1 text-gray-700 active:scale-90 transition-transform"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              ) : (
                <button onClick={() => setIsMenuOpen(true)} className="p-1 -ml-1 text-gray-700 active:scale-90 transition-transform">
                  <Menu className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Logo - Centered on Mobile, Start on Desktop */}
            <div className="flex items-center md:gap-12 flex-1 md:flex-none justify-center md:justify-start">
              <Link to="/" className="shrink-0">
                 <img 
                   src="/LOGO.png" 
                   alt="Attire Logo" 
                   className="h-[24px] md:h-[36px] w-auto object-contain transition-all" 
                 />
              </Link>
              
              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-9 ml-12">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Blazers', path: '/shop?category=Blazers' },
                  { label: 'Ethnic', path: '/shop?category=Signature Ethnic' },
                  { label: 'Sherwani', path: '/shop?category=Sherwani' },
                  { label: 'Shirts', path: '/shop?category=Shirts' },
                  { label: 'Accessories', path: '/shop?category=Bags' },
                ].map((link) => {
                  const isActive = location.pathname === link.path || location.search.includes(link.path.split('?')[1]);
                  return (
                    <Link 
                      key={link.label} 
                      to={link.path} 
                      className={`relative text-[11px] font-black uppercase tracking-[0.2em] transition-all pb-1 ${
                        isActive ? 'text-brand-gold' : 'text-gray-900 hover:text-brand-gold'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div 
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-gold"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            {/* Desktop Search - Hidden on Mobile */}
            {showSearch && (
              <div className="hidden md:flex flex-1 max-w-lg mx-12">
                <div className="relative flex items-center bg-gray-50 border border-transparent focus-within:border-gray-200 focus-within:bg-white rounded-full px-4 py-2 w-full transition-all duration-300 group">
                  <Search className="w-4 h-4 text-gray-400 mr-3 group-focus-within:text-black transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search for styles, brands & more..." 
                    className="bg-transparent text-[12px] font-medium outline-none w-full placeholder:text-gray-400" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                        setIsSearchOpen(false);
                      }
                    }}
                  />
                  <Camera className="w-5 h-5 text-gray-400 ml-3 cursor-pointer hover:text-black transition-colors" />
                </div>
              </div>
            )}

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-7 text-gray-900 ml-4">
              {/* Login/Account Dropdown for Desktop */}
              <div 
                className="hidden md:block relative group"
                onMouseEnter={() => setIsAccountOpen(true)}
                onMouseLeave={() => setIsAccountOpen(false)}
              >
                <div className="flex items-center gap-2 cursor-pointer py-3 group-hover:text-brand-gold transition-colors">
                  <User className="w-5 h-5 shrink-0" />
                  <div className="flex flex-col -gap-0.5 hidden md:flex">
                     <span className="text-[9px] font-bold text-gray-400 leading-none">
                       {isLoggedIn ? `Hello, ${user?.name?.split(' ')[0]}` : 'Hello, Sign in'}
                     </span>
                     <span className="text-[11px] font-black uppercase tracking-widest text-gray-900 group-hover:text-brand-gold">Account</span>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isAccountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full right-0 mt-1 w-64 bg-white shadow-2xl rounded-sm border border-gray-100 z-[100] overflow-hidden"
                    >
                      <div className="p-5 border-b border-gray-50 bg-gray-50/50">
                        {isLoggedIn ? (
                          <p className="text-[11px] font-black uppercase tracking-widest text-center truncate italic">Premium Member</p>
                        ) : (
                          <div className="flex flex-col gap-3">
                            <Link 
                              to="/login" 
                              className="block w-full bg-black text-white text-center py-3 text-[11px] font-black uppercase tracking-widest hover:bg-brand-gold transition-colors shadow-lg"
                            >
                              Log In
                            </Link>
                            <Link 
                              to="/signup" 
                              className="block w-full bg-white text-black border-2 border-black text-center py-2.5 text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                            >
                              Sign Up
                            </Link>
                            <p className="text-[9px] text-center mt-1 text-gray-400 font-bold uppercase tracking-tighter">Become a member for exclusive access</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-2">
                        {[
                          { label: 'My Profile', path: '/account?tab=dashboard' },
                          { label: 'My Orders', path: '/account?tab=orders' },
                          { label: 'Wishlist', path: '/account?tab=wishlist' },
                          { label: 'Rewards / Credits', path: '/account?tab=rewards' },
                          { label: 'Gift Cards', path: '/account?tab=dashboard' },
                          { label: 'Contact Us', path: '/account?tab=dashboard' },
                        ].map((item) => (
                          <Link 
                            key={item.label}
                            to={item.path}
                            className="flex items-center px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-gray-600 hover:text-black hover:bg-gray-50 rounded-sm transition-all"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      
                      {isLoggedIn && (
                        <div className="p-2 bg-gray-50/50 border-t border-gray-50">
                           <button 
                             onClick={() => { logout(); navigate('/'); }}
                             className="w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-gold transition-colors"
                           >
                              Logout
                           </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist Icon */}
              <Link to="/wishlist" className="p-2 hover:text-brand-gold transition-colors">
                <Heart className="w-5 h-5 stroke-[2px]" />
              </Link>

              {/* Cart Icon */}
              <div className="relative p-2 cursor-pointer group" onClick={onCartClick}>
                <ShoppingBag className="w-5 h-5 group-hover:text-brand-gold transition-colors stroke-[2px]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[9px] font-black h-4.5 w-4.5 rounded-full flex items-center justify-center border border-white shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Row 2: Search Bar (Home and Shop only) */}
          {showSearch && (
            <div className="md:hidden px-4 pb-3">
               <div 
                 onClick={() => setIsSearchOpen(true)}
                 className="flex items-center bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 transition-all active:bg-gray-100"
               >
                  <Search className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-400 font-medium">Search for styles, brands & more...</span>
                  <Camera className="w-4 h-4 text-gray-400 ml-auto" />
               </div>
            </div>
          )}
        </div>
      </header>

      {/* Side Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] lg:hidden"
            />
            {/* Panel */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-[320px] bg-white z-[201] shadow-2xl lg:hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-black text-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Welcome</p>
                    {isLoggedIn ? (
                      <p className="text-xs font-black uppercase tracking-widest">{user?.name}</p>
                    ) : (
                      <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-xs font-black uppercase tracking-widest">Login / Register</Link>
                    )}
                  </div>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6">
                <nav className="flex flex-col">
                  {[
                    { label: 'Home', path: '/' },
                    { label: 'New Arrivals', path: '/shop' },
                    { label: 'Ethnic Collective', path: '/shop?category=Signature Ethnic' },
                    { label: 'Luxury Signature', path: '/shop?category=Luxury Signature' },
                    { label: 'Urban Collective', path: '/shop?category=Urban Denim Collective' },
                    { label: 'The Outlet', path: '/shop?category=Best Sellers' },
                  ].map((item, idx) => (
                    <Link 
                      key={item.label} 
                      to={item.path} 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-6 py-4 text-sm font-black uppercase tracking-[0.15em] text-gray-900 border-b border-gray-50 flex items-center justify-between group active:bg-gray-50"
                    >
                      {item.label}
                      <span className="text-nykaa-pink opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="p-6 bg-gray-50 space-y-4">
                 <a href="#" className="block text-[10px] font-black uppercase tracking-widest text-gray-500">Contact Us</a>
                 <a href="#" className="block text-[10px] font-black uppercase tracking-widest text-gray-500">Track Order</a>
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Attire Fashion v1.0</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Full-Screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[200] bg-white p-6 md:hidden"
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="flex-1 relative flex items-center bg-gray-50 rounded-full px-4 py-3">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search for products..." 
                    className="bg-transparent text-sm outline-none w-full font-medium" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                        setIsSearchOpen(false);
                      }
                    }}
                  />
               </div>
               <button onClick={() => setIsSearchOpen(false)} className="text-sm font-black uppercase text-gray-400">Cancel</button>
            </div>
            <div className="flex flex-col gap-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Trending Searches</p>
               {['Linen Shirts', 'Evening Sarees', 'Work Blazer', 'Summer Edit'].map(t => (
                 <div key={t} className="text-sm font-bold text-gray-800 py-2 border-b border-gray-50">{t}</div>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
