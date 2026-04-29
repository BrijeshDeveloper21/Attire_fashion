import React from 'react';
import { Home, ShoppingBag, Grid, Heart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Shop', icon: ShoppingBag, path: '/shop' },
    { label: 'Categories', icon: Grid, path: '/categories' },
    { label: 'Wishlist', icon: Heart, path: '/wishlist' },
    { label: 'Account', icon: User, path: '/account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-t border-gray-100 md:hidden pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.label} 
              to={item.path} 
              className="relative flex flex-col items-center justify-center w-full h-full group"
            >
              <div className={`relative p-1 rounded-xl transition-all duration-300 ${isActive ? 'text-brand-gold' : 'text-gray-400 group-active:scale-90'}`}>
                <item.icon className="w-5 h-5 mb-0.5" />
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -inset-1 bg-brand-gold/5 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-brand-gold font-black' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
