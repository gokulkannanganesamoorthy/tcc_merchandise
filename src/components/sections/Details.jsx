// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const DetailRow = ({ title, description, image, isReversed }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  return (
    <div ref={containerRef} className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 mb-32 last:mb-0`}>
      <div className="w-full lg:w-1/2 aspect-[4/5] overflow-hidden relative">
        <motion.img 
          src={image} 
          alt={title}
          style={{ y: y1, scale: 1.1 }}
          className="w-full h-[120%] object-cover absolute top-[-10%]"
        />
      </div>
      <div className="w-full lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl lg:text-4xl font-display uppercase tracking-tight mb-6">{title}</h3>
          <p className="text-lg text-brand-darkGray/80 leading-relaxed max-w-lg">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const Details = () => {
  return (
    <section id="details" className="bg-brand-white py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            className="text-4xl lg:text-6xl font-display uppercase tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Obsessive <br/><span className="text-brand-darkGray/40">Craftsmanship</span>
          </motion.h2>
        </div>

        <DetailRow 
          title="Twice as Strong"
          description="We use long-staple cotton, spun tight to create a yarn that resists pilling and stays incredibly soft wash after wash. The fabric weight is optimized for a drape that flatters while remaining breathable."
          image="/images/front.png"
          isReversed={false}
        />

        <DetailRow 
          title="The Perfect Fit"
          description="Developed through analyzing thousands of body measurements. The armholes are raised, the shoulders naturally sloped, and the length perfected to sit just right, tucked or untucked."
          image="/images/back.png"
          isReversed={true}
        />

         <DetailRow 
          title="Micro Details"
          description="From the reinforced neckband that never bacon-curls, to the hidden seams that eliminate chafing. Every millimeter has been considered."
          image="/images/front.png"
          isReversed={false}
        />
      </div>
    </section>
  );
};

export default Details;
