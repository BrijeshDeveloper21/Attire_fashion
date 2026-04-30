import api from './api';

export const cmsService = {
  getBanners: async () => {
    try {
      const response = await api.get('/cms/banners');
      return response.data;
    } catch (error) {
      console.error('Error fetching banners:', error);
      throw error;
    }
  },

  getStoreSettings: async () => {
    try {
      const response = await api.get('/settings/global');
      return response.data;
    } catch (error) {
      console.error('Error fetching store settings:', error);
      throw error;
    }
  }
};
