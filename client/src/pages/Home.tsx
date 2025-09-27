import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import { HeroSection } from '@/components/sections';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Real Events & Entertainment - The Future of Luxury Events</title>
          <meta 
            name="description" 
            content="Step into the future of event experiences. Real Events & Entertainment creates immersive luxury events with cutting-edge technology, holographic displays, and unforgettable 3D environments." 
          />
          <meta name="keywords" content="futuristic events, luxury event planning, immersive experiences, holographic events, 3D environments, premium entertainment, innovative event technology" />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content="Real Events & Entertainment - The Future of Luxury Events" />
          <meta property="og:description" content="Step into a universe where luxury meets innovation. We craft immersive experiences that transform events into unforgettable journeys through time and space." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://realeventsandent.com/" />
          <meta property="og:site_name" content="Real Events & Entertainment" />
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Real Events & Entertainment - The Future of Luxury Events" />
          <meta name="twitter:description" content="Immersive luxury events with cutting-edge technology and unforgettable 3D environments." />
          
          {/* Additional SEO Tags */}
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Real Events and Entertainment Pvt. Ltd." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="canonical" href="https://realeventsandent.com/" />
          
          {/* Schema.org structured data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Real Events & Entertainment",
              "description": "Futuristic luxury event experiences with immersive technology and holographic environments",
              "url": "https://realeventsandent.com/",
              "telephone": "+91 98765 43210",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Event Plaza, Suite 456",
                "addressLocality": "Mumbai",
                "addressRegion": "Maharashtra",
                "postalCode": "400001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "19.0760",
                "longitude": "72.8777"
              },
              "openingHours": "Mo-Fr 09:00-20:00, Sa 10:00-18:00",
              "priceRange": "₹₹₹",
              "servedCuisine": [],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "19.0760",
                  "longitude": "72.8777"
                },
                "geoRadius": "50000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Event Planning Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Wedding Planning",
                      "description": "Complete wedding coordination and planning services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Corporate Events",
                      "description": "Professional corporate event planning and management"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Social Celebrations",
                      "description": "Birthday parties, anniversaries, and social events"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Entertainment Events",
                      "description": "Concert production and entertainment event management"
                    }
                  }
                ]
              }
            })}
          </script>
        </Helmet>
        
        <Header />
        
        <main>
          <HeroSection />
          <div id="services">
            <Services />
          </div>
          <Portfolio />
          <About />
          <Testimonials />
          <div id="contact">
            <Contact />
          </div>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}