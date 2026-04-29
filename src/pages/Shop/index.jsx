import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';

import { ProductCard } from '@/components/features';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { ShopHeader, FilterBar } from './components';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';
  
  const [sortBy, setSortBy] = useState('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20000]);

  // Always get all products (filtered by search and sort) for the grouped display
  const { filteredProducts: allProducts, categories } = useFilteredProducts('All', searchParam, sortBy);
  
  // Also get filtered count for the specific category to show in header/meta
  const categorySpecificProducts = categoryParam === 'All' ? allProducts : allProducts.filter(p => p.category === categoryParam);

  const sortOptions = [
    { label: 'Newest Arrivals', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Top Rated', value: 'rating' },
  ];

  const handleCategoryChange = (cat) => {
    setSearchParams({ category: cat });
  };

  return (
    <div className="bg-white min-h-screen">
      <ShopHeader 
        searchParam={searchParam} 
        categoryParam={categoryParam} 
        resultCount={categorySpecificProducts.length} 
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-1 md:py-2">
        <FilterBar 
          categories={categories}
          categoryParam={categoryParam}
          handleCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOptions={sortOptions}
          showSortDropdown={showSortDropdown}
          setShowSortDropdown={setShowSortDropdown}
          setShowFilters={setShowFilters}
        />

        {/* Grouped Product Display */}
        <div className="space-y-16 md:space-y-24 mb-32">
          {(() => {
            // Re-order categories to put selected one first
            const orderedCategories = [...categories.filter(c => c !== 'All')];
            if (categoryParam !== 'All') {
              const selectedIdx = orderedCategories.indexOf(categoryParam);
              if (selectedIdx > -1) {
                orderedCategories.splice(selectedIdx, 1);
                orderedCategories.unshift(categoryParam);
              }
            }

            return orderedCategories.map(cat => {
              const catProducts = allProducts.filter(p => p.category === cat);
              if (catProducts.length === 0) return null;
              
              const isSelected = cat === categoryParam;

              return (
                <div key={cat} className="space-y-8 md:space-y-12">
                  <div className="flex items-center gap-4">
                    <h2 className={`text-[12px] md:text-[20px] font-black uppercase tracking-[0.4em] shrink-0 transition-colors ${isSelected ? 'text-brand-gold' : 'text-black'}`}>
                      {cat}
                      {isSelected && <span className="ml-4 text-[9px] font-bold tracking-widest text-brand-gold/60 align-middle">(Current Selection)</span>}
                    </h2>
                    <div className={`h-px w-full ${isSelected ? 'bg-brand-gold/20' : 'bg-gray-100'}`} />
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest whitespace-nowrap">{catProducts.length} Pieces</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-20">
                    {catProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              );
            });
          })()}
        </div>

        {/* Empty State */}
        {allProducts.length === 0 && (
          <div className="text-center py-32">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-8 h-8 text-gray-200" />
             </div>
             <p className="text-gray-400 text-[12px] font-bold uppercase tracking-widest">No products match your criteria</p>
             <button 
                onClick={() => handleCategoryChange('All')}
                className="mt-6 text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-brand-gold hover:border-brand-gold"
              >
               Clear Filters
             </button>
          </div>
        )}
      </div>

      {/* Filter Sidebar Overlap */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" 
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b flex justify-between items-center">
                <h2 className="text-xl font-black uppercase tracking-tighter">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                <div className="mb-12">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-gray-400">Categories</h3>
                  <div className="flex flex-wrap gap-3">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                          categoryParam === cat ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-500'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-gray-400">Price Threshold</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span>₹0</span>
                        <span>₹{priceRange[1].toLocaleString()}</span>
                     </div>
                     <input 
                        type="range" 
                        min="0" 
                        max="20000" 
                        value={priceRange[1]} 
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full accent-black h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                      />
                  </div>
                </div>
              </div>

              <div className="p-8 border-t bg-gray-50">
                <button 
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-black text-white py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors shadow-xl"
                >
                  Apply Filters ({categorySpecificProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
