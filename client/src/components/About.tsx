import { motion } from 'framer-motion';
import { Users, Award, Clock, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  { icon: Users, title: "Expert Team", description: "Our experienced professionals bring creativity and precision to every event." },
  { icon: Award, title: "Award Winning", description: "Recognized for excellence in event planning and customer satisfaction." },
  { icon: Clock, title: "Timely Execution", description: "We ensure every detail is perfectly timed for a flawless experience." },
  { icon: Heart, title: "Passionate Service", description: "We pour our heart into making your special moments truly memorable." }
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 bg-gray-50 overflow-hidden"
      data-testid="about-section"
    >
      {/* Background Decorative Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute w-72 h-72 bg-pink-200/20 rounded-full top-10 left-10 blur-3xl"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
          className="absolute w-96 h-96 bg-amber-200/20 rounded-full bottom-0 right-0 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-playfair font-extrabold text-gray-800 mb-6">
            About Real Events & Entertainment
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-montserrat leading-relaxed tracking-wide">
            With over a decade of experience in creating extraordinary events, we turn visions into unforgettable memories. From intimate gatherings to grand celebrations, every detail is handled with precision, creativity, and passion.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/30 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
                <CardContent className="p-8 text-center">
                  <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-tr from-pink-300 via-amber-200 to-purple-300 flex items-center justify-center shadow-md text-white"
                  >
                    <feature.icon className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-montserrat leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mission Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl p-1 shadow-xl overflow-hidden"
        >
          <div className="bg-white/80 rounded-3xl p-10 md:p-16 text-center shadow-inner">
            <h3 className="text-3xl md:text-4xl font-playfair font-extrabold text-gray-800 mb-6">
              Our Mission
            </h3>
            <p className="text-lg md:text-xl text-gray-700 font-montserrat leading-relaxed tracking-wide">
              To create exceptional events that exceed expectations, bringing people together through memorable experiences that celebrate life's most important moments. Every event is unique and deserves personalized attention to detail.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
