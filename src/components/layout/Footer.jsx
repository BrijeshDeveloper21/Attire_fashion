import React from 'react';
import { Link } from 'react-router-dom';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

/* Inline SVG social icons — lucide-react doesn't include brand icons */
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10 md:pt-20 pb-6 md:pb-10 px-5 md:px-12 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">

        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8 md:gap-10 mb-8 md:mb-16">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left mb-2 md:mb-0">
            <img src="/LOGO.png" className="h-[22px] md:h-[40px] w-auto invert brightness-0 mb-4 md:mb-6" alt="Attire" />
            <p className="text-gray-500 text-[8px] md:text-[10px] leading-relaxed uppercase tracking-wider max-w-[260px]">
              Defining the intersection of style & comfort since 2012.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5 mt-5 md:mt-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group">
                <InstagramIcon className="w-[14px] h-[14px] md:w-4 md:h-4 text-gray-500 group-hover:text-[#D4AF37] transition-all duration-300 group-hover:scale-110" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group">
                <FacebookIcon className="w-[14px] h-[14px] md:w-4 md:h-4 text-gray-500 group-hover:text-[#D4AF37] transition-all duration-300 group-hover:scale-110" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="group">
                <TwitterIcon className="w-[14px] h-[14px] md:w-4 md:h-4 text-gray-500 group-hover:text-[#D4AF37] transition-all duration-300 group-hover:scale-110" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group">
                <YoutubeIcon className="w-[14px] h-[14px] md:w-4 md:h-4 text-gray-500 group-hover:text-[#D4AF37] transition-all duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="flex flex-col">
            <h4 className="font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-6 text-[#D4AF37]">Shop</h4>
            <ul className="space-y-2.5 md:space-y-3 text-gray-500 text-[8px] md:text-[9px] font-bold uppercase tracking-widest">
              <li><Link to="/shop" className="hover:text-white transition-colors duration-300">New Arrivals</Link></li>
              <li><Link to="/shop?category=Streetwear" className="hover:text-white transition-colors duration-300">Streetwear</Link></li>
              <li><Link to="/shop?category=Blazers" className="hover:text-white transition-colors duration-300">Blazers</Link></li>
              <li><Link to="/shop?category=Signature Ethnic" className="hover:text-white transition-colors duration-300">Ethnic Wear</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="flex flex-col">
            <h4 className="font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-6">Company</h4>
            <ul className="space-y-2.5 md:space-y-3 text-gray-500 text-[8px] md:text-[9px] font-bold uppercase tracking-widest">
              <li><Link to="/account" className="hover:text-white transition-colors duration-300">My Account</Link></li>
              <li><Link to="/account?tab=orders" className="hover:text-white transition-colors duration-300">Track Order</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors duration-300">Wishlist</Link></li>
              <li><span className="hover:text-white transition-colors duration-300 cursor-pointer">About Us</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <h4 className="font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-6">Contact</h4>
            <ul className="space-y-2.5 md:space-y-3 text-gray-500 text-[8px] md:text-[9px] font-bold uppercase tracking-widest">
              <li className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-[#D4AF37] shrink-0" />
                <span>support@attire.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-[#D4AF37] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="leading-relaxed">Mumbai, India</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start pt-4 md:pt-0 border-t border-white/5 md:border-none">
            <h4 className="font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-6 text-[#D4AF37]">Newsletter</h4>
            <p className="text-gray-600 text-[7px] md:text-[8px] uppercase tracking-wider mb-4 text-center md:text-left">
              Get exclusive drops & early access
            </p>
            <div className="relative w-full max-w-[260px]">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="bg-white/5 border border-white/10 text-[8px] md:text-[9px] w-full outline-none font-black tracking-widest px-4 py-2.5 pr-10 placeholder:text-gray-700 focus:border-[#D4AF37]/40 transition-colors"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#D4AF37] transition-colors">
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[7px] md:text-[8px] text-gray-700 font-bold uppercase tracking-[0.3em]">
            © 2026 Attire Global. All Rights Reserved.
          </p>
          <div className="flex justify-center gap-x-6 text-[7px] md:text-[8px] text-gray-600 font-bold uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="text-gray-800">|</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="text-gray-800">|</span>
            <span className="hover:text-white cursor-pointer transition-colors">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
