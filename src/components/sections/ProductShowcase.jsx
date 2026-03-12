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
      <section id="product-section" className="bg-brand-white py-10 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Mobile: stacked compact layout | Desktop: 2-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-start">

            {/* ── IMAGE GALLERY ── */}
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Main image — capped height on mobile so content is visible above the fold */}
                <div className="relative w-full max-h-[55vw] sm:max-h-none aspect-square bg-[#f5f5f5] overflow-hidden">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt="The Signature T-Shirt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-contain p-3 sm:p-6"
                  />
                </div>

                {/* Thumbnail strip — horizontal on mobile, vertical on desktop sidebar */}
                <div className="flex lg:hidden flex-row gap-2 mt-2 overflow-x-auto pb-1">
                  {[
                    { src: '/images/front.png', label: 'Front' },
                    { src: '/images/back.png', label: 'Back' },
                    { src: '/images/front.png', label: 'Detail' },
                  ].map((thumb, i) => (
                    <button
                      key={i}
                      className={`flex-shrink-0 w-14 h-14 border-2 overflow-hidden transition-all duration-200 ${
                        thumbIndex === i ? 'border-brand-black' : 'border-transparent hover:border-brand-darkGray/40'
                      }`}
                      onClick={() => { setActiveImage(thumb.src); setThumbIndex(i); }}
                    >
                      <img src={thumb.src} alt={thumb.label} className="w-full h-full object-contain bg-[#f5f5f5]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Desktop: thumbnail strip sits beside main image */}
            <div className="hidden lg:flex flex-col gap-2 lg:col-start-1 lg:row-start-1 lg:col-span-1">
              {/* This panel is only visible on desktop as a sidebar — handled via wrapper below */}
            </div>

            {/* ── PRODUCT DETAILS ── */}
            <div className="flex flex-col gap-4 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Title + Price — always above the fold on mobile */}
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display uppercase tracking-tight mb-1">The Signature T-Shirt</h2>
                <p className="text-lg sm:text-xl text-brand-darkGray mb-4">₹700</p>

                {/* Size selector — immediately after price */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium uppercase tracking-wider">Size</span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-sm underline text-brand-darkGray/60 hover:text-brand-black transition-colors"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 sm:py-3 text-sm font-medium transition-all duration-300 border relative overflow-hidden group ${
                          selectedSize === size
                            ? 'border-brand-black text-brand-white'
                            : 'border-brand-gray bg-brand-white text-brand-black hover:border-brand-black/50'
                        }`}
                      >
                        {selectedSize === size && (
                          <motion.div
                            layoutId="size-indicator"
                            className="absolute inset-0 bg-brand-black z-0"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        {selectedSize !== size && (
                          <div className="absolute inset-0 bg-brand-gray scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-in-out z-0" />
                        )}
                        <span className="relative z-10">{size}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart — right after size, visible without scrolling on most phones */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full bg-brand-black text-brand-white py-4 sm:py-5 uppercase tracking-widest text-sm font-medium hover:bg-brand-darkGray transition-colors duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed mb-4"
                >
                  <span className="relative z-10">{isAdding ? 'Adding...' : 'Add to Cart — ₹700'}</span>
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-brand-white/10 to-transparent skew-x-[45deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out z-0" />
                </button>

                <div className="text-xs sm:text-sm text-brand-darkGray/60 flex flex-col gap-1.5 mb-5 border-t border-brand-gray pt-4">
                  <p>✓ Free shipping on orders over ₹1000</p>
                  <p>✓ Free returns within 30 days</p>
                </div>

                {/* Description — below the CTA, optional reading */}
                <div className="prose prose-sm sm:prose-base text-brand-darkGray/80 font-sans border-t border-brand-gray pt-5">
                  <p>
                    Crafted from the rarest extra-long staple cotton. Pre-shrunk, garment-dyed, and tailored for a perfect drape. It's not just a t-shirt; it's an engineering marvel for your daily uniform.
                  </p>
                  <ul className="list-disc pl-5 mt-3 space-y-1">
                    <li>100% Supima Cotton</li>
                    <li>Heavyweight 220 GSM</li>
                    <li>Blind-stitched hems</li>
                  </ul>
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
