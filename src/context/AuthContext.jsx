import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('attire_token');
      const savedUser = localStorage.getItem('attire_user');
      
      if (token && savedUser) {
        try {
          // Verify token with backend
          const response = await api.get('/auth/me');
          setUser(response.data);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Auth check failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('attire_token', access_token);
      localStorage.setItem('attire_user', JSON.stringify(userData));
      
      setUser(userData);
      setIsLoggedIn(true);
      toast.success('Welcome back to ATTIRE!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { access_token, user: newUserData } = response.data;
      
      localStorage.setItem('attire_token', access_token);
      localStorage.setItem('attire_user', JSON.stringify(newUserData));
      
      setUser(newUserData);
      setIsLoggedIn(true);
      toast.success('Account created successfully! Welcome to ATTIRE.');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('attire_token');
    localStorage.removeItem('attire_user');
    toast.success('Signed out successfully');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
