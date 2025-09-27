import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '@assets/logo.png_1758965745855.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // 🔹 Active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      const sections = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl shadow-xl border-b border-white/20'
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          {/* 🔹 Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => scrollToSection('hero')}
            data-testid="logo-link"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="group-hover:drop-shadow-lg transition-all duration-200"
            >
              <img
                src={logoImage}
                alt="Real Events & Entertainment Logo"
                className="h-12 md:h-14 w-auto object-contain"
                style={{ maxWidth: '200px' }}
              />
            </motion.div>
          </div>

          {/* 🔹 Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10 font-montserrat">
            {['about', 'services', 'portfolio', 'testimonials'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative text-lg transition-colors ${
                  activeSection === item
                    ? 'text-amber-400 font-semibold'
                    : 'text-foreground hover:text-amber-300'
                }`}
                data-testid={`nav-${item}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {activeSection === item && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 rounded-full"
                  />
                )}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-amber-400/50 hover:scale-105 transition-transform"
              data-testid="nav-contact"
            >
              Contact Us
            </Button>
          </nav>

          {/* 🔹 Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? <X className="h-7 w-7 text-amber-400" /> : <Menu className="h-7 w-7 text-amber-400" />}
          </Button>
        </div>

        {/* 🔹 Mobile Navigation with Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4"
            >
              <div className="flex flex-col space-y-5 font-montserrat">
                {['about', 'services', 'portfolio', 'testimonials'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`text-lg transition-colors ${
                      activeSection === item
                        ? 'text-amber-400 font-semibold'
                        : 'text-foreground hover:text-amber-300'
                    }`}
                    data-testid={`mobile-nav-${item}`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-amber-400/50 hover:scale-105 transition-transform w-fit"
                  data-testid="mobile-nav-contact"
                >
                  Contact Us
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
