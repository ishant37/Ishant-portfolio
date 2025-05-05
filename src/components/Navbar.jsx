import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
// import "index.css";

const NAV_ITEMS = [
  { name: "Home", href: "hero" },
  { name: "Skills", href: "skills" },
  { name: "Projects", href: "projects" },
  { name: "Certificates", href: "certificates" },
  { name: "Contact", href: "contact" },
];

const Navbar = ({ activeSection, onNavClick }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (href) => {
    onNavClick(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative z-50">
      {/* Starry background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="stars-bg"></div>
      </div>

      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/70 backdrop-blur-md py-3 shadow-sm"
            : "bg-black/50 py-5"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <a
            href="#"
            className="text-xl md:text-2xl font-bold gradient-heading"
            onClick={(e) => {
              e.preventDefault();
              onNavClick("hero");
            }}
          >
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.name}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.href
                    ? "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                    : "text-gray-300 hover:text-purple-400 hover:bg-purple-900/10"
                }`}
                onClick={() => handleNavClick(item.href)}
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:bg-gray-800"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black dark:bg-gray-900 shadow-md animate-fade-in">
            <div className="container mx-auto px-4 py-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.name}
                  className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.href
                      ? "text-purple-400 bg-purple-900/30"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
