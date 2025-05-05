
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const SECTION_IDS = ["hero", "skills", "projects", "certificates", "contact"];

const Index = () => {
  const { activeSection, scrollToSection } = useScrollSpy(SECTION_IDS);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for initial animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
        <div className="animate-pulse">
          <div className="h-16 w-16 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeSection={activeSection} onNavClick={scrollToSection} />
      
      <main className="flex-grow">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
