import React, { useState } from 'react';
import { Star, X, Camera, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReviews } from '@/context/ReviewContext';
import { toast } from 'react-hot-toast';

const ReviewModal = ({ isOpen, onClose, product, user }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addReview } = useReviews();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addReview({
        productId: product.id,
        userName: user?.name || 'Brijesh Guest',
        rating,
        comment,
      });
      setIsSubmitting(false);
      onClose();
      toast.success('Your review has been published!');
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-lg overflow-hidden relative z-10 shadow-2xl rounded-sm"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-[16px] font-black uppercase tracking-widest">Write a Review</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Product Info */}
              <div className="flex gap-6 items-center bg-gray-50 p-4 rounded-sm">
                <div className="w-16 h-20 bg-white border border-gray-100 overflow-hidden shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest">{product.name}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Size: {product.size} | Color: {product.color}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-4 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Rate your experience</p>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-all duration-200 transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 transition-all duration-300 transform ${
                          (hoverRating || rating) >= star
                            ? 'fill-[#D4AF37] text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] scale-110'
                            : 'text-gray-200 hover:text-[#D4AF37]/40'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-[9px] font-black uppercase tracking-widest text-black animate-in fade-in slide-in-from-top-1">
                    {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating - 1]}
                  </p>
                )}
              </div>

              {/* Comment */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" /> Share your thoughts
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you like or dislike? How was the fit?"
                  className="w-full h-32 border border-gray-200 p-4 text-[11px] font-bold tracking-widest outline-none focus:border-black transition-colors resize-none uppercase"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="w-full bg-black text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Publishing...
                  </>
                ) : 'Submit Review'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
