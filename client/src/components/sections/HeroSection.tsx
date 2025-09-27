import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Scene3D, NeonButton, GlowingCursor } from "../3d";
import { ChevronDown, Sparkles, Zap, Star } from "lucide-react";

export function HeroSection() {
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Logo 3D reveal
    tl.fromTo(logoRef.current,
      {
        rotationY: 90,
        scale: 0.5,
        opacity: 0
      },
      {
        rotationY: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.7)"
      }
    )
    // Title animation with neon effect
    .fromTo(titleRef.current,
      {
        y: 100,
        opacity: 0,
        rotationX: 45
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        ease: "power2.out"
      },
      "-=0.5"
    )
    // Subtitle slide in
    .fromTo(subtitleRef.current,
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.3"
    )
    // CTA button reveal
    .fromTo(ctaRef.current,
      {
        scale: 0,
        rotationY: 180
      },
      {
        scale: 1,
        rotationY: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      },
      "-=0.2"
    );

  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {/* Custom glowing cursor */}
      <GlowingCursor 
        color="cyan" 
        size="md" 
        trailLength={12}
        enabled={true}
        disableOnTouch={true}
      />
      
      <Scene3D 
        sceneType="hero"
        particleTheme="neon"
        particleIntensity="high"
        particleInteractive={true}
        enableMobileParticles={false}
        parallaxStrength={1.5}
        className="relative"
        data-testid="hero-section"
      >
        <div className="relative min-h-screen flex items-center justify-center px-6">
          
          {/* Main content container */}
          <div className="max-w-6xl mx-auto text-center space-y-12">
            
            {/* Logo with 3D reveal */}
            <motion.div 
              ref={logoRef}
              className="relative"
              data-testid="hero-logo"
            >
              <div className="inline-flex items-center gap-4 p-8 rounded-3xl backdrop-blur-lg bg-black/20 border border-cyan-400/30">
                <div className="relative">
                  <Sparkles className="w-16 h-16 text-cyan-400" />
                  <motion.div
                    className="absolute inset-0 w-16 h-16 text-cyan-300"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Star className="w-16 h-16" />
                  </motion.div>
                </div>
                
                <div className="text-left">
                  <div className="text-3xl font-bold text-white tracking-wide">
                    REAL EVENTS
                  </div>
                  <div className="text-cyan-400 text-xl tracking-wider">
                    & ENTERTAINMENT
                  </div>
                </div>
              </div>
              
              {/* Logo glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10 animate-pulse" />
            </motion.div>

            {/* Main headline */}
            <div ref={titleRef} className="space-y-6" data-testid="hero-title">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  THE FUTURE
                </span>
                <br />
                <span className="text-white relative">
                  OF EVENTS
                  {/* Scanning line effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "linear"
                    }}
                  />
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div ref={subtitleRef} className="space-y-8" data-testid="hero-subtitle">
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Step into a universe where luxury meets innovation. We craft immersive experiences 
                that transform events into unforgettable journeys through time and space.
              </p>

              {/* Feature highlights */}
              <div className="flex flex-wrap justify-center gap-8 text-cyan-400">
                {[
                  { icon: Zap, text: "Holographic Displays" },
                  { icon: Sparkles, text: "3D Environments" }, 
                  { icon: Star, text: "Immersive Technology" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 + (index * 0.2) }}
                  >
                    <feature.icon className="w-6 h-6" />
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            <div ref={ctaRef} className="space-y-8" data-testid="hero-cta">
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <NeonButton 
                  variant="primary" 
                  size="lg"
                  onClick={() => scrollToServices()}
                  data-testid="button-explore"
                >
                  <Sparkles className="w-6 h-6" />
                  Explore Our Universe
                </NeonButton>
                
                <NeonButton 
                  variant="secondary" 
                  size="lg"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  data-testid="button-contact"
                >
                  <Zap className="w-6 h-6" />
                  Start Your Journey
                </NeonButton>
              </div>
              
              {/* Scroll indicator */}
              <motion.div
                className="flex flex-col items-center gap-2 text-cyan-400/60 cursor-pointer"
                onClick={scrollToServices}
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                data-testid="scroll-indicator"
              >
                <span className="text-sm tracking-wide">DISCOVER MORE</span>
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </div>

          </div>

          {/* Floating holographic elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${15 + (i * 10)}%`,
                  top: `${20 + (i * 8)}%`
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 6 + (i * 0.8),
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              >
                <div className={`
                  w-12 h-12 rounded-lg border-2 backdrop-blur-sm
                  ${i % 3 === 0 ? 'border-cyan-400/30 bg-cyan-400/10' :
                    i % 3 === 1 ? 'border-purple-400/30 bg-purple-400/10' :
                    'border-pink-400/30 bg-pink-400/10'
                  }
                `} />
              </motion.div>
            ))}
          </div>

        </div>
      </Scene3D>
    </>
  );
}