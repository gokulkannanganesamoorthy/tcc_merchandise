import SEO from '../components/seo/SEO';
import Hero from '../components/sections/Hero';
import ProductShowcase from '../components/sections/ProductShowcase';
import Details from '../components/sections/Details';

const Home = () => {
  return (
    <>
      <SEO 
        title="The Signature T-Shirt" 
        description="Experience unparalleled quality and fit with our signature T-Shirt. Pixel-perfect craftsmanship for the modern wardrobe." 
      />
      
      <Hero />
      <ProductShowcase />
      <Details />
      
    </>
  );
};

export default Home;
