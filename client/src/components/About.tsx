import { motion } from 'framer-motion';
import { Users, Award, Clock, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Our experienced professionals bring creativity and precision to every event."
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized for excellence in event planning and customer satisfaction."
  },
  {
    icon: Clock,
    title: "Timely Execution",
    description: "We ensure every detail is perfectly timed for a flawless experience."
  },
  {
    icon: Heart,
    title: "Passionate Service",
    description: "We pour our heart into making your special moments truly memorable."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-background" data-testid="about-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            About Real Events & Entertainment
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-poppins leading-relaxed">
            With over a decade of experience in creating extraordinary events, we are passionate about transforming your vision into unforgettable experiences. From intimate gatherings to grand celebrations, we handle every detail with precision and creativity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover-elevate bg-card border-card-border" data-testid={`feature-card-${index}`}>
                <CardContent className="p-8 text-center">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-playfair font-semibold text-card-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-poppins leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-primary/5 rounded-lg p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-playfair font-bold text-foreground mb-4">
            Our Mission
          </h3>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto font-poppins leading-relaxed">
            To create exceptional events that exceed expectations, bringing people together through memorable experiences that celebrate life's most important moments. We believe every event is unique and deserves personalized attention to detail.
          </p>
        </motion.div>
      </div>
    </section>
  );
}