import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useGlobalStore } from '@/store/globalStore';
import { 
  HeroCarousel, 
  CategoryNav, 
  ProductSection, 
  PromotionBanner, 
  LifestyleCollective, 
  BrandCampaign, 
  Lookbook 
} from './components';

const Home = () => {
  const products = useGlobalStore(state => state.products);

  return (
    <main className="bg-white">
      <HeroCarousel />
      <CategoryNav />

      {/* trending Indianwear */}
      <ProductSection 
        title={<>Luxury Indianwear <br className="hidden md:block" /> Collective</>}
        tagline="Trending 2026"
        viewAllPath="/shop?category=Signature Ethnic"
        products={products.slice(14, 19)}
      />

      {/* Luxury Signature Series - HIGH RANGE */}
      <ProductSection 
        title="Luxury High-Range Kurtas"
        subtitle="Signature Collection"
        theme="dark"
        gridCols="md:grid-cols-3"
        mobileGridCols="grid grid-cols-3 gap-2"
        maxContentWidth="max-w-5xl"
        viewAllPath="/shop?category=Luxury Signature"
        products={products.slice(29, 32)}
      />

      <PromotionBanner />

      {/* Streetwear Collective */}
      <ProductSection 
        title="Urban Streetwear Collective"
        tagline="Streetwear 2026"
        viewAllPath="/shop?category=Streetwear"
        products={products.slice(32, 37)}
      />

      {/* Urban Denim */}
      <ProductSection 
        title="Urban Denim Collective"
        tagline="Denim 2026"
        viewAllPath="/shop?category=Urban Denim Collective"
        products={products.filter(p => p.category === 'Urban Denim Collective').slice(0, 5)}
      />

      {/* Trending Now */}
      <ProductSection 
        title="Trending Now"
        tagline="Global Edit 2026"
        viewAllPath="/shop"
        products={products.filter(p => p.category === 'Trending Now').slice(0, 5)}
      />

      <LifestyleCollective />

      {/* Best Sellers */}
      <ProductSection 
        title="Best Sellers"
        tagline="Popular 2026"
        products={products.slice(8, 13)}
      />

      {/* Handpicked */}
      <ProductSection 
        title="Handpicked for You"
        tagline="Curated 2026"
        products={products.slice(15, 20)}
      />

      <BrandCampaign />

      {/* Contemporary Blazers */}
      <ProductSection 
        title="Contemporary Blazers"
        tagline="Executive 2026"
        viewAllPath="/shop?category=Blazers"
        products={products.filter(p => p.category === 'Blazers').slice(0, 5)}
      />

      {/* Imperial Sherwani */}
      <ProductSection 
        title="Imperial Sherwani Collective"
        tagline="Heritage 2026"
        viewAllPath="/shop?category=Sherwani"
        products={products.filter(p => p.category === 'Sherwani').slice(0, 5)}
      />

      {/* Signature Shirts */}
      <ProductSection 
        title="Signature Shirts"
        tagline="Essential 2026"
        viewAllPath="/shop?category=Shirts"
        products={products.filter(p => p.category === 'Shirts').slice(0, 5)}
      />

      {/* Urban Carry */}
      <ProductSection 
        title="Urban Carry Collective"
        tagline="Utility 2026"
        viewAllPath="/shop?category=Bags"
        products={products.filter(p => p.category === 'Bags').slice(0, 5)}
      />

      {/* Signature Belts */}
      <ProductSection 
        title="Signature Belts"
        tagline="Craftsmanship 2026"
        viewAllPath="/shop?category=Belts"
        products={products.filter(p => p.category === 'Belts').slice(0, 5)}
      />

      <Lookbook />

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="fixed bottom-32 right-6 bg-black text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border border-white/10 z-40 active:scale-90 transition-transform md:w-16 md:h-16"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </main>
  );
};

export default Home;
