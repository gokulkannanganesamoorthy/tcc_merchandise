const Footer = () => {
  return (
    <footer className="bg-brand-black text-brand-white py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-display text-2xl mb-6">TCC MERCHANDISE</h2>
          <p className="text-brand-gray/70 max-w-sm mb-8">
            Pixel-perfect craftsmanship. The only T-Shirt you'll ever need, tailored for the modern minimalist.
          </p>
          <div className="flex items-center gap-4">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-transparent border-b border-brand-white/20 py-2 px-0 text-brand-white placeholder:text-brand-white/40 focus:outline-none focus:border-brand-white transition-colors flex-grow max-w-xs"
            />
            <button className="uppercase tracking-wider text-sm font-medium border border-brand-white px-6 py-2 hover:bg-brand-white hover:text-brand-black transition-colors">
              Subscribe
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="uppercase tracking-widest text-xs text-brand-gray/50 mb-6">Shop</h3>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-brand-gray/70 transition-colors">The Signature T-Shirt</a></li>
            <li><a href="#" className="hover:text-brand-gray/70 transition-colors">Gift Cards</a></li>
            <li><a href="#" className="hover:text-brand-gray/70 transition-colors">Size Guide</a></li>
          </ul>
        </div>

        <div>
          <h3 className="uppercase tracking-widest text-xs text-brand-gray/50 mb-6">Support</h3>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-brand-gray/70 transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-brand-gray/70 transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-brand-gray/70 transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-brand-gray/70 transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-brand-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-brand-gray/50">
        <p>&copy; {new Date().getFullYear()} TCC MERCHANDISE. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-brand-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-brand-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
