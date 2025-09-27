import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import portfolioImage1 from '@assets/generated_images/Portfolio_gallery_image_1_8cebd55e.png';
import portfolioImage2 from '@assets/generated_images/Portfolio_gallery_image_2_c39011fe.png';
import portfolioImage3 from '@assets/generated_images/Portfolio_gallery_image_3_3ac02dc4.png';
import weddingImage from '@assets/generated_images/Hero_wedding_ceremony_image_e5aac2a9.png';
import corporateImage from '@assets/generated_images/Corporate_events_service_image_e37cecc8.png';
import concertImage from '@assets/generated_images/Concert_entertainment_service_image_720f6d5f.png';

const portfolioItems = [
  {
    id: 1,
    title: "Elegant Garden Wedding",
    category: "Wedding",
    image: portfolioImage1,
    description: "A romantic outdoor wedding with string lights and floral arrangements"
  },
  {
    id: 2,
    title: "Corporate Innovation Summit",
    category: "Corporate",
    image: portfolioImage2,
    description: "A modern conference showcasing cutting-edge technology and innovation"
  },
  {
    id: 3,
    title: "Luxury Birthday Celebration",
    category: "Social",
    image: portfolioImage3,
    description: "An elegant milestone birthday party with sophisticated decor"
  },
  {
    id: 4,
    title: "Destination Wedding Ceremony",
    category: "Wedding",
    image: weddingImage,
    description: "A breathtaking ceremony in a luxury venue with golden hour lighting"
  },
  {
    id: 5,
    title: "Annual Awards Gala",
    category: "Corporate",
    image: corporateImage,
    description: "A prestigious awards ceremony celebrating excellence and achievement"
  },
  {
    id: 6,
    title: "Music Festival Stage",
    category: "Entertainment",
    image: concertImage,
    description: "Dynamic stage production with spectacular lighting and sound design"
  }
];

const categories = ["All", "Wedding", "Corporate", "Social", "Entertainment"];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const openLightbox = (id: number) => {
    setSelectedImage(id);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredItems.length;
    } else {
      newIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredItems[newIndex].id);
  };

  const selectedItem = selectedImage ? portfolioItems.find(item => item.id === selectedImage) : null;

  return (
    <section id="portfolio" className="py-24 bg-background" data-testid="portfolio-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Our Portfolio
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-poppins leading-relaxed">
            Explore our collection of successfully executed events that showcase our creativity, attention to detail, and commitment to excellence.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="font-montserrat"
              data-testid={`filter-${category.toLowerCase()}`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card 
                  className="group overflow-hidden hover-elevate bg-card border-card-border cursor-pointer"
                  onClick={() => openLightbox(item.id)}
                  data-testid={`portfolio-item-${item.id}`}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                        <h3 className="text-xl font-playfair font-bold mb-2">{item.title}</h3>
                        <p className="text-sm font-poppins">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-montserrat font-medium">
                      {item.category}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain rounded-lg"
                />
                
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20"
                  onClick={closeLightbox}
                  data-testid="lightbox-close"
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Navigation Buttons */}
                {filteredItems.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                      onClick={() => navigateImage('prev')}
                      data-testid="lightbox-prev"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                      onClick={() => navigateImage('next')}
                      data-testid="lightbox-next"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}

                {/* Image Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-playfair font-bold mb-2">{selectedItem.title}</h3>
                  <p className="font-poppins">{selectedItem.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}