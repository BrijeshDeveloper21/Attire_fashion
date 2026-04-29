import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BrandCampaign = () => {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      <div className="relative w-full aspect-video md:h-[65vh]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/banner_1.png"
          className="absolute inset-0 w-full h-full object-contain md:object-cover block"
        >
          <source src="/Cinematic_Fashion_Loop_Video_Generation.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="absolute top-4 left-4 md:top-12 md:left-12 z-30 opacity-80">
        <img src="/LOGO.png" alt="Attire Logo" className="h-7 md:h-10 object-contain shadow-premium" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-end md:justify-center text-center px-6 pb-8 md:pb-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="max-w-2xl"
        >
          <span className="text-white/60 text-[7px] md:text-[11px] font-black tracking-[0.5em] uppercase mb-3 block">The Campaign</span>
          <h2 className="text-white text-[20px] md:text-[56px] font-black tracking-tighter uppercase leading-[0.9] mb-4">
            Sartorial <br /> Excellence
          </h2>
          <p className="hidden md:block text-white/50 text-[13px] font-bold uppercase tracking-[0.15em] mb-6 max-w-[240px] mx-auto leading-relaxed">
            Meticulous craftsmanship. <br /> A journey through form and fabric.
          </p>
          <Link to="/shop" className="inline-block border border-white/50 text-white px-5 py-2 text-[8px] md:text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all active:scale-95">
            The Film Series
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandCampaign;
