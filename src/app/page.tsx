"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Services from "@/sections/Services";
import Experience from "@/sections/Experience";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function Home() {
  const tLoader = useTranslations("Loader");
  const tSkip = useTranslations("SkipLink");
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isLoading) return;

    const loaderDuration = shouldReduceMotion ? 200 : 1000;

    const t = setTimeout(() => {
      if (loaderRef.current && !shouldReduceMotion) {
        loaderRef.current.style.transition = "opacity 0.4s ease";
        loaderRef.current.style.opacity = "0";
        setTimeout(() => setIsLoading(false), 400);
      } else {
        setIsLoading(false);
      }
    }, loaderDuration);

    return () => clearTimeout(t);
  }, [isLoading, shouldReduceMotion]);

  useEffect(() => {
    const sections = ["hero", "about", "projects", "skills", "testimonials", "contact"];
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

  const handleNavigate = useCallback(
    (section: string) => {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({
          behavior: shouldReduceMotion ? "auto" : "smooth",
        });
      }
    },
    [shouldReduceMotion],
  );

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[var(--accent-1)] focus:text-[var(--ink)] focus:border-2 focus:border-[var(--ink)]"
      >
        {tSkip("text")}
      </a>

      {isLoading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--paper)]"
          role="status"
          aria-live="polite"
          aria-label={tLoader("ariaLabel")}
        >
          <div className="text-center">
            <h1
              className="font-heading text-4xl font-bold tracking-wider"
              style={{ color: "var(--ink)" }}
            >
              {tLoader("brand")}
            </h1>
            <p
              className="text-sm mt-4 tracking-[0.3em] uppercase"
              style={{ color: "var(--ink)" }}
            >
              {tLoader("loading")}
            </p>
          </div>
        </div>
      )}

      <main
        className="relative min-h-screen overflow-x-hidden z-[2]"
        id="main-content"
        style={{ color: "var(--ink)" }}
      >
        <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

        <Hero />
        <About />
        <Projects />
        <Skills />
        <Services />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
