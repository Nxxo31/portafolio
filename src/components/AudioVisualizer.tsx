"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

/**
 * AudioVisualizer — SVG animado con bars de espectro de audio.
 *
 * Cada bar usa un color del theme activo. Ideal para Hero como elemento
 * decorativo. aria-hidden, role="presentation".
 *
 * SSR-safe: renderiza SVG estático en server, activa animación post-mount
 * usando useSyncExternalStore para detectar cliente (sin useEffect + setState,
 * evita cascading renders y warnings de lint).
 *
 * Respeta prefers-reduced-motion — renderiza las bars estáticas a altura media.
 */

interface Props {
  /** Cantidad de bars. Default 32. */
  bars?: number;
  /** Altura máxima en px. Default 80. */
  maxHeight?: number;
  className?: string;
}

// useSyncExternalStore: detecta client vs SSR sin useEffect.
// subscribe vacío (no hay eventos externos), getSnapshot=true (cliente),
// getServerSnapshot=false (server). Fuerza un re-render al hidratarse.
const emptySubscribe = () => () => {};

export default function AudioVisualizer({
  bars = 32,
  maxHeight = 80,
  className = "",
}: Props) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const shouldReduceMotion = useReducedMotion();

  // Generar alturas pseudo-aleatorias estables (basadas en el índice)
  const heights = Array.from({ length: bars }, (_, i) => {
    const seed = Math.sin(i * 12.9898) * 43758.5453;
    return Math.abs(seed - Math.floor(seed)); // [0, 1]
  });

  // Render estático para SSR y para usuarios con prefers-reduced-motion
  if (!mounted || shouldReduceMotion) {
    return (
      <svg
        role="presentation"
        aria-hidden="true"
        viewBox={`0 0 ${bars * 6} ${maxHeight}`}
        className={className}
        preserveAspectRatio="none"
      >
        {heights.map((h, i) => {
          const barH = h * maxHeight * 0.7;
          const x = i * 6;
          const y = (maxHeight - barH) / 2;
          const colorIdx = i % 4;
          const color = `var(--accent-${colorIdx + 1})`;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={4}
              height={barH}
              fill={color}
              opacity={0.85}
            />
          );
        })}
      </svg>
    );
  }

  return (
    <svg
      role="presentation"
      aria-hidden="true"
      viewBox={`0 0 ${bars * 6} ${maxHeight}`}
      className={className}
      preserveAspectRatio="none"
    >
      {heights.map((h, i) => {
        const barH = h * maxHeight * 0.85;
        const x = i * 6;
        const y = (maxHeight - barH) / 2;
        const colorIdx = i % 4;
        const color = `var(--accent-${colorIdx + 1})`;
        // Delay escalonado para efecto de cascada
        const delay = (i % 8) * 0.08;
        const duration = 0.6 + (i % 5) * 0.15;
        return (
          <motion.rect
            key={i}
            x={x}
            width={4}
            fill={color}
            initial={{ y: maxHeight / 2, height: 4, opacity: 0.9 }}
            animate={{
              y: [
                maxHeight / 2,
                y,
                maxHeight / 2 - barH * 0.3,
                y,
                maxHeight / 2,
              ],
              height: [4, barH, barH * 0.5, barH, 4],
              opacity: [0.9, 1, 0.7, 1, 0.9],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ filter: "drop-shadow(0 0 4px currentColor)" }}
          />
        );
      })}
    </svg>
  );
}