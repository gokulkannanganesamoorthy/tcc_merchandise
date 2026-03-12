import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../utils/cartStore';
import { toast } from 'sonner';
import { X } from 'lucide-react';

const IMAGES = [
  { src: '/images/front.png', label: 'Front View' },
  { src: '/images/back.png',  label: 'Back View'  },
  { src: '/images/front.png', label: 'Detail'      },
];

const ProductShowcase = () => {
  const [selectedSize, setSelectedSize]       = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdding, setIsAdding]               = useState(false);
  const [activeImg, setActiveImg]             = useState(IMAGES[0].src);
  const sizes = ['S', 'M', 'L', 'XL'];
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error('Please select a size first'); return; }
    setIsAdding(true);
    setTimeout(() => {
      addToCart({ id: 'tcc-signature-tee', name: 'The Signature T-Shirt', price: 700, size: selectedSize, image: '/images/front.png' });
      setIsAdding(false);
      toast.success(`Size ${selectedSize} added to cart!`);
    }, 400);
  };

  return (
    <>
      {/* ────────────────────────────────────────────
          PRODUCT SECTION
          Desktop : 2-col  (images left ~60%, details right ~40%)
          Mobile  : stacked (images full width → details → sticky CTA)
      ──────────────────────────────────────────── */}
      <section id="product-section" className="bg-brand-white">

        <div className="flex flex-col lg:flex-row min-h-screen">

          {/* ── LEFT: IMAGE PANEL ── */}
          <div className="lg:w-[58%] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">

            {/* Mobile: single swipeable active image */}
            <div className="lg:hidden">
              <div className="w-full bg-[#f2f2f0]">
                <motion.img
                  key={activeImg}
                  src={activeImg}
                  alt="The Signature T-Shirt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-full aspect-square object-contain p-6"
                />
              </div>
              {/* Mobile thumbnail dots / strip */}
              <div className="flex gap-2 px-4 py-3 overflow-x-auto">
                {IMAGES.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(img.src)}
                    className={`flex-shrink-0 w-14 h-14 border overflow-hidden transition-all ${activeImg === img.src ? 'border-brand-black' : 'border-brand-gray/40'}`}
                  >
                    <img src={img.src} alt={img.label} className="w-full h-full object-contain bg-[#f2f2f0] p-1" />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: 2-column image grid, edge-to-edge like SOAT */}
            <div className="hidden lg:grid grid-cols-2">
              {/* Large hero image spanning full left-column width */}
              <div className="col-span-2 w-full bg-[#f2f2f0]">
                <img
                  src="/images/front.png"
                  alt="The Signature T-Shirt — Front"
                  className="w-full aspect-[4/5] object-contain p-8"
                />
              </div>
              {/* Two smaller images side by side */}
              <div className="bg-[#f2f2f0] border-r border-white/30">
                <img src="/images/back.png"  alt="Back"   className="w-full aspect-square object-contain p-6" />
              </div>
              <div className="bg-[#eeeeec]">
                <img src="/images/front.png" alt="Detail" className="w-full aspect-square object-contain p-6" />
              </div>
            </div>
          </div>

          {/* ── RIGHT: PRODUCT DETAILS PANEL ── */}
          <div className="lg:w-[42%] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto flex flex-col border-l border-brand-gray/20">
            
            {/* Scrollable content inside the sticky panel */}
            <div className="flex-1 px-5 sm:px-8 lg:px-10 pt-6 lg:pt-12 pb-4">
              
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Title + Price row */}
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-display uppercase tracking-widest leading-tight pr-4">
                    THE SIGNATURE T-SHIRT
                  </h2>
                  <span className="text-base sm:text-lg font-sans font-medium text-brand-darkGray flex-shrink-0">
                    ₹700
                  </span>
                </div>

                {/* Short description */}
                <p className="text-sm text-brand-darkGray/70 leading-relaxed mb-6">
                  A favourite since day one. Crafted from 100% Supima cotton for a luxuriously soft look and feel. Pre-shrunk, garment-dyed, and tailored for a perfect drape.
                </p>

                {/* Size selector */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-widest font-medium">Size</span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs underline text-brand-darkGray/50 hover:text-brand-black transition-colors"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 text-sm font-medium border transition-all duration-200 relative overflow-hidden group ${
                          selectedSize === size
                            ? 'border-brand-black bg-brand-black text-brand-white'
                            : 'border-brand-gray bg-brand-white text-brand-black hover:border-brand-black/50'
                        }`}
                      >
                        {selectedSize !== size && (
                          <div className="absolute inset-0 bg-brand-gray/50 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-200 z-0" />
                        )}
                        <span className="relative z-10">{size}</span>
                      </button>
                    ))}
                  </div>
                  {!selectedSize && (
                    <p className="text-xs text-brand-darkGray/50 mt-2">Select a size to add to cart</p>
                  )}
                </div>

                {/* Shipping note */}
                <div className="text-xs text-brand-darkGray/60 space-y-1.5 mb-6 pb-6 border-b border-brand-gray/30">
                  <p>✓ Free shipping on orders over ₹1000</p>
                  <p>✓ Free returns within 30 days</p>
                </div>

                {/* Feature list */}
                <div className="text-sm text-brand-darkGray/80 space-y-2 mb-6">
                  <p className="font-medium uppercase tracking-wider text-xs text-brand-darkGray mb-3">Material</p>
                  <ul className="space-y-1.5 text-xs leading-relaxed">
                    <li>— 100% Supima Cotton</li>
                    <li>— Heavyweight 220 GSM</li>
                    <li>— Blind-stitched hems</li>
                    <li>— Pre-shrunk &amp; garment-dyed</li>
                    <li>— Reinforced neckband</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* ── STICKY CTA at the bottom of the right panel (desktop) ── */}
            <div className="hidden lg:block px-10 pb-10 pt-4 border-t border-brand-gray/20 bg-brand-white">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-full py-5 uppercase tracking-widest text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                  selectedSize
                    ? 'bg-brand-black text-brand-white hover:bg-brand-darkGray'
                    : 'bg-brand-gray text-brand-darkGray/50 cursor-not-allowed'
                }`}
              >
                <span className="relative z-10">
                  {isAdding ? 'Adding...' : selectedSize ? `Add to Cart — ₹700` : 'Select Size & Add to Cart'}
                </span>
                {selectedSize && (
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-brand-white/10 to-transparent skew-x-[45deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out z-0" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE STICKY CTA — fixed to bottom ── */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-white border-t border-brand-gray/30 px-4 py-3 flex gap-3 items-center shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          {/* Size quick-pick on mobile sticky bar */}
          <div className="flex gap-1.5">
            {sizes.map(sz => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`w-9 h-9 text-xs border font-medium transition-all ${
                  selectedSize === sz
                    ? 'border-brand-black bg-brand-black text-white'
                    : 'border-brand-gray text-brand-darkGray'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding || !selectedSize}
            className={`flex-1 py-3 uppercase tracking-widest text-sm font-medium transition-colors duration-200 ${
              selectedSize
                ? 'bg-brand-black text-brand-white hover:bg-brand-darkGray'
                : 'bg-brand-gray text-brand-darkGray/50 cursor-not-allowed'
            }`}
          >
            {isAdding ? 'Adding…' : selectedSize ? 'Add to Cart' : 'Select Size'}
          </button>
        </div>

        {/* Spacer so content is not hidden behind mobile sticky bar */}
        <div className="lg:hidden h-20" />
      </section>

      {/* ── SIZE GUIDE MODAL ── */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-brand-white shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setIsSizeGuideOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-brand-gray transition-colors rounded-full">
                <X strokeWidth={1.5} />
              </button>
              <h3 className="text-2xl font-display uppercase tracking-widest mb-2">Size Guide</h3>
              <p className="text-sm text-brand-darkGray/70 mb-8">Garment measurements in inches. Relaxed, tailored fit.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-brand-gray text-brand-darkGray">
                      {['Size','Chest','Length','Shoulder'].map(h => (
                        <th key={h} className="py-4 font-normal uppercase tracking-wider text-xs">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[['S','38″','27.5″','17″'],['M','40″','28.5″','17.5″'],['L','42″','29.5″','18″'],['XL','44″','30.5″','18.5″']].map(([sz,...vals]) => (
                      <tr key={sz} className="border-b border-brand-gray hover:bg-brand-gray/30 transition-colors">
                        <td className="py-4 font-medium">{sz}</td>
                        {vals.map((v,i) => <td key={i} className="py-4">{v}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 bg-brand-gray p-6">
                <h4 className="font-medium text-sm mb-2 uppercase tracking-wide">How to Measure</h4>
                <p className="text-xs text-brand-darkGray leading-relaxed">
                  <strong>Chest:</strong> Measure across the chest, 1″ below the armhole when laid flat.<br/>
                  <strong>Length:</strong> From the highest point of the shoulder down to the hem.<br/>
                  <strong>Shoulder:</strong> From shoulder seam to shoulder seam across the back.
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
