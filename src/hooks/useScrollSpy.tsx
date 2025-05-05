
import { useState, useEffect, useRef } from "react";

export const useScrollSpy = (sectionIds: string[], offset = 100) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const scrollingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollingRef.current) return;

      const currentScrollPos = window.scrollY;
      
      for (const section of sectionIds) {
        const element = document.getElementById(section);
        
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + currentScrollPos;
          const isVisible = 
            elementTop <= currentScrollPos + window.innerHeight * 0.3 &&
            elementTop + element.offsetHeight - offset > currentScrollPos;
            
          if (isVisible) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, offset]);

  const scrollToSection = (sectionId: string) => {
    scrollingRef.current = true;
    const element = document.getElementById(sectionId);
    
    if (element) {
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth"
      });
      
      // Allow scrollspy to resume after animation
      setTimeout(() => {
        scrollingRef.current = false;
        setActiveSection(sectionId);
      }, 500);
    }
  };

  return { activeSection, scrollToSection };
};
