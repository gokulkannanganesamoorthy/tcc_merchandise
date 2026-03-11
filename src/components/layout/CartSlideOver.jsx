// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../utils/cartStore';

const CartSlideOver = () => {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-brand-black/20 backdrop-blur-sm z-50"
          />
          
          {/* Slide Over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-gray">
              <h2 className="text-xl font-display uppercase tracking-wide flex items-center gap-2">
                Cart <span className="text-sm text-brand-darkGray/50 bg-brand-gray px-2 py-0.5 rounded-full">{cartCount()}</span>
              </h2>
              <button 
                onClick={closeCart}
                className="p-2 hover:bg-brand-gray rounded-full transition-colors"
              >
                <X strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-brand-darkGray/50 space-y-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-sans uppercase tracking-widest text-sm">Your cart is empty</p>
                  <button 
                    onClick={closeCart}
                    className="mt-4 border border-brand-black px-6 py-2 uppercase tracking-wide text-xs hover:bg-brand-black hover:text-brand-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 border border-brand-gray relative group">
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="absolute top-2 right-2 text-brand-darkGray/40 hover:text-brand-black opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                    <div className="w-20 h-24 bg-brand-gray flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium uppercase tracking-wide text-sm">{item.name}</h3>
                        <p className="text-xs text-brand-darkGray/60 mt-1">Size: {item.size}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-brand-gray">
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-1 hover:bg-brand-gray transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-1 hover:bg-brand-gray transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-brand-gray p-6 bg-brand-white">
                <div className="flex items-center justify-between mb-6">
                  <span className="uppercase tracking-widest text-sm text-brand-darkGray">Subtotal</span>
                  <span className="text-xl font-medium">${cartTotal().toFixed(2)}</span>
                </div>
                <p className="text-xs text-brand-darkGray/60 mb-6 text-center">Shipping & taxes calculated at checkout</p>
                <button className="w-full bg-brand-black text-brand-white py-4 uppercase tracking-widest text-sm font-medium hover:bg-brand-darkGray transition-colors duration-300 relative overflow-hidden group">
                  <span className="relative z-10">Proceed to Checkout</span>
                  <div className="absolute inset-0 bg-brand-gray translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <span className="absolute inset-0 z-20 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-brand-black">Proceed to Checkout</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSlideOver;
