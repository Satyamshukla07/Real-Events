import { useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParticleSystem } from "./ParticleSystem";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Scene3DProps {
  children: ReactNode;
  className?: string;
  sceneType?: "hero" | "services" | "portfolio" | "about" | "contact";
  parallaxStrength?: number;
  particleTheme?: "neon" | "holographic" | "cosmic" | "matrix";
  enableParticles?: boolean;
  particleIntensity?: "low" | "medium" | "high";
  particleInteractive?: boolean;
  enableMobileParticles?: boolean;
  'data-testid'?: string;
}

export function Scene3D({ 
  children, 
  className = "",
  sceneType = "hero",
  parallaxStrength = 1,
  particleTheme = "neon",
  enableParticles = true,
  particleIntensity = "medium",
  particleInteractive = true,
  enableMobileParticles = false,
  'data-testid': testId
}: Scene3DProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const sceneRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const background = backgroundRef.current;
    const content = contentRef.current;

    if (!scene || !background || !content) return;

    // Create parallax scrolling effect
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Background moves slower than content for depth
    parallaxTimeline
      .to(background, {
        yPercent: -50 * parallaxStrength,
        ease: "none"
      })
      .to(content, {
        yPercent: -20 * parallaxStrength,
        ease: "none"
      }, 0);

    // Scene entrance animation
    const enterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse"
      }
    });

    enterTimeline
      .fromTo(content, 
        { 
          opacity: 0,
          y: 100,
          rotateX: 15
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power2.out"
        }
      );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === scene) {
          trigger.kill();
        }
      });
    };
  }, [parallaxStrength]);

  const getSceneStyles = () => {
    const scenes = {
      hero: {
        bg: "bg-gradient-to-b from-black via-gray-900 to-black",
        overlay: "bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10"
      },
      services: {
        bg: "bg-gradient-to-br from-gray-900 via-black to-gray-800", 
        overlay: "bg-gradient-to-tr from-blue-500/5 via-transparent to-cyan-500/5"
      },
      portfolio: {
        bg: "bg-gradient-to-b from-black via-purple-900/20 to-black",
        overlay: "bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10"
      },
      about: {
        bg: "bg-gradient-to-br from-black via-emerald-900/10 to-black",
        overlay: "bg-gradient-to-bl from-emerald-500/5 via-transparent to-cyan-500/5"
      },
      contact: {
        bg: "bg-gradient-to-t from-black via-gray-900 to-black",
        overlay: "bg-gradient-to-tr from-pink-500/10 via-transparent to-cyan-500/10"
      }
    };
    return scenes[sceneType];
  };

  const sceneStyles = getSceneStyles();

  return (
    <motion.section
      ref={sceneRef}
      data-testid={testId}
      className={`
        relative min-h-screen overflow-hidden
        ${sceneStyles.bg}
        ${className}
      `}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1 }}
    >
      {/* Particles background */}
      {enableParticles && (!isMobile || enableMobileParticles) && (
        <ParticleSystem 
          id={`particles-${sceneType}`}
          theme={particleTheme}
          intensity={isMobile ? "low" : particleIntensity}
          interactive={particleInteractive}
        />
      )}

      {/* Animated background layers */}
      <div ref={backgroundRef} className="absolute inset-0">
        {/* Base gradient overlay */}
        <div className={`absolute inset-0 ${sceneStyles.overlay}`} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Floating geometric shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-cyan-500/20 rounded-full"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Content layer */}
      <div ref={contentRef} className="relative z-10 min-h-screen">
        {children}
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        animate={{
          y: ["0vh", "100vh"],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "linear"
        }}
      />
    </motion.section>
  );
}