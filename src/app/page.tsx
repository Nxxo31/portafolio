"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

// Dynamic import for StarField to avoid SSR issues with Three.js
const StarField = dynamic(() => import("@/components/three/StarField"), {
  ssr: false,
});

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  // Track active section based on scroll position
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
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleNodeClick = useCallback((name: string) => {
    // Map constellation node names to sections
    const mapping: Record<string, string> = {
      Projects: "projects",
      About: "about",
      Skills: "skills",
      Contact: "contact",
    };
    const section = mapping[name];
    if (section) {
      handleNavigate(section);
    }
  }, [handleNavigate]);

  return (
    <main className="relative min-h-screen bg-[#05050e] text-white overflow-x-hidden">
      {/* 3D Starfield Background */}
      <StarField onNodeClick={handleNodeClick} />

      {/* Navigation */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Sections */}
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}