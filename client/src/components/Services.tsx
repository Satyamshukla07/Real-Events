import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import weddingImage from '@assets/generated_images/Hero_wedding_ceremony_image_e5aac2a9.png';
import corporateImage from '@assets/generated_images/Corporate_events_service_image_e37cecc8.png';
import concertImage from '@assets/generated_images/Concert_entertainment_service_image_720f6d5f.png';
import socialImage from '@assets/generated_images/Social_events_service_image_e76e690c.png';

const services = [
  {
    title: "Wedding Planning",
    description: "From intimate ceremonies to grand celebrations, we create magical wedding experiences that reflect your unique love story.",
    image: weddingImage,
    features: ["Complete wedding coordination", "Vendor management", "Timeline planning", "Day-of coordination"]
  },
  {
    title: "Corporate Events",
    description: "Professional corporate events that enhance your brand image and create meaningful business connections.",
    image: corporateImage,
    features: ["Conference planning", "Product launches", "Team building events", "Awards ceremonies"]
  },
  {
    title: "Entertainment & Concerts",
    description: "Dynamic entertainment events with state-of-the-art production and unforgettable performances.",
    image: concertImage,
    features: ["Concert production", "Stage design", "Sound & lighting", "Artist coordination"]
  },
  {
    title: "Social Celebrations",
    description: "Memorable social events that bring people together for life's special milestones and achievements.",
    image: socialImage,
    features: ["Birthday parties", "Anniversary celebrations", "Graduation events", "Holiday parties"]
  }
];

export default function Services() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-muted/30" data-testid="services-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-poppins leading-relaxed">
            We specialize in creating exceptional experiences across a wide range of events, each tailored to your specific needs and vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group overflow-hidden hover-elevate bg-card border-card-border h-full" data-testid={`service-card-${index}`}>
                <div className="relative overflow-hidden">
                  <img 
                    src={service.image}
                    alt={`${service.title} service showcase`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-playfair font-bold text-card-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-poppins mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground font-poppins">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="ghost" 
                    className="group/btn text-primary hover:text-primary-foreground hover:bg-primary p-0 h-auto font-montserrat font-semibold"
                    onClick={scrollToContact}
                    data-testid={`service-cta-${index}`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-montserrat font-semibold"
            onClick={scrollToContact}
            data-testid="services-main-cta"
          >
            Get Started Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
}