import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import heroImage from '@assets/generated_images/Hero_wedding_ceremony_image_e5aac2a9.png';


export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      data-testid="hero-section"
    >
      {/* Background Image with Animated Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="Elegant wedding ceremony setup with luxury decor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-primary/40 animate-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-extrabold text-white drop-shadow-lg leading-tight tracking-wide">
            Crafting Timeless 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-pink-400 to-yellow-400 block animate-gradient">
              Celebrations
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="text-lg md:text-2xl text-white/90 mt-6 mb-10 font-poppins max-w-3xl mx-auto leading-relaxed drop-shadow-md"
        >
          From bespoke weddings to unforgettable corporate experiences, we blend artistry and precision to make your vision shine brighter than ever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <Button 
            size="lg"
            className="relative bg-gradient-to-r from-primary to-pink-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-primary/40 transition-transform duration-300 px-10 py-6 text-lg font-semibold rounded-full"
            onClick={scrollToContact}
            data-testid="hero-cta-primary"
          >
            Plan Your Dream Event
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="relative border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-md hover:scale-105 transition-transform duration-300 px-10 py-6 text-lg font-semibold rounded-full"
            onClick={scrollToServices}
            data-testid="hero-cta-secondary"
          >
            Explore Services
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
          className="mt-14 pt-10 border-t border-white/20"
        >
          <div className="flex flex-wrap justify-center items-center gap-12 text-white/80">
            {[
              { value: 500, label: "Events Completed" },
              { value: 10, label: "Years of Excellence" },
              { value: 100, label: "Client Satisfaction" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.7 + i * 0.2 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-300">
                  {stat.value}{stat.label.includes("%") ? "%" : "+"}
                </div>
                <div className="text-sm font-montserrat tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator with Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-7 h-12 border-2 border-white/50 rounded-full flex justify-center relative">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-1.5 h-3.5 bg-white/70 rounded-full mt-2"
          />
          <span className="absolute inset-0 rounded-full border border-primary/40 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
