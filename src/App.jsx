
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer, BottomNav, Preloader, ScrollToTop } from '@/components/layout';
import { Home, Shop, Categories, Wishlist, Account, ProductDetails, Checkout, Login, Signup } from '@/pages';
import { CartPanel } from '@/components/features';
import { CartProvider, useCart } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AnimatePresence } from 'framer-motion';

const AppContent = () => {
  const { isCartOpen, openCart, closeCart } = useCart();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Preloader loading={loading} />

      {!loading && (
        <div className="flex flex-col min-h-screen bg-white">
          <Header onCartClick={openCart} />

          <main className="pb-16 md:pb-0">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />
          <BottomNav />

          <CartPanel isOpen={isCartOpen} onClose={closeCart} />
        </div>
      )}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
