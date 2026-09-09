import HeroSection from "@/sections/Hero";
import AboutSection from "@/sections/About";
import ServicesSection from "@/sections/Services";
import ProjectsSection from "@/sections/Projects";
import Testimonials from "@/sections/Testimonials";
import SkillsSection from "@/sections/Skills";
import ContactSection from "@/sections/Contact";
import Footer from "@/sections/Footer";

export const metadata = {
  title: "NX Studio - Latin American Technology Partner",
  description: "Desarrollamos tecnología a medida que combina la agilidad latinoamericana con estándares globales para resolver problemas de negocio con resultados medibles.",
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <Testimonials />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </>
  );
}

