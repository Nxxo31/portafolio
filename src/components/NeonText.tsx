"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import type { ReactNode } from "react";

/**
 * NeonText — wrapper que aplica text-shadow neón animado al contenido.
 *
 * Usa los 2 primeros accents del theme activo (--accent-1 y --accent-2) para
 * crear un glow dual-tone. Animación de "respiración" infinita muy sutil que
 * simula pulsación de luces de neón reales.
 *
 * Respeta prefers-reduced-motion.
 *
 * Modos:
 *   - "subtle"  → glow estático suave, ideal para párrafos destacados
 *   - "medium"  → glow con respiración lenta, ideal para h2/h3
 *   - "intense" → glow agresivo + flicker cada 7-10s, ideal para h1 y Hero
 */

type Intensity = "subtle" | "medium" | "intense";

interface Props {
  children: ReactNode;
  intensity?: Intensity;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p" | "div";
  className?: string;
  /** Color de glow custom (CSS). Si se omite, usa --accent-1 y --accent-2. */
  colorA?: string;
  colorB?: string;
}

const Tag = ({
  as,
  children,
  ...rest
}: {
  as: Props["as"];
  children: ReactNode;
  [key: string]: unknown;
}) => {
  // Render dinámico de la tag
  const Component = (as || "span") as keyof React.JSX.IntrinsicElements;
  return <Component {...rest}>{children}</Component>;
};

export default function NeonText({
  children,
  intensity = "medium",
  as = "span",
  className = "",
  colorA,
  colorB,
}: Props) {
  const shouldReduceMotion = useReducedMotion();

  const intensityMap = {
    subtle: {
      blur1: 8,
      blur2: 16,
      breath: 1.04,
      duration: 4,
      flicker: false,
    },
    medium: {
      blur1: 14,
      blur2: 28,
      breath: 1.08,
      duration: 3,
      flicker: false,
    },
    intense: {
      blur1: 22,
      blur2: 48,
      breath: 1.12,
      duration: 2.4,
      flicker: true,
    },
  } as const;

  const cfg = intensityMap[intensity];
  const glowA = colorA || "var(--accent-1)";
  const glowB = colorB || "var(--accent-2)";

  // Animación de respiración infinita
  const breathAnimation: TargetAndTransition = shouldReduceMotion
    ? {}
    : {
        textShadow: [
          `0 0 ${cfg.blur1}px ${glowA}, 0 0 ${cfg.blur2}px ${glowB}`,
          `0 0 ${cfg.blur1 * cfg.breath}px ${glowA}, 0 0 ${cfg.blur2 * cfg.breath}px ${glowB}`,
          `0 0 ${cfg.blur1}px ${glowA}, 0 0 ${cfg.blur2}px ${glowB}`,
        ],
        transition: {
          duration: cfg.duration,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };

  // Initial state para que aparezca con glow desde el primer frame
  const initialStyle = {
    textShadow: shouldReduceMotion
      ? `0 0 ${cfg.blur1 * 0.5}px ${glowA}`
      : `0 0 ${cfg.blur1}px ${glowA}, 0 0 ${cfg.blur2}px ${glowB}`,
  };

  return (
    <motion.span
      initial={initialStyle}
      animate={breathAnimation}
      className={`inline-block ${className}`}
      style={{
        // Fallback CSS por si motion no aplica (e.g., reduced motion)
        textShadow: initialStyle.textShadow,
      }}
    >
      <Tag as={as}>{children}</Tag>
    </motion.span>
  );
}