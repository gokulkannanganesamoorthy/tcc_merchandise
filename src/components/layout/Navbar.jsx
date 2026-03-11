import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Menu } from 'lucide-react';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const textColor = useTransform(
    scrollY,
    [0, 100],
    ['rgb(252, 252, 252)', 'rgb(10, 10, 10)']
  );

  return (
    <motion.header
      style={{
        backgroundColor: `rgba(252, 252, 252, ${bgOpacity.get() * 0.95})`,
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        color: textColor,
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-transparent"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button className="p-2 -ml-2 hover:opacity-70 transition-opacity">
            <Menu strokeWidth={1.5} />
          </button>
        </div>

        <motion.div 
          className="text-xl font-display font-medium tracking-widest absolute left-1/2 -translate-x-1/2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          TCC
        </motion.div>

        <div className="flex items-center gap-6">
          <button className="font-sans text-sm tracking-wider uppercase hidden md:block hover:opacity-70 transition-opacity">
            Account
          </button>
          <button className="p-2 -mr-2 relative hover:opacity-70 transition-opacity">
            <ShoppingBag strokeWidth={1.5} />
            <span className="absolute top-1 right-0 bg-brand-black text-brand-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
