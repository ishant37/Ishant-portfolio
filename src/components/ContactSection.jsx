import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ClickSpark from "./ClickSpark";
import  StarBorder  from "./animations/StarBorder";
import {
  Github,
  Linkedin,
  Send,
  Mail,
  MapPin,
  Phone,
  Instagram,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactSection = () => {
  const [sectionRef, isSectionVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataForSubmission = new FormData();
      formDataForSubmission.append("name", formData.name);
      formDataForSubmission.append("email", formData.email);
      formDataForSubmission.append("message", formData.message);
      formDataForSubmission.append("access_key", "b38a8cbd-6ecc-425d-a0f6-60bd6ddccf0a"); // Replace with your actual access key

      const object = Object.fromEntries(formDataForSubmission);
      const json = JSON.stringify(object);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(res.message || "Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <section
        id="contact"
        ref={sectionRef}
        className="py-20 px-4 bg-gray-50 dark:bg-gray-900/30"
      >
        <div className="container mx-auto max-w-6xl">
          <StarBorder
            as="div"
            className="absolute inset-0 z-0" // Ensure it is positioned correctly
            color="cyan"
            speed="5s"
          />
          <div
            className={`text-center mb-16 ${
              isSectionVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
                       <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div
              className={`${
                isSectionVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: "200ms" }}
            >
              <div className="glass-card rounded-xl p-6 md:p-8 h-full relative z-10">
                <h3 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6 mb-8">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <a
                        href="mailto:singhishant37@gmail.com"
                        className="text-purple-700 dark:text-purple-400 hover:underline"
                      >
                        singhishant37@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Location
                      </p>
                      <p>Jaipur, Rajasthan</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Phone
                      </p>
                      <a
                        href="tel:+916367690519"
                        className="text-purple-700 dark:text-purple-400 hover:underline"
                      >
                        +91 6367690519
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">Follow Me</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/ishant37"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ishaant-singh-288b70291/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="https://www.instagram.com/__ishant05/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${
                isSectionVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: "400ms" }}
            >
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-xl p-6 md:p-8 relative z-10"
              >
                <h3 className="text-2xl font-semibold mb-6">
                  Send a Message
                </h3>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      rows={5}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </ClickSpark>
  );
};

export default ContactSection;
