import HeroSection from "@/sections/Hero";
import AboutSection from "@/sections/About";
import ExperienceSection from "@/sections/Experience";
import ProjectsSection from "@/sections/Projects";
import SkillsSection from "@/sections/Skills";
import ContactSection from "@/sections/Contact";
import Footer from "@/sections/Footer";

// Services section removed: per dual-strategy (PROJECT.md), "Services for
// hire" lives in NX-Studio, not in this personal portfolio. The portfolio
// focuses on personal brand, projects, and blog.

// NOTE: page-level metadata removed on purpose. Title/description come from
// generateMetadata() in src/app/layout.tsx, which is locale-aware via
// next-intl. Exporting a static `metadata` here was overriding the layout
// and leaking "NX Studio - Latin American Technology Partner" (the
// business-site copy) into the personal portfolio's <title>.
// Portfolio content lives in `src/content/data.ts` and gets rendered through
// the section components below. i18n strings come from `messages/{locale}.json`.

export default function Page() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </>
  );
}

