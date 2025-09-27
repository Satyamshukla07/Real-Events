import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

import clientPhoto1 from '@assets/generated_images/Testimonial_client_photo_1_d1c05ada.png';
import clientPhoto2 from '@assets/generated_images/Testimonial_client_photo_2_5d8b977e.png';
import clientPhoto3 from '@assets/generated_images/Testimonial_client_photo_3_30b72444.png';

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Bride",
    company: "Wedding Client",
    image: clientPhoto1,
    rating: 5,
    testimonial: "Real Events made our wedding absolutely magical! Every detail was perfect, from the ceremony to the reception. Their team was professional, creative, and truly understood our vision. We couldn't have asked for a better experience."
  },
  {
    id: 2,
    name: "David Chen",
    role: "CEO",
    company: "TechFlow Solutions",
    image: clientPhoto2,
    rating: 5,
    testimonial: "Outstanding corporate event management! Our annual conference was flawlessly executed. The team handled everything from venue coordination to technical requirements. Our attendees were impressed, and we received excellent feedback."
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    role: "Event Coordinator",
    company: "Global Marketing Inc.",
    image: clientPhoto3,
    rating: 5,
    testimonial: "Working with Real Events was a pleasure from start to finish. Their attention to detail and creative approach transformed our product launch into an unforgettable experience. Highly recommend for any corporate event needs."
  },
  {
    id: 4,
    name: "James Thompson",
    role: "Groom",
    company: "Wedding Client",
    image: clientPhoto2,
    rating: 5,
    testimonial: "The team went above and beyond to make our special day perfect. From the initial planning to the final cleanup, everything was handled with professionalism and care. Our guests are still talking about how amazing everything was."
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Marketing Director",
    company: "Creative Brands",
    image: clientPhoto1,
    rating: 5,
    testimonial: "Exceptional service and creativity! Our company retreat was perfectly organized and executed. The team understood our corporate culture and created an event that brought our team together beautifully."
  },
  {
    id: 6,
    name: "Robert Adams",
    role: "Father of the Bride",
    company: "Family Client",
    image: clientPhoto2,
    rating: 5,
    testimonial: "Real Events helped us celebrate our daughter's wedding in the most beautiful way. Their coordination was seamless, and they handled every detail so we could focus on enjoying this special moment with our family."
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const nextTestimonials = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevTestimonials = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentTestimonials = testimonials.slice(
    currentIndex * testimonialsPerPage,
    (currentIndex + 1) * testimonialsPerPage
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-primary fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-24 bg-muted/30" data-testid="testimonials-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Client Testimonials
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-poppins leading-relaxed">
            Don't just take our word for it. Here's what our clients say about their experience working with Real Events & Entertainment.
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonials}
              disabled={totalPages <= 1}
              data-testid="testimonials-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonials}
              disabled={totalPages <= 1}
              data-testid="testimonials-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Testimonials Grid */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate bg-card border-card-border" data-testid={`testimonial-card-${testimonial.id}`}>
                  <CardContent className="p-8">
                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-primary mb-4" />
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-muted-foreground font-poppins leading-relaxed mb-6 italic">
                      "{testimonial.testimonial}"
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.name} profile`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-playfair font-semibold text-card-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground font-montserrat">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  data-testid={`pagination-dot-${i}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-primary/5 rounded-lg p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-foreground mb-4">
              Ready to Create Your Own Success Story?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 font-poppins max-w-2xl mx-auto">
              Join our satisfied clients and let us help you create an unforgettable event experience.
            </p>
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-montserrat font-semibold"
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              data-testid="testimonials-cta"
            >
              Start Planning Today
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}