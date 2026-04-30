import { create } from 'zustand';
import { productService } from '../services/productService';
import { cmsService } from '../services/cmsService';
import { products as fallbackProducts } from '../data/products';

export const useGlobalStore = create((set, get) => ({
  // State
  products: fallbackProducts,
  categories: [],
  banners: [],
  settings: {},
  loading: false,
  error: null,

  // Actions
  fetchInitialData: async () => {
    set({ loading: true });
    try {
      const [productsData, categoriesData, bannersData, settingsData] = await Promise.allSettled([
        productService.getAllProducts(),
        productService.getCategories(),
        cmsService.getBanners(),
        cmsService.getStoreSettings()
      ]);

      set({
        products: productsData.status === 'fulfilled' ? productsData.value : fallbackProducts,
        categories: categoriesData.status === 'fulfilled' ? categoriesData.value : [],
        banners: bannersData.status === 'fulfilled' ? bannersData.value : [],
        settings: settingsData.status === 'fulfilled' ? settingsData.value : {},
        loading: false,
        error: null
      });
    } catch (err) {
      set({ error: 'Failed to sync with Admin Portal', loading: false });
      console.error('Sync Error:', err);
    }
  },

  // Specialized selectors
  getProductsByCategory: (categoryName) => {
    const products = get().products;
    return products.filter(p => p.category === categoryName);
  },

  getBestSellers: () => {
    return get().products.slice(0, 10); // Logic can be more complex
  }
}));
