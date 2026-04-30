import React from 'react';
import { Star, CheckCircle, User, ThumbsUp } from 'lucide-react';
import { useReviews } from '@/context/ReviewContext';

const ProductReviews = ({ productId }) => {
  const { getProductReviews, getAverageRating } = useReviews();
  const reviews = getProductReviews(productId);
  const averageRating = getAverageRating(productId);

  return (
    <div className="mt-6 md:mt-32 border-t border-gray-100 pt-6 md:pt-20">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12 mb-8 md:mb-20">
        <div>
          <h2 className="text-[24px] font-black uppercase tracking-tighter mb-4">Customer Reviews</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    averageRating >= star ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-[14px] font-black">{averageRating} out of 5</p>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest border-l border-gray-200 pl-6">
              Based on {reviews.length} reviews
            </p>
          </div>
        </div>
        
        <div className="w-full md:w-80 space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter(r => r.rating === rating).length;
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return (
              <div key={rating} className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest w-12">{rating} Stars</span>
                <div className="flex-1 h-1.5 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#D4AF37] transition-all duration-500" 
                    style={{ width: `${percentage}%` }} 
                  />
                </div>
                <span className="text-[10px] font-black text-gray-400 w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6 md:space-y-12">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-50 pb-12 last:border-0">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                {/* Reviewer Info */}
                <div className="md:w-60 shrink-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-[12px] font-black uppercase tracking-widest">{review.userName}</p>
                  </div>
                  {review.verified && (
                    <div className="flex items-center gap-1.5 text-green-600">
                      <CheckCircle className="w-3 h-3" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Verified Purchase</span>
                    </div>
                  )}
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">{review.date}</p>
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          review.rating >= star ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[13px] text-gray-700 leading-relaxed uppercase tracking-wide">
                    {review.comment}
                  </p>
                  
                  <div className="mt-8 flex items-center gap-6">
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" /> Helpful (2)
                    </button>
                    <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-50/50 border border-dashed border-gray-200 py-10 md:py-20 flex flex-col items-center justify-center text-center px-6">
            <h3 className="text-[12px] font-black uppercase tracking-widest mb-2">No reviews yet</h3>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest max-w-[240px]">
              Be the first to review this product after your purchase!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
