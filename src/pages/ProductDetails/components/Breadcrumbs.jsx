import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Breadcrumbs = ({ category, name }) => {
  return (
    <div className="flex items-center gap-1 text-[7px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 md:mb-12">
       <Link to="/" className="hover:text-black transition-colors">Home</Link>
       <ChevronLeft className="w-2 h-2 rotate-180" />
       <Link to="/shop" className="hover:text-black transition-colors whitespace-nowrap">{category}</Link>
       <ChevronLeft className="w-2 h-2 rotate-180" />
       <span className="text-black truncate max-w-[100px]">{name}</span>
    </div>
  );
};

export default Breadcrumbs;
