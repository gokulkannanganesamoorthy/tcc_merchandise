import { useState, useEffect } from 'react';
import { useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '../../utils/cartStore';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(252, 252, 252, 0)', 'rgba(252, 252, 252, 0.95)']
  );

  const textColor = useTransform(
    scrollY,
    [0, 100],
    ['rgb(252, 252, 252)', 'rgb(10, 10, 10)']
  );

  return (
    <>
      <motion.header
        style={{
          backgroundColor: isMenuOpen ? 'transparent' : backgroundColor,
          backdropFilter: isScrolled && !isMenuOpen ? 'blur(10px)' : 'none',
          color: isMenuOpen ? 'rgb(10, 10, 10)' : textColor,
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-transparent"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -ml-2 hover:opacity-70 transition-opacity z-50 relative"
            >
              {isMenuOpen ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
            </button>
          </div>

          <motion.div 
            className="text-xl font-display font-medium tracking-widest absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            TCC
          </motion.div>

          <div className="flex items-center gap-6 z-50">
            <button className="font-sans text-sm tracking-wider uppercase hidden md:block hover:opacity-70 transition-opacity">
              Account
            </button>
            <button 
              onClick={useCartStore(state => state.openCart)}
              className="p-2 -mr-2 relative hover:opacity-70 transition-opacity"
            >
              <ShoppingBag strokeWidth={1.5} />
              <span className="absolute top-1 right-0 bg-brand-black text-brand-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full pointer-events-none">
                {useCartStore(state => state.cartCount())}
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-brand-white flex items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-8">
              {['Shop', 'Collections', 'About Us', 'Journal', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                  className="text-4xl md:text-6xl font-display tracking-tight hover:text-brand-darkGray/50 transition-colors uppercase text-brand-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
