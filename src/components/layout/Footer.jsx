import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 md:pt-24 pb-12 px-6 md:px-12 border-t border-gray-900">
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-12 mb-16 md:mb-20">
        
        {/* Brand Section - Mobile Full Width */}
        <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <img src="/LOGO.png" className="h-[30px] md:h-[45px] w-auto invert brightness-0 mb-6 md:mb-8" alt="Attire Footer" />
          <p className="text-gray-500 text-[10px] md:text-[11px] leading-relaxed uppercase tracking-wider max-w-[280px]">
            Defining the intersection of style and comfort since 2012. Our collective is built on the philosophy of effortless luxury.
          </p>
        </div>
        
        {/* Links 1 */}
        <div className="flex flex-col items-start md:items-start">
          <h4 className="font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] mb-6 md:mb-8 text-yellow-500">The Collection</h4>
          <ul className="space-y-4 text-gray-400 text-[9px] font-black uppercase tracking-widest">
            <li><Link to="/shop" className="hover:text-white transition-colors">Season 26 Drops</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Signature Gecko Edit</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Exclusive Archive</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Bespoke Tailoring</Link></li>
          </ul>
        </div>
        
        {/* Links 2 */}
        <div className="flex flex-col items-start md:items-start">
          <h4 className="font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] mb-6 md:mb-8">Account</h4>
          <ul className="space-y-4 text-gray-400 text-[9px] font-black uppercase tracking-widest">
            <li><Link to="/account" className="hover:text-white transition-colors">Personal Profile</Link></li>
            <li><Link to="/checkout" className="hover:text-white transition-colors">My Orders</Link></li>
            <li><Link to="/wishlist" className="hover:text-white transition-colors">The Wishlist</Link></li>
            <li><Link to="/account" className="hover:text-white transition-colors">Settings</Link></li>
          </ul>
        </div>
        
        {/* Newsletter & Social - Mobile Full Width */}
        <div className="col-span-2 md:col-span-1 mt-4 md:mt-0 pt-8 md:pt-0 border-t border-gray-900 md:border-none flex flex-col items-center md:items-start">
          <h4 className="font-black text-[11px] md:text-[12px] uppercase tracking-[0.3em] mb-6 md:mb-8">Follow</h4>
          <div className="flex gap-6 mb-8 justify-center md:justify-start">
            {['IG', 'TW', 'FB', 'YT'].map(s => (
              <span key={s} className="text-[10px] font-black cursor-pointer hover:text-yellow-500 transition-colors uppercase tracking-widest">{s}</span>
            ))}
          </div>
          <div className="border-b border-gray-800 pb-2 w-full max-w-[300px]">
            <input 
              type="email" 
              placeholder="JOIN OUR NEWSLETTER" 
              className="bg-transparent text-[9px] w-full outline-none font-black tracking-widest text-center md:text-left"
            />
          </div>
        </div>
      </div>
      
      <div className="max-w-[1600px] mx-auto pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <p className="text-[8px] md:text-[9px] text-gray-600 font-black uppercase tracking-[0.4em]">
          © 2026 ATTIRE GLOBAL COLLECTIVE. ALL RIGHTS RESERVED.
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[7px] md:text-[8px] text-gray-600 font-bold uppercase tracking-widest">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Accessibility</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
