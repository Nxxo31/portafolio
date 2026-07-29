"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ConstellationBackground from "@/components/ConstellationBackground";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Services from "@/sections/Services";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import anime from "animejs";

type SectionVariant = "hero" | "about" | "projects" | "skills" | "contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Loading screen animation (más corta si reduce-motion está activo)
  useEffect(() => {
    if (!isLoading) return;

    const loaderDuration = shouldReduceMotion ? 200 : 1200;

    if (!shouldReduceMotion) {
      anime({
        targets: ".loader-star",
        opacity: [0, 1],
        scale: [0.5, 1],
        delay: anime.stagger(80),
        easing: "easeOutExpo",
        duration: 600,
      });
    }

    const t = setTimeout(() => {
      if (loaderRef.current && !shouldReduceMotion) {
        anime({
          targets: loaderRef.current,
          opacity: [1, 0],
          duration: 800,
          easing: "easeInOutQuad",
          complete: () => setIsLoading(false),
        });
      } else {
        // Reduce-motion: ocultar inmediatamente
        setIsLoading(false);
      }
    }, loaderDuration);

    return () => clearTimeout(t);
  }, [isLoading, shouldReduceMotion]);

  // Track active section based on scroll
  useEffect(() => {
    const sections = ["hero", "about", "projects", "skills", "contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY + 300;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
  }, [shouldReduceMotion]);

  return (
    <>
      {/* Skip link para navegación por teclado */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#05050e] focus:text-[#22d3ee] focus:border focus:border-[#22d3ee] focus:rounded"
      >
        Saltar al contenido principal
      </a>

      {/* Loading Screen */}
      {isLoading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05050e]"
          role="status"
          aria-live="polite"
          aria-label="Cargando el portafolio"
        >
          <div className="relative">
            {/* Animated stars */}
            <div className="absolute -inset-16" aria-hidden="true">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="loader-star absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${Math.sin((i / 12) * Math.PI * 2) * 60 + 60}px`,
                    left: `${Math.cos((i / 12) * Math.PI * 2) * 60 + 60}px`,
                  }}
                />
              ))}
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] bg-clip-text text-transparent tracking-wider">
                CONSTELLATION
              </h1>
              <p className="text-[#a3a3b8] text-sm mt-4 tracking-[0.3em] uppercase">
                Cargando universo...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Background per section */}
      {!isLoading && (
        <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
          <ConstellationBackground variant={activeSection as SectionVariant} />
        </div>
      )}

      {/* Content */}
      <main className="relative min-h-screen text-white overflow-x-hidden z-[2]" id="main-content">
        <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

        <Hero />
        <About />
        <Projects />
        <Skills />
        <Services />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
