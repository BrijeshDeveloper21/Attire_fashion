import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ loading }) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.05, 1],
              opacity: 1 
            }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut"
            }}
            className="flex flex-col items-center gap-6"
          >
            <img src="/LOGO.png" alt="Attire" className="h-12 md:h-16 w-auto brightness-0 invert" />
            <div className="flex flex-col items-center gap-2">
               <div className="w-16 md:w-24 h-[1px] bg-white/20 relative overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-white"
                  />
               </div>
               <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Sartorial Excellence</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
