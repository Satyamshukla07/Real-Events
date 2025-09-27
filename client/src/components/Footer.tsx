import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Heart
} from 'lucide-react';

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" }
];

const services = [
  { name: "Wedding Planning", href: "#services" },
  { name: "Corporate Events", href: "#services" },
  { name: "Social Celebrations", href: "#services" },
  { name: "Entertainment Events", href: "#services" }
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/realeventsandent" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/realeventsandent" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/realeventsandent" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/realeventsandent" }
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-background py-16" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg font-playfair">R</span>
                </div>
                <span className="text-xl font-playfair font-bold">Real Events</span>
              </div>
              <p className="text-background/80 font-poppins leading-relaxed">
                Creating unforgettable moments through exceptional event planning and management. Your vision, our expertise.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-poppins">123 Event Plaza, Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-poppins">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-poppins">info@realeventsandent.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-poppins">Mon-Fri: 9AM-8PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/80 hover:text-primary transition-colors font-poppins text-sm hover-elevate rounded px-1"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => scrollToSection(service.href)}
                    className="text-background/80 hover:text-primary transition-colors font-poppins text-sm hover-elevate rounded px-1"
                    data-testid={`footer-service-${service.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-6">Connect With Us</h3>
            <div className="space-y-6">
              <div>
                <p className="text-background/80 font-poppins text-sm mb-4">
                  Follow us on social media for the latest updates and event inspiration.
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-background/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors hover-elevate"
                      aria-label={`Follow us on ${social.name}`}
                      data-testid={`social-link-${social.name.toLowerCase()}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              <Card className="bg-primary/10 border-primary/20">
                <div className="p-4">
                  <h4 className="font-playfair font-semibold text-background mb-2">
                    Free Consultation
                  </h4>
                  <p className="text-background/80 font-poppins text-sm mb-3">
                    Ready to start planning? Get your free consultation today.
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-montserrat"
                    onClick={() => scrollToSection('#contact')}
                    data-testid="footer-consultation-cta"
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-background/60 font-poppins text-sm">
              <span>© 2024 Real Events and Entertainment Pvt. Ltd. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-6 text-background/60 font-poppins text-sm">
              <button className="hover:text-primary transition-colors hover-elevate rounded px-1">
                Privacy Policy
              </button>
              <button className="hover:text-primary transition-colors hover-elevate rounded px-1">
                Terms of Service
              </button>
              <button className="hover:text-primary transition-colors hover-elevate rounded px-1">
                Cookie Policy
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-background/60 font-poppins text-sm flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-primary" /> for creating unforgettable moments
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}