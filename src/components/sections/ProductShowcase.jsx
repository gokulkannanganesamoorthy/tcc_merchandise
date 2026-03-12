import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../utils/cartStore';
import { toast } from 'sonner';
import { X } from 'lucide-react';

const ProductShowcase = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const sizes = ['S', 'M', 'L', 'XL'];
  const [isAdding, setIsAdding] = useState(false);
  const [activeImage, setActiveImage] = useState('/images/front.png');
  const [thumbIndex, setThumbIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate slight network delay for premium feel
    setTimeout(() => {
      addToCart({
        id: 'tcc-signature-tee',
        name: 'The Signature T-Shirt',
        price: 700.00,
        size: selectedSize,
        image: '/images/front.png'
      });
      setIsAdding(false);
      toast(`Added Size ${selectedSize} to Cart`);
    }, 400);
  };

  return (
    <>
      <section id="product-section" className="bg-brand-white py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* Left Column: Image Gallery — Amazon/Flipkart style */}
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                {/* Thumbnail Strip */}
                <div className="flex sm:flex-col gap-2 order-2 sm:order-1">
                  {[
                    { src: '/images/front.png', label: 'Front' },
                    { src: '/images/back.png', label: 'Back' },
                    { src: '/images/front.png', label: 'Detail' },
                  ].map((thumb, i) => (
                    <button
                      key={i}
                      className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden border-2 transition-all duration-200 ${
                        thumbIndex === i
                          ? 'border-brand-black' : 'border-transparent hover:border-brand-darkGray/40'
                      }`}
                      onMouseEnter={() => { setActiveImage(thumb.src); setThumbIndex(i); }}
                      onClick={() => { setActiveImage(thumb.src); setThumbIndex(i); }}
                    >
                      <img src={thumb.src} alt={thumb.label} className="w-full h-full object-contain bg-[#f5f5f5]" />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="relative flex-1 order-1 sm:order-2 aspect-square bg-[#f5f5f5] overflow-hidden">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt="The Signature T-Shirt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column: Product Details */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl lg:text-5xl font-display uppercase tracking-tight mb-4">The Signature <br/> T-Shirt</h2>
                <p className="text-xl text-brand-darkGray mb-8">₹700</p>
                
                <div className="prose prose-lg text-brand-darkGray/80 font-sans mb-12">
                  <p>
                    Crafted from the rarest extra-long staple cotton. Pre-shrunk, garment-dyed, and tailored for a perfect drape. It's not just a t-shirt; it's an engineering marvel for your daily uniform.
                  </p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>100% Supima Cotton</li>
                    <li>Heavyweight 220 GSM</li>
                    <li>Blind-stitched hems</li>
                  </ul>
                </div>

                {/* Configuration */}
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium uppercase tracking-wider">Size</span>
                    <button 
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-sm underline text-brand-darkGray/60 hover:text-brand-black transition-colors"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 text-sm font-medium transition-all duration-300 border relative overflow-hidden group ${
                          selectedSize === size 
                            ? 'border-brand-black text-brand-white' 
                            : 'border-brand-gray bg-brand-white text-brand-black hover:border-brand-black/50'
                        }`}
                      >
                        {/* Animated background for selected state */}
                        {selectedSize === size && (
                          <motion.div 
                            layoutId="size-indicator"
                            className="absolute inset-0 bg-brand-black z-0"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        
                        {/* Hover effect for unselected */}
                        {selectedSize !== size && (
                          <div className="absolute inset-0 bg-brand-gray scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-in-out z-0" />
                        )}

                        <span className="relative z-10">{size}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full bg-brand-black text-brand-white py-5 uppercase tracking-widest text-sm font-medium hover:bg-brand-darkGray transition-colors duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">{isAdding ? 'Adding...' : 'Add to Cart — ₹700'}</span>
                  {/* Micro-interaction beam sweep */}
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-brand-white/10 to-transparent skew-x-[45deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out z-0" />
                </button>

                <div className="mt-8 pt-8 border-t border-brand-gray text-sm text-brand-darkGray/60 flex flex-col gap-2">
                  <p>✓ Free shipping on orders over ₹1000</p>
                  <p>✓ Free returns within 30 days</p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-brand-white shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute top-6 right-6 p-2 text-brand-darkGray hover:text-brand-black hover:bg-brand-gray transition-colors rounded-full"
              >
                <X strokeWidth={1.5} />
              </button>

              <h3 className="text-2xl font-display uppercase tracking-widest mb-2 text-brand-black">Size Guide</h3>
              <p className="text-sm text-brand-darkGray/70 mb-8 font-sans">Garment measurements in inches. Our tees have a relaxed, tailored fit.</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-brand-gray text-brand-darkGray">
                      <th className="py-4 font-normal uppercase tracking-wider text-xs">Size</th>
                      <th className="py-4 font-normal uppercase tracking-wider text-xs">Chest</th>
                      <th className="py-4 font-normal uppercase tracking-wider text-xs">Length</th>
                      <th className="py-4 font-normal uppercase tracking-wider text-xs">Shoulder</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-brand-gray hover:bg-brand-gray/30 transition-colors">
                      <td className="py-4 font-medium">S</td>
                      <td className="py-4">38"</td>
                      <td className="py-4">27.5"</td>
                      <td className="py-4">17"</td>
                    </tr>
                    <tr className="border-b border-brand-gray hover:bg-brand-gray/30 transition-colors">
                      <td className="py-4 font-medium">M</td>
                      <td className="py-4">40"</td>
                      <td className="py-4">28.5"</td>
                      <td className="py-4">17.5"</td>
                    </tr>
                    <tr className="border-b border-brand-gray hover:bg-brand-gray/30 transition-colors">
                      <td className="py-4 font-medium">L</td>
                      <td className="py-4">42"</td>
                      <td className="py-4">29.5"</td>
                      <td className="py-4">18"</td>
                    </tr>
                    <tr className="hover:bg-brand-gray/30 transition-colors">
                      <td className="py-4 font-medium">XL</td>
                      <td className="py-4">44"</td>
                      <td className="py-4">30.5"</td>
                      <td className="py-4">18.5"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 bg-brand-gray p-6">
                <h4 className="font-medium text-sm mb-2 uppercase tracking-wide">How to Measure</h4>
                <p className="text-xs text-brand-darkGray leading-relaxed">
                  <strong>Chest:</strong> Measure across the chest, 1" below the armhole when laid flat.<br/>
                  <strong>Length:</strong> Measure from the highest point of the shoulder down to the hem.<br/>
                  <strong>Shoulder:</strong> Measure from shoulder seam to shoulder seam straight across the back.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductShowcase;
