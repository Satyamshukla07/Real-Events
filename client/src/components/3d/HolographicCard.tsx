import { useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  glowColor?: "blue" | "purple" | "cyan" | "pink";
  tilt?: boolean;
  'data-testid'?: string;
}

export function HolographicCard({ 
  children, 
  className = "", 
  intensity = "medium",
  glowColor = "cyan",
  tilt = true,
  'data-testid': testId
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!tilt) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      gsap.to(card, {
        duration: 0.3,
        rotateX,
        rotateY,
        transformPerspective: 1000,
        ease: "power2.out"
      });

      gsap.to(glow, {
        duration: 0.2,
        x: x - centerX,
        y: y - centerY,
        opacity: 0.8,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        ease: "power2.out"
      });

      gsap.to(glow, {
        duration: 0.3,
        x: 0,
        y: 0,
        opacity: 0.4,
        ease: "power2.out"
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [tilt]);

  const getGlowStyles = () => {
    const colors = {
      blue: "from-blue-400/20 via-blue-500/30 to-blue-600/20",
      purple: "from-purple-400/20 via-purple-500/30 to-purple-600/20", 
      cyan: "from-cyan-400/20 via-cyan-500/30 to-cyan-600/20",
      pink: "from-pink-400/20 via-pink-500/30 to-pink-600/20"
    };

    const intensities = {
      low: "blur-md",
      medium: "blur-lg", 
      high: "blur-xl"
    };

    return `absolute inset-0 bg-gradient-to-r ${colors[glowColor]} ${intensities[intensity]} -z-10`;
  };

  const getBorderStyles = () => {
    const colors = {
      blue: "border-blue-400/30",
      purple: "border-purple-400/30",
      cyan: "border-cyan-400/30", 
      pink: "border-pink-400/30"
    };
    return colors[glowColor];
  };

  return (
    <motion.div
      ref={cardRef}
      data-testid={testId}
      className={`
        relative group cursor-pointer
        backdrop-blur-md bg-black/10 border 
        ${getBorderStyles()}
        rounded-2xl overflow-hidden
        transition-all duration-300
        hover:bg-black/20
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Holographic glow effect */}
      <div ref={glowRef} className={getGlowStyles()} />
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`
          absolute inset-0 rounded-2xl 
          bg-gradient-to-r ${glowColor === 'cyan' ? 'from-cyan-400/0 via-cyan-400/50 to-cyan-400/0' : 
                            glowColor === 'purple' ? 'from-purple-400/0 via-purple-400/50 to-purple-400/0' :
                            glowColor === 'blue' ? 'from-blue-400/0 via-blue-400/50 to-blue-400/0' :
                            'from-pink-400/0 via-pink-400/50 to-pink-400/0'}
          animate-pulse
        `} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`
              absolute w-1 h-1 rounded-full 
              ${glowColor === 'cyan' ? 'bg-cyan-400' :
                glowColor === 'purple' ? 'bg-purple-400' :
                glowColor === 'blue' ? 'bg-blue-400' : 'bg-pink-400'}
            `}
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${10 + (i * 10)}%`
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}