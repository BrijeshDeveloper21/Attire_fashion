import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalStore } from '@/store/globalStore';
import { useCart } from '@/context/CartContext';
import { 
  Breadcrumbs, 
  ProductGallery, 
  ProductInfo, 
  RelatedProducts,
  ProductReviews 
} from './components';
import { ProductSection } from '@/pages/Home/components';


const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const products = useGlobalStore(state => state.products);
  const product = products.find(p => p.id === parseInt(id));
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedSize(product.sizes[0]);
      setActiveImg(0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-red-500">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-3 md:py-8">
        
        <Breadcrumbs category={product.category} name={product.name} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-20">
          <ProductGallery 
            product={product} 
            activeImg={activeImg} 
            setActiveImg={setActiveImg} 
          />

          <div className="lg:col-span-5 relative">
            <div className="sticky top-24">
              <ProductInfo 
                product={product}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                addToCart={addToCart}
              />
            </div>
          </div>
        </div>

        <ProductReviews productId={product.id} />

        <RelatedProducts 
          products={products}
          currentProductId={product.id}
          category={product.category}
        />

        {/* Category Wise Product Feed */}
        <div className="mt-4 md:mt-20 space-y-2 md:space-y-12">
          {(() => {
            const categories = [...new Set(products.map(p => p.category))];
            // Sort categories to show something interesting first or just alpha
            return categories.filter(cat => cat !== product.category).map(cat => (
              <ProductSection 
                key={cat}
                title={cat}
                viewAllPath={`/shop?category=${cat}`}
                products={products.filter(p => p.category === cat).slice(0, 5)}
              />
            ));
          })()}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
