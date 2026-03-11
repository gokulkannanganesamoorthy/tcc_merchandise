import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background Image/Video Placeholder */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img 
          src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2600&auto=format&fit=crop" 
          alt="Premium T-Shirt" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-brand-black/30" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <motion.p 
          className="uppercase tracking-[0.3em] text-brand-white/80 text-xs sm:text-sm mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The Difference is in the Details
        </motion.p>
        
        <motion.h1 
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-brand-white uppercase tracking-tight leading-none mb-10"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
        >
          The <br className="md:hidden" /> Signature
        </motion.h1>

        <motion.button
          className="bg-brand-white text-brand-black px-10 py-4 uppercase tracking-widest text-sm font-medium hover:bg-brand-gray transition-colors duration-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Shop Now
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="w-[1px] h-16 bg-brand-white/20 relative overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-brand-white absolute top-0 left-0"
            animate={{ y: ['0%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
