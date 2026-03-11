import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartSlideOver from './components/layout/CartSlideOver';

// Layout for the public store incorporating Navbar, Footer, and Cart
const StoreLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        {/* Global Components */}
        <Toaster position="bottom-center" toastOptions={{
          style: {
            background: '#0a0a0a',
            color: '#fcfcfc',
            border: 'none',
            borderRadius: '0px',
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontSize: '12px'
          }
        }} />
        <CartSlideOver />

        {/* Routes */}
        <Routes>
          {/* Public Storefront Routes */}
          <Route element={<StoreLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          
          {/* Admin Routes (No Navbar/Footer) */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
