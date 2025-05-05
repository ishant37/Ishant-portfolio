
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { 
  Code, 
  LayoutGrid, 
  Database, 
  Server, 
  Layers, 
  Palette
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  technologies: string[];
}

const SKILLS: Skill[] = [
  {
    name: "Frontend Development",
    icon: <LayoutGrid className="h-8 w-8" />,
    level: 90,
    technologies: ["React","HTML", "Tailwind CSS"]
  },
  {
    name: "Backend Development",
    icon: <Server className="h-8 w-8" />,
    level: 85,
    technologies: ["Node.js", "Express"]
  },
  {
    name: "Databases",
    icon: <Database className="h-8 w-7" />,
    level: 80,
    technologies: ["MongoDB", "PostgreSQL", "MySQL"]
  },
  {
    name: "Programming Languages",
    icon: <Code className="h-8 w-8" />,
    level: 90,
    technologies: ["JavaScript", "Python", "Java","C","C++"]
  },
  {
    name: "DevOps",
    icon: <Layers className="h-8 w-8" />,
    level: 70,
    technologies: ["Docker", "AWS", "GitHub Actions", "CI/CD"]
  },
  {
    name: "DSA",
    icon: <Palette className="h-8 w-8" />,
    level: 75,
    technologies: ["C++","Python"]
  }
];

const SkillCard = ({ skill, index }: { skill: Skill, index: number }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(skill.level);
      }, 300 + index * 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.level, index]);

  return (
    <div 
      ref={ref}
      className={`glass-card rounded-xxl p-6 card-hover ${
        isVisible 
          ? 'animate-fade-in' 
          : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
          {skill.icon}
        </div>
        <h3 className="text-xl font-semibold">{skill.name}</h3>
      </div>
      
      <div className="mt-3">
        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
            style={{ width: `${progress}%`, transition: 'width 1s ease-in-out' }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Proficiency</span>
          <span>{skill.level}%</span>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {skill.technologies.map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 text-sm bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 ${isSectionVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">Skills & Expertise</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My technical skills and areas of expertise that I've developed over the years.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
