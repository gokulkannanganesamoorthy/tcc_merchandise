import { useState } from 'react';
import { motion } from 'framer-motion';

const ProductShowcase = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <section className="bg-brand-white py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Image Gallery (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-32 space-y-4">
            <motion.div 
              className="aspect-[4/5] bg-brand-gray overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1600" 
                alt="Signature T-Shirt Front" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-brand-gray overflow-hidden">
                <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" alt="Detail 1" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square bg-brand-gray overflow-hidden">
                <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800" alt="Detail 2" className="w-full h-full object-cover" />
              </div>
            </div>
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
              <p className="text-xl text-brand-darkGray mb-8">$55.00</p>
              
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
                  <button className="text-sm underline text-brand-darkGray/60 hover:text-brand-black transition-colors">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm font-medium transition-all duration-300 border ${
                        selectedSize === size 
                          ? 'border-brand-black bg-brand-black text-brand-white' 
                          : 'border-brand-gray bg-transparent text-brand-black hover:border-brand-black/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-brand-black text-brand-white py-5 uppercase tracking-widest text-sm font-medium hover:bg-brand-darkGray transition-colors duration-300">
                Add to Cart
              </button>

              <div className="mt-8 pt-8 border-t border-brand-gray text-sm text-brand-darkGray/60 flex flex-col gap-2">
                <p>✓ Free shipping on orders over $100</p>
                <p>✓ Free returns within 30 days</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
