"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiSend, FiUser, FiMessageSquare } from "react-icons/fi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormState({ name: "", email: "", message: "" });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };

  const socialLinks = [
    {
      icon: <FiGithub className="w-5 h-5" />,
      href: "https://github.com/",
      label: "GitHub",
      color: "hover:bg-gray-800 hover:text-white",
    },
    {
      icon: <FiLinkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/razan-muhammad-dhirgham-aswani",
      label: "LinkedIn",
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      href: "https://instagram.com/razannmd",
      label: "Instagram",
      color: "hover:bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-500 hover:text-white",
    },
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      href: "https://wa.me/0895326458650",
      label: "WhatsApp",
      color: "hover:bg-green-500 hover:text-white",
    },
    {
      icon: <FiMail className="w-5 h-5" />,
      href: "mailto:razandirgham@gmail.com",
      label: "Email",
      color: "hover:bg-primary hover:text-white",
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-lg text-foreground/80">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-background dark:bg-dark-bg rounded-xl shadow-md p-8 border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-foreground/70"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50">
                      <FiUser />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 pl-10 bg-gray-50 dark:bg-dark-bg-light rounded-lg border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-foreground/70"
                  >
                    Your Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50">
                      <FiMail />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 pl-10 bg-gray-50 dark:bg-dark-bg-light rounded-lg border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-foreground/70"
                  >
                    Your Message
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-4 text-foreground/50">
                      <FiMessageSquare />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full p-3 pl-10 bg-gray-50 dark:bg-dark-bg-light rounded-lg border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Hello, I'd like to talk about..."
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-all transform hover:scale-105 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary hover:bg-primary-dark text-white"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      <FiSend className="mr-2" />
                      Send Message
                    </span>
                  )}
                </button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm"
                  >
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm"
                  >
                    There was a problem sending your message. Please try again.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-background dark:bg-dark-bg rounded-xl shadow-md p-8 border border-gray-100 dark:border-gray-800 h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <p className="text-foreground/70">Makassar, Indonesia</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <a
                    href="mailto:razandirgham@gmail.com"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    razandirgham@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Connect With Me</h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className={`p-3 rounded-full border border-gray-200 dark:border-gray-700 transition-all ${link.color}`}
                        aria-label={link.label}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <h3 className="text-lg font-semibold mb-3">Open To</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Freelance Opportunities
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Collaboration Projects
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Internship Positions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Learning Opportunities
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}