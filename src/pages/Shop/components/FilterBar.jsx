import React from 'react';
import { SlidersHorizontal, ChevronDown, Filter, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterBar = ({ 
  categories, 
  categoryParam, 
  handleCategoryChange, 
  sortBy, 
  setSortBy, 
  sortOptions, 
  showSortDropdown, 
  setShowSortDropdown, 
  setShowFilters 
}) => {
  return (
    <div className="sticky top-[70px] md:top-[85px] z-30 bg-white/95 backdrop-blur-md py-1.5 border-b border-gray-50 mb-3 md:mb-4">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full lg:w-auto pb-1 lg:pb-0">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 md:px-6 py-2 md:py-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap rounded-sm ${
                categoryParam === cat 
                ? 'bg-black text-white border-black shadow-lg scale-[1.02]' 
                : 'bg-white text-gray-500 border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-8 w-full lg:w-auto justify-end">
          <div className="relative">
            <button 
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest cursor-pointer group"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Sort: {sortOptions.find(o => o.value === sortBy)?.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showSortDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSortDropdown(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-64 bg-white border border-gray-100 shadow-2xl z-50 py-2"
                  >
                    {sortOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setShowSortDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-6 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                      >
                        {opt.label}
                        {sortBy === opt.value && <Check className="w-4 h-4 text-brand-gold" />}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest cursor-pointer group"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
