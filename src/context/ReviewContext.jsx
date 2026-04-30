import React, { createContext, useContext, useState, useEffect } from 'react';

const ReviewContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    try {
      const savedReviews = localStorage.getItem('product_reviews');
      return savedReviews ? JSON.parse(savedReviews) : [
        {
          id: 1,
          productId: 1,
          userName: 'Alex Johnson',
          rating: 5,
          comment: 'Absolutely love the quality of this fabric. It fits perfectly and feels very premium.',
          date: '2026-04-15',
          verified: true
        },
        {
          id: 2,
          productId: 1,
          userName: 'Sarah Miller',
          rating: 4,
          comment: 'Great design, but the sleeves are slightly longer than expected. Still a great purchase.',
          date: '2026-04-20',
          verified: true
        }
      ];
    } catch (e) {
      console.error('Error parsing reviews from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('product_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review) => {
    const newReview = {
      ...review,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      verified: true // Assuming they can only review if bought
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const getProductReviews = (productId) => {
    return reviews.filter(r => r.productId === productId);
  };

  const getAverageRating = (productId) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getProductReviews, getAverageRating }}>
      {children}
    </ReviewContext.Provider>
  );
};
