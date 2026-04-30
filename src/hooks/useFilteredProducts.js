import { useMemo } from 'react';
import { useGlobalStore } from '@/store/globalStore';

export const useFilteredProducts = (categoryParam, searchParam, sortBy) => {
  const products = useGlobalStore(state => state.products);
  
  const filteredProducts = useMemo(() => {
    let result = products;

    // Category Filter
    if (categoryParam !== 'All') {
      result = result.filter(p => p.category === categoryParam);
    }

    // Search Filter
    if (searchParam) {
      const query = searchParam.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.subCategory.toLowerCase().includes(query)
      );
    }

    // Sort Logic
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default: // newest
        result = [...result].sort((a, b) => b.id - a.id);
    }

    return result;
  }, [categoryParam, searchParam, sortBy, products]);

  const categories = useMemo(() => {
    return ['All', ...new Set(products.map(p => p.category))];
  }, [products]);

  return { filteredProducts, categories };
};
