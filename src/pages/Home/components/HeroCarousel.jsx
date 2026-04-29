import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  // Dynamic banner data structure to match Admin Portal
  const banners = [
    {
      id: 1,
      image: '/banner_1.png',
      title: 'Wedding Collection 2026',
      subtitle: 'Exquisite sherwanis and heritage ethnic wear for your special day.',
      ctaText: 'Explore Collection',
      ctaLink: '/shop?category=Sherwani',
      textAlign: 'left', // center, left, right
      overlayColor: 'rgba(0,0,0,0.2)'
    },
    {
      id: 2,
      image: '/banner_2.png',
      title: 'Ethnic Elegance',
      subtitle: 'Classic kurtas and signature blazers for every occasion.',
      ctaText: 'Shop Now',
      ctaLink: '/shop?category=Signature Ethnic',
      textAlign: 'center',
      overlayColor: 'rgba(0,0,0,0.25)'
    },
    {
      id: 3,
      image: '/banner_3.png',
      title: 'Royal Formals',
      subtitle: 'Premium blazers and executive wear for the modern man.',
      ctaText: 'Discover More',
      ctaLink: '/shop?category=Blazers',
      textAlign: 'right',
      overlayColor: 'rgba(0,0,0,0.2)'
    },
    {
      id: 4,
      image: '/banner_4.png',
      title: 'Modern Fusion',
      subtitle: 'Contemporary styles that blend tradition with urban fashion.',
      ctaText: 'View Series',
      ctaLink: '/shop',
      textAlign: 'center',
      overlayColor: 'rgba(0,0,0,0.3)'
    }
  ];

  const currentBannerIndex = ((page % banners.length) + banners.length) % banners.length;
  const currentBanner = banners[currentBannerIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [page]);

  // Preload images
  useEffect(() => {
    banners.forEach((banner) => {
      const img = new Image();
      img.src = banner.image;
    });
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <section className="relative h-[400px] md:h-[75vh] w-full bg-gray-100 overflow-hidden group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <img
            src={currentBanner.image}
            className="absolute inset-0 w-full h-full object-cover object-center"
            alt={currentBanner.title}
          />
          
          {/* Color Overlay */}
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: currentBanner.overlayColor }}
          />

          {/* Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-black/40 md:via-transparent md:to-transparent" />

          {/* Content Overlay */}
          <div className={`absolute inset-0 flex flex-col justify-center px-6 md:px-20 z-10 
            ${currentBanner.textAlign === 'center' ? 'items-center text-center' : 
              currentBanner.textAlign === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-3xl"
            >
              <h2 className="text-white text-[28px] md:text-[64px] font-black uppercase tracking-tighter leading-[0.9] mb-4 drop-shadow-2xl">
                {currentBanner.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h2>
              
              <p className="text-white/80 text-[12px] md:text-[16px] font-medium max-w-lg mb-8 leading-relaxed uppercase tracking-widest">
                {currentBanner.subtitle}
              </p>

              <Link 
                to={currentBanner.ctaLink}
                className="inline-block bg-white text-black px-8 py-3 md:px-12 md:py-5 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 shadow-xl active:scale-95"
              >
                {currentBanner.ctaText}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const diff = i - currentBannerIndex;
              if (diff !== 0) paginate(diff);
            }}
            className="relative h-1.5 focus:outline-none group"
          >
            <div className={`h-full rounded-full transition-all duration-700 
              ${currentBannerIndex === i ? 'w-12 bg-white' : 'w-2 bg-white/30 group-hover:bg-white/60'}`} 
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;

