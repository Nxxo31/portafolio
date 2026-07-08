"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

interface Star {
  x: number;
  y: number;
  z: number;
  originX: number;
  originY: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

interface ConstellationBackgroundProps {
  section?: string;
  variant?: "hero" | "about" | "projects" | "skills" | "contact";
}

export default function ConstellationBackground({
  variant = "hero",
}: ConstellationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number;
    let height: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    // Star counts per variant
    const starCounts: Record<string, number> = {
      hero: 200,
      about: 150,
      projects: 180,
      skills: 120,
      contact: 100,
    };

    const starCount = starCounts[variant] || 150;

    // Initialize stars with depth (z-axis simulation)
    const initStars = () => {
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const z = Math.random() * 1000; // depth
        stars.push({
          x,
          y,
          z,
          originX: x,
          originY: y,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
        });
      }
      starsRef.current = stars;
    };

    initStars();

    // Mouse tracking
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const stars = starsRef.current;
      const mouse = mouseRef.current;

      // Draw connections between nearby stars
      ctx.strokeStyle = "rgba(124, 92, 255, 0.15)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.15;
            ctx.strokeStyle = `rgba(124, 92, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw stars with parallax
      stars.forEach((star, i) => {
        // Parallax based on mouse position
        const dx = mouse.x !== -1000 ? (mouse.x - width / 2) * (star.z / 10000) : 0;
        const dy = mouse.y !== -1000 ? (mouse.y - height / 2) * (star.z / 10000) : 0;

        star.x = star.originX - dx * 0.3;
        star.y = star.originY - dy * 0.3;

        // Twinkle effect
        const twinkle = Math.sin(time * star.twinkleSpeed + i) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkle;

        // Glow effect
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(124, 92, 255, ${currentOpacity * 0.3})`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core bright spot
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      });

      // Variant-specific constellations
      drawConstellation(ctx, width, height, variant, time);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// Draw constellation shapes per variant
function drawConstellation(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  variant: string,
  time: number
) {
  const centerX = width / 2;
  const centerY = height / 2;

  switch (variant) {
    case "hero":
      drawHeroConstellation(ctx, centerX, centerY, time);
      break;
    case "about":
      drawAboutConstellation(ctx, centerX, centerY, time);
      break;
    case "projects":
      drawProjectsConstellation(ctx, centerX, centerY, time);
      break;
    case "skills":
      drawSkillsConstellation(ctx, centerX, centerY, time);
      break;
    case "contact":
      drawContactConstellation(ctx, centerX, centerY, time);
      break;
  }
}

function drawHeroConstellation(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  time: number
) {
  const t = time * 0.005;
  const points = [];

  // Create a constellation pattern for hero (Orion-like)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + t;
    const radius = 100 + Math.sin(t * 2 + i) * 20;
    points.push({
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    });
  }

  // Draw constellation lines
  ctx.strokeStyle = "rgba(124, 92, 255, 0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    const next = (i + 1) % points.length;
    ctx.moveTo(points[i].x, points[i].y);
    ctx.lineTo(points[next].x, points[next].y);
  }
  ctx.stroke();

  // Draw stars at constellation points
  points.forEach((p) => {
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 8);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  });
}

function drawAboutConstellation(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  time: number
) {
  const t = time * 0.003;

  // Triangle constellation
  const points = [
    { x: cx + Math.cos(t) * 80, y: cy + Math.sin(t) * 80 },
    { x: cx + Math.cos(t + (Math.PI * 2) / 3) * 80, y: cy + Math.sin(t + (Math.PI * 2) / 3) * 80 },
    { x: cx + Math.cos(t + (Math.PI * 4) / 3) * 80, y: cy + Math.sin(t + (Math.PI * 4) / 3) * 80 },
  ];

  ctx.strokeStyle = "rgba(34, 211, 238, 0.15)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  ctx.lineTo(points[1].x, points[1].y);
  ctx.lineTo(points[2].x, points[2].y);
  ctx.closePath();
  ctx.stroke();
}

function drawProjectsConstellation(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  time: number
) {
  const t = time * 0.002;

  // Grid of smaller constellations
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const offsetX = ((col - 1) * 200) + cx;
      const offsetY = ((row - 1) * 150) + cy;
      const x = offsetX + Math.sin(t + row + col) * 30;
      const y = offsetY + Math.cos(t + row + col) * 30;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
      gradient.addColorStop(0, "rgba(245, 196, 81, 0.3)");
      gradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
}

function drawSkillsConstellation(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  time: number
) {
  const t = time * 0.004;

  // Orbiting constellation
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 + t;
    const radius = 60 + i * 10;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
    gradient.addColorStop(0, "rgba(124, 92, 255, 0.5)");
    gradient.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

function drawContactConstellation(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  time: number
) {
  const t = time * 0.003;

  // Pulse effect constellation
  const pulseRadius = 50 + Math.sin(t) * 20;
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseRadius);
  gradient.addColorStop(0, "rgba(34, 211, 238, 0.1)");
  gradient.addColorStop(1, "transparent");
  ctx.beginPath();
  ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Surrounding stars
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + t * 0.5;
    const x = cx + Math.cos(angle) * 120;
    const y = cy + Math.sin(angle) * 120;

    const starGradient = ctx.createRadialGradient(x, y, 0, x, y, 5);
    starGradient.addColorStop(0, "rgba(34, 211, 238, 0.6)");
    starGradient.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = starGradient;
    ctx.fill();
  }
}
