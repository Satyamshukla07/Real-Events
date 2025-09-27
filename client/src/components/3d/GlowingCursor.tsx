import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface GlowingCursorProps {
  color?: "cyan" | "purple" | "pink" | "blue";
  size?: "sm" | "md" | "lg";
  trailLength?: number;
  enabled?: boolean;
  disableOnTouch?: boolean;
}

export function GlowingCursor({ 
  color = "cyan",
  size = "md", 
  trailLength = 10,
  enabled = true,
  disableOnTouch = true
}: GlowingCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(enabled && !(disableOnTouch && ('ontouchstart' in window || navigator.maxTouchPoints > 0)));
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  useEffect(() => {
    // Manage body class for cursor hiding
    if (enabled && !(disableOnTouch && isTouchDevice) && isVisible) {
      document.body.classList.add('custom-cursor');
    } else {
      document.body.classList.remove('custom-cursor');
    }

    return () => {
      document.body.classList.remove('custom-cursor');
    };
  }, [enabled, disableOnTouch, isTouchDevice, isVisible]);

  useEffect(() => {
    if (!enabled || (disableOnTouch && isTouchDevice)) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      
      gsap.to(cursor, {
        duration: 0.1,
        x: e.clientX,
        y: e.clientY,
        ease: "power2.out"
      });

      // Animate trail
      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          gsap.to(trail, {
            duration: 0.3 + (index * 0.05),
            x: e.clientX,
            y: e.clientY,
            ease: "power2.out"
          });
        }
      });

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'BUTTON' || 
                           target.tagName === 'A' || 
                           target.classList.contains('cursor-pointer') ||
                           target.closest('button') ||
                           target.closest('a') ||
                           target.closest('[role="button"]');
      
      setIsHovering(!!isInteractive);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [enabled, isVisible, disableOnTouch, isTouchDevice]);

  const getColorStyles = () => {
    const colors = {
      cyan: {
        main: "bg-cyan-400",
        glow: "shadow-cyan-400/60",
        trail: "bg-cyan-300/40"
      },
      purple: {
        main: "bg-purple-400", 
        glow: "shadow-purple-400/60",
        trail: "bg-purple-300/40"
      },
      pink: {
        main: "bg-pink-400",
        glow: "shadow-pink-400/60", 
        trail: "bg-pink-300/40"
      },
      blue: {
        main: "bg-blue-400",
        glow: "shadow-blue-400/60",
        trail: "bg-blue-300/40"
      }
    };
    return colors[color];
  };

  const getSizeStyles = () => {
    const sizes = {
      sm: { main: "w-2 h-2", trail: "w-1 h-1" },
      md: { main: "w-3 h-3", trail: "w-2 h-2" },
      lg: { main: "w-4 h-4", trail: "w-3 h-3" }
    };
    return sizes[size];
  };

  const colorStyles = getColorStyles();
  const sizeStyles = getSizeStyles();

  // Don't render on touch devices if disabled, or if not enabled/visible
  if (!enabled || (disableOnTouch && isTouchDevice) || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor only when custom cursor is active */}
      <style>
        {`
          body.custom-cursor * {
            cursor: none !important;
          }
        `}
      </style>

      {/* Trail particles */}
      {[...Array(trailLength)].map((_, index) => (
        <div
          key={index}
          ref={el => trailRefs.current[index] = el}
          className={`
            fixed pointer-events-none z-[9999] rounded-full
            ${colorStyles.trail} ${sizeStyles.trail}
            transition-opacity duration-300
          `}
          style={{
            opacity: (trailLength - index) / trailLength * 0.6,
            transform: `translate(-50%, -50%)`,
            left: mousePosition.current.x,
            top: mousePosition.current.y
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className={`
          fixed pointer-events-none z-[10000] rounded-full
          ${colorStyles.main} ${sizeStyles.main}
          ${colorStyles.glow}
        `}
        style={{
          transform: `translate(-50%, -50%)`,
          left: mousePosition.current.x,
          top: mousePosition.current.y
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 1
        }}
        transition={{
          duration: 0.2,
          ease: "backOut"
        }}
      >
        {/* Pulsing glow effect */}
        <motion.div
          className={`
            absolute inset-0 rounded-full
            ${colorStyles.main} blur-sm
          `}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0.3, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </>
  );
}