import { useCallback, useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

interface ParticleSystemProps {
  id?: string;
  theme?: "neon" | "holographic" | "cosmic" | "matrix";
  intensity?: "low" | "medium" | "high";
  interactive?: boolean;
  className?: string;
}

export function ParticleSystem({ 
  id = "particles",
  theme = "neon",
  intensity = "medium",
  interactive = true,
  className = ""
}: ParticleSystemProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Particles loaded successfully
  }, []);

  const getParticleConfig = () => {
    const baseConfig = {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: interactive,
            mode: "push",
          },
          onHover: {
            enable: interactive,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      detectRetina: true,
    };

    const particleCounts = {
      low: 30,
      medium: 60,
      high: 120
    };

    switch (theme) {
      case "neon":
        return {
          ...baseConfig,
          particles: {
            number: {
              value: particleCounts[intensity],
              density: {
                enable: true,
                area: 800,
              },
            },
            color: {
              value: ["#00ffff", "#ff00ff", "#ffff00", "#00ff00"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: true,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 3 },
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.5,
                sync: false,
              },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#00ffff",
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce",
              },
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
        };

      case "holographic":
        return {
          ...baseConfig,
          particles: {
            number: {
              value: particleCounts[intensity] * 0.7,
              density: {
                enable: true,
                area: 1000,
              },
            },
            color: {
              value: ["#88ddff", "#dd88ff", "#ffdd88", "#88ffdd"],
            },
            shape: {
              type: ["circle", "triangle", "polygon"],
              polygon: {
                nb_sides: 6,
              },
            },
            opacity: {
              value: 0.3,
              random: true,
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.05,
                sync: false,
              },
            },
            size: {
              value: { min: 2, max: 6 },
              animation: {
                enable: true,
                speed: 3,
                minimumValue: 1,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
              gravity: {
                enable: false,
                acceleration: 9.81,
                maxSpeed: 50,
              },
            },
          },
        };

      case "cosmic":
        return {
          ...baseConfig,
          particles: {
            number: {
              value: particleCounts[intensity] * 1.5,
              density: {
                enable: true,
                area: 600,
              },
            },
            color: {
              value: ["#ffffff", "#ffffcc", "#ccffff", "#ffccff"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.8,
              random: true,
              animation: {
                enable: true,
                speed: 3,
                minimumValue: 0,
                sync: false,
              },
            },
            size: {
              value: { min: 0.5, max: 2 },
              animation: {
                enable: true,
                speed: 5,
                minimumValue: 0.1,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: { min: 0.1, max: 1 },
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
            },
          },
        };

      case "matrix":
        return {
          ...baseConfig,
          particles: {
            number: {
              value: particleCounts[intensity] * 0.8,
              density: {
                enable: true,
                area: 900,
              },
            },
            color: {
              value: "#00ff00",
            },
            shape: {
              type: "char",
              character: {
                value: ["0", "1", "A", "B", "C", "D", "E", "F"],
                font: "monospace",
                style: "",
                weight: "400",
                fill: true,
              },
            },
            opacity: {
              value: 0.7,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.1,
                sync: false,
              },
            },
            size: {
              value: 16,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "bottom" as const,
              random: false,
              straight: true,
              outModes: {
                default: "out",
              },
            },
          },
        };

      default:
        return baseConfig;
    }
  };

  return (
    <Particles
      id={id}
      className={`absolute inset-0 pointer-events-none ${className}`}
      init={particlesInit}
      loaded={particlesLoaded}
      options={getParticleConfig()}
    />
  );
}