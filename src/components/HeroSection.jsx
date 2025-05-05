import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import BlurText from "./BlurText"; // Import the BlurText component
// import Particles from "./Particles"; // Import the Particles component
import "./HeroBackground.css";
import Particles from "./animations/Particles"; // Import the Particles component;
import RotatingText from "./animations/RotatingText"; // Import the RotatingText component
// import {matter} from "./animations/matter"'
const HeroSection = () => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  return (
    <section
      id="hero"
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center hero-background px-4 pt-16 overflow-hidden white dark:bg-opacity-10 bg-cover bg-center relative"
    >
      {/* --- Particles Background --- */}
      <div className="absolute inset-0 -z-10">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* --- Background Blur Effects --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-purple-300/30 dark:bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-light"></div>
        <div
          className="absolute bottom-10 left-[15%] w-64 h-64 bg-blue-300/20 dark:bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-light"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* --- Main Content --- */}
      <div className="container mx-auto text-center relative z-10 max-w-4xl">
        <div
          className={`space-y-6 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="w-full flex justify-center">
            <h1 className="text-4xl md:text-6xl font-bold gradient-heading mb-3 text-center">
              <BlurText text="Hello, I'm Ishaant" className="text-purple-700 dark:text-purple-400" />
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          <RotatingText
  texts={['Fullstack-Developer', 'Designer', 'Creator']}
  mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
  staggerFrom={"last"}
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "-120%" }}
  staggerDuration={0.025}
  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
  transition={{ type: "spring", damping: 30, stiffness: 400 }}
  rotationInterval={2000}
/>
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            I build beautiful, responsive web applications with modern technologies.
            Passionate about creating intuitive user experiences and clean, efficient code.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              variant="primary"
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium"
              onClick={() => {
                const link = document.createElement("a");
                link.href =
                  "https://drive.google.com/file/d/1ujHvBV4o6BEacOkQdBn7Q-w4jOSQKuuv/view?usp=sharing";
                link.innerText = "Resume";
                link.download = "";
                link.click();
              }}
            >
              <Download className="mr-0 h-5 w-5" />
              Resume
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-purple-200 mx-2 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/30 font-medium py-3"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Contact Me
            </Button>
          </div>
        </div>

        {/* --- Scroll Down Button --- */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <button
            onClick={() => {
              const skillsSection = document.getElementById("skills");
              if (skillsSection) {
                skillsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="animate-float text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
