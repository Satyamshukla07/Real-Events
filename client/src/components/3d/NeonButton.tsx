import { useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  'data-testid'?: string;
}

export function NeonButton({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary",
  size = "md",
  disabled = false,
  'data-testid': testId
}: NeonButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const glow = glowRef.current;
    if (!button || !glow) return;

    const handleMouseEnter = () => {
      if (disabled) return;
      
      gsap.to(glow, {
        duration: 0.3,
        scale: 1.1,
        opacity: 1,
        ease: "power2.out"
      });

      gsap.to(button, {
        duration: 0.2,
        y: -2,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(glow, {
        duration: 0.4,
        scale: 1,
        opacity: 0.7,
        ease: "power2.out"
      });

      gsap.to(button, {
        duration: 0.3,
        y: 0,
        ease: "power2.out"
      });
    };

    const handleMouseDown = () => {
      if (disabled) return;
      
      gsap.to(button, {
        duration: 0.1,
        scale: 0.98,
        ease: "power2.out"
      });
    };

    const handleMouseUp = () => {
      gsap.to(button, {
        duration: 0.2,
        scale: 1,
        ease: "power2.out"
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mousedown", handleMouseDown);
    button.addEventListener("mouseup", handleMouseUp);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mousedown", handleMouseDown);
      button.removeEventListener("mouseup", handleMouseUp);
    };
  }, [disabled]);

  const getVariantStyles = () => {
    const variants = {
      primary: {
        bg: "bg-gradient-to-r from-cyan-500 to-blue-500",
        border: "border-cyan-400",
        glow: "shadow-cyan-500/50",
        text: "text-white"
      },
      secondary: {
        bg: "bg-gradient-to-r from-purple-500 to-pink-500", 
        border: "border-purple-400",
        glow: "shadow-purple-500/50",
        text: "text-white"
      },
      accent: {
        bg: "bg-gradient-to-r from-emerald-500 to-cyan-500",
        border: "border-emerald-400", 
        glow: "shadow-emerald-500/50",
        text: "text-white"
      }
    };
    return variants[variant];
  };

  const getSizeStyles = () => {
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };
    return sizes[size];
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <motion.div className="relative inline-block">
      {/* Pulsing glow background */}
      <div
        ref={glowRef}
        className={`
          absolute inset-0 rounded-xl opacity-70
          ${variantStyles.bg} 
          blur-lg animate-pulse
        `}
      />
      
      <motion.button
        ref={buttonRef}
        data-testid={testId}
        onClick={onClick}
        disabled={disabled}
        className={`
          relative z-10 font-semibold rounded-xl border-2 
          backdrop-blur-sm transition-all duration-300
          ${variantStyles.bg} 
          ${variantStyles.border} 
          ${variantStyles.text}
          ${sizeStyles}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl'}
          ${variantStyles.glow}
          ${className}
        `}
        whileHover={!disabled ? { 
          boxShadow: "0 0 30px rgba(34, 211, 238, 0.6)",
          transition: { duration: 0.2 }
        } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        
        {/* Scanning line effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear"
          }}
          style={{ clipPath: "inset(0 0 0 0)" }}
        />
      </motion.button>
    </motion.div>
  );
}