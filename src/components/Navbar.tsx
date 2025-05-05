
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

interface NavItem {
  name: string;
  href: string;
}

interface NavbarProps {
  activeSection: string | null;
  onNavClick: (section: string) => void;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "hero" },
  { name: "Skills", href: "skills" },
  { name: "Projects", href: "projects" },
  { name: "Certificates", href: "certificates" },
  { name: "Contact", href: "contact" },
];

const Navbar = ({ activeSection, onNavClick }: NavbarProps) => {
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

  const handleNavClick = (href: string) => {
    onNavClick(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent py-5"
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
                  : "text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
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
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.name}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.href
                    ? "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-gray-800"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
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
  );
};

export default Navbar;
