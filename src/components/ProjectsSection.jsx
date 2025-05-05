import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Github, ExternalLink, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { features } from "process";
import  VariableProximity  from "./animations/VariableProximity";
// ...imports remain the same
import './animations/project.css'; // Import your CSS file for animations

const PROJECTS = [
  {
    id: "project1",
    title: "E-Commerce Platform- Apni Dukan",
    description:
      "A full-featured online store with cart, payment processing, and admin dashboard.",
    image: "https://i.postimg.cc/wjPHNCSm/image.png",
    longDescription:
      "A comprehensive e-commerce platform built with React, Node.js, and MongoDB. Features include product catalog, cart management, secure payment processing, order tracking, and an admin dashboard for inventory management.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    links: {
      github: "https://github.com/ishant37/My-Shop",
      demo: "https://my-shop-chi-mocha.vercel.app/",
    },
    features: [
      "User authentication and profiles",
      "Product search and filtering",
      "Shopping cart and wishlist",
      "Payment processing with Stripe",
      "Order history and tracking",
      "Admin dashboard for inventory management",
    ],
  },
  {
    id: "project2",
    title: "Task Management App",
    description:
      "TextForm is basically used to copy, Uppercase and lowercase any text which you can paste at another place.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000",
    longDescription:
      "A productivity tool inspired by Trello and Asana, built with React, Redux, and Firebase. Users can create boards, add tasks with details, set due dates, assign team members, and track progress through customizable workflows.",
    tags: ["React", "Redux", "Tailwind", "CSS"],
    links: {
      github: "https://github.com/ishant37/Textform",
      demo: "https://textform.vercel.app/textform",
    },
    features: [
      "Drag-and-drop interface for task management",
      "Custom board and column creation",
      "Task attachments and comments",
      "Team member assignment",
      "Due dates and reminders",
      "Activity tracking and notifications",
    ],
  },
  {
    id: "project3",
    title: "My personal GYM",
    description:
      "A mobile-first fitness app for tracking workouts, nutrition, and progress.",
    image: "https://i.postimg.cc/FKt8NNMD/image.png",
    longDescription:
      "A comprehensive fitness application built with React Native and a Node.js backend. The app enables users to track workouts, monitor nutrition intake, set fitness goals, visualize progress with charts, and connect with fitness communities.",
    tags: ["React", "Tailwind", "CSS"],
    links: {
      github: "https://github.com/ishant37/Gym-site",
      demo: "https://gym-site-beta.vercel.app/",
    },
    features: [
      "Workout logging and routines",
      "Nutrition tracking and meal planning",
      "Progress visualization with charts",
      "Goal setting and achievements",
      "Social features and challenges",
      "Integration with fitness wearables",
    ],
  },
  {
    id: "project4",
    title: "Weather Dashboard",
    description:
      "Real-time weather forecasting with interactive maps and alerts.",
    image: "https://i.postimg.cc/Y9H5fM8h/image.png",
    longDescription:
      "A weather application that provides real-time forecasts, interactive maps, and weather alerts. Built with React and integrating multiple weather APIs, it delivers accurate weather data with a clean, intuitive interface.",
    tags: ["React", "Weather API", "Chart.js", "Mapbox"],
    links: {
      github: "https://github.com/ishant37/weather-app",
      demo: "https://weather-app-git-main-ishant37s-projects.vercel.app/",
    },
    features: [
      "Real-time weather updates",
      "5-day forecasting",
      "Interactive weather maps",
      "Location-based services",
    ],
  },
  {
    id: "project5",
    title: "Job-Junction",
    description: "A job portal for job seekers and employers to connect.",
    image: "https://i.postimg.cc/3xqYc0rJ/image.png",
    longDescription:
      "A comprehensive job portal that connects job seekers with potential employers. Built with React and Node.js, it features job listings, resume uploads, application tracking, and employer profiles.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    links: {
      github: "https://github.com/ishant37/job-junction",
      demo: "https://job-junction-frontend.vercel.app/",
    },
    features: [
      "Job listings and search",
      "Resume upload and management",
      "Application tracking system",
      "Employer profiles and reviews",
      "Email notifications for job matches",
    ],
  },
  {
    id: "project6",
    title: "Student Management System",
    description:
      "A Python application for managing student records, grades, and attendance.",
    image: "https://i.postimg.cc/0QyFj34R/student-mgmt.png", // Replaced link for reliability
    longDescription:
      "A Python-based student-grade-management system that allows schools to manage student records, grades, and attendance. The application features a user-friendly interface for teachers and administrators to add, update, and view student information.",
    tags: ["Python", "Tkinter", "SQLite"],
    links: {
      github: "https://github.com/ishant37/student-grade-management",
      demo: "", // optional: add a live link or leave empty
    },
    features: [
      "Student record management",
      "Grade tracking and reporting",
      "Attendance tracking",
    ],
  },
];

// Your existing ProjectCard, ProjectDetail, and ProjectsSection components stay the same.
// Just be sure to update the `PROJECTS` array in your file with the updated version above.


const ProjectCard = ({ project, onClick }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  return (
    <div
    ref={ref}
    className={`glass-card rounded-xl p-6 card-hover ${
      isVisible ? "opacity-100" : "opacity-0"
    } mb-6 mr-[41px]`} // 👈 Add this
    onClick={onClick}
  >
  
      <div className="h-48 overflow-hidden relative rounded-t-lg mx-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-1/2 h-full object-cover transition-transform duration-500 hover:scale-110 mx-4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <h3 className="text-white text-xl font-bold">{project.title}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectDetail = ({ project }) => {
  return (
    <div className="overflow-y-auto max-h-[80vh] p-6">
      <div className="h-64 overflow-hidden rounded-t-lg mb-3">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {project.longDescription}
        </p>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Key Features</h4>
          <ul className="list-disc pl-5 space-y-1">
            {project.features.map((feature, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-300">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          {project.links.github && (
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              asChild
            >
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} />
                <span>View Code</span>
              </a>
            </Button>
          )}

          {project.links.demo && (
            <Button
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700"
              asChild
            >
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};


const ProjectsSection = () => {
  const [sectionRef, isSectionVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = showAllProjects ? PROJECTS : PROJECTS.slice(0, 4);

  const toggleProjects = () => {
    setShowAllProjects((prev) => !prev);
    setTimeout(() => {
      const section = document.getElementById("projects");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900/30 relative"
    >
      <div className="container mx-auto max-w-6xl">
        <div
          className={`text-center mb-16 ${
            isSectionVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          {/* ✨ VariableProximity magic here! */}
          <VariableProximity
            label="Featured Projects"
            className="text-3xl md:text-4xl font-bold gradient-heading mb-4"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={sectionRef}
            radius={120}
            falloff="linear"
          />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mt-6 mx-auto">
            A selection of my recent work, personal projects and client
            collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6 lg:px-8 py-6">
  {visibleProjects.map((project) => (
    <ProjectCard
      key={project.id}
      project={project}
      onClick={() => setSelectedProject(project)}
    />
  ))}
</div>


        <div className="mt-20 text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full mt-3 p-6 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/30 font-medium px-6"
            onClick={toggleProjects}
          >
            <Code className="mr-5 h-5 w-5" />
            {showAllProjects ? "Show Less" : "View All Projects"}
          </Button>
        </div>
      </div>

      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-w-2xl p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-2xl font-bold">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <ProjectDetail
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;


