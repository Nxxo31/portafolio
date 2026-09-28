"use client";

import { useEffect, useRef } from "react";

/**
 * WaveBackground — fondo animado con ondas de audio tipo visualizador.
 *
 * Canvas 2D de baja opacidad, fixed detrás de todo el contenido. Dibuja 3 capas
 * de ondas sinusoidales superpuestas con colores del theme activo y un
 * visualizador de bars al fondo.
 *
 * Performance: requestAnimationFrame con delta-time clamping, pausa cuando la
 * pestaña no está visible, respeta prefers-reduced-motion (renderiza 1 frame
 * estático y se detiene).
 *
 * No interactúa con el DOM — es decorativo puro. aria-hidden.
 */

interface Props {
  /** Opacidad global del fondo (0-1). Default 0.18. */
  intensity?: number;
}

export default function WaveBackground({ intensity = 0.18 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Detectar prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onMqChange = () => {
      reducedMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", onMqChange);

    // Resize handling — devicePixelRatio para nitidez en HiDPI
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      if (!canvas || !ctx) return;
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    // Page Visibility API — pausa cuando no está visible
    let isVisible = !document.hidden;
    const onVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Colores — se leen una vez por frame del theme activo
    function getColors() {
      const style = getComputedStyle(document.documentElement);
      const read = (name: string, fallback: string) =>
        style.getPropertyValue(name).trim() || fallback;
      return {
        accent1: read("--accent-1", "#ff6b35"),
        accent2: read("--accent-2", "#00a6fb"),
        accent3: read("--accent-3", "#ffd23f"),
        accent4: read("--accent-4", "#06d6a0"),
        ink: read("--ink", "#1a1a2e"),
        paper: read("--paper", "#f4f1e8"),
      };
    }

    let t = 0;
    let lastTime = performance.now();

    function draw() {
      if (!canvas || !ctx) return;
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05); // clamp 50ms
      lastTime = now;

      if (isVisible && !reducedMotionRef.current) {
        t += delta;
      }

      const colors = getColors();
      const w = width;
      const h = height;

      // Clear con paper color (para que el fondo respete el theme)
      ctx.fillStyle = colors.paper;
      ctx.fillRect(0, 0, w, h);

      // ===== Visualizador de bars al fondo (estilo Winamp/club) =====
      const barCount = Math.floor(w / 18);
      const barWidth = w / barCount;
      const visualizerBaseY = h * 0.92;
      const visualizerMaxH = h * 0.12;

      ctx.save();
      ctx.globalAlpha = intensity * 1.4;
      for (let i = 0; i < barCount; i++) {
        // Mezcla de senos para simular espectro de audio
        const phase = t * 2 + i * 0.18;
        const v =
          (Math.sin(phase) * 0.5 +
            Math.sin(phase * 2.3) * 0.3 +
            Math.sin(phase * 0.7) * 0.2) /
            2 +
          0.5;
        const barH = v * visualizerMaxH;

        const colorIdx = i % 4;
        const color = [colors.accent1, colors.accent2, colors.accent3, colors.accent4][colorIdx];
        ctx.fillStyle = color;
        ctx.fillRect(i * barWidth + 1, visualizerBaseY - barH, barWidth - 2, barH);
      }
      ctx.restore();

      // ===== 3 capas de ondas sinusoidales =====
      const waves = [
        {
          amplitude: h * 0.06,
          frequency: 0.0042,
          speed: 0.6,
          yBase: h * 0.78,
          color: colors.accent1,
          alpha: intensity * 1.6,
          thickness: 2.5,
        },
        {
          amplitude: h * 0.045,
          frequency: 0.0061,
          speed: -0.8,
          yBase: h * 0.78,
          color: colors.accent2,
          alpha: intensity * 1.4,
          thickness: 2,
        },
        {
          amplitude: h * 0.08,
          frequency: 0.0029,
          speed: 0.45,
          yBase: h * 0.78,
          color: colors.accent3,
          alpha: intensity * 1.0,
          thickness: 1.5,
        },
      ];

      ctx.save();
      ctx.lineWidth = 1.5;
      for (const wave of waves) {
        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = wave.alpha;
        ctx.lineWidth = wave.thickness;
        ctx.beginPath();
        const step = 6;
        for (let x = 0; x <= width; x += step) {
          const y =
            wave.yBase +
            Math.sin((x + t * wave.speed * 200) * wave.frequency) * wave.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // ===== Laser beams diagonales sutiles (decorativos) =====
      // Solo se dibujan si el theme es dark para evitar que se vea mal en light
      const isDark = colors.paper.toLowerCase().startsWith("#1") ||
        colors.paper.toLowerCase().startsWith("#0");
      if (isDark) {
        ctx.save();
        ctx.globalAlpha = intensity * 0.8;
        ctx.lineWidth = 1;
        const lasers = [
          { angle: -0.3, color: colors.accent1 },
          { angle: 0.4, color: colors.accent2 },
        ];
        for (const laser of lasers) {
          ctx.strokeStyle = laser.color;
          ctx.beginPath();
          ctx.moveTo(0, h * 0.4);
          ctx.lineTo(w, h * 0.4 + Math.tan(laser.angle) * w);
          ctx.stroke();
        }
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      mq.removeEventListener("change", onMqChange);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}