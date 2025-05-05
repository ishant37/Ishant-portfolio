
// import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="gradient-heading font-bold text-lg">Portfolio</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>© {currentYear} Made By Ishaant using React & Tailwind</span>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400">
              Privacy Policy
            </a>
            <span className="mx-2">•</span>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
