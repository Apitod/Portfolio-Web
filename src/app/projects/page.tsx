"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiCode, FiVideo, FiLayout, FiCpu } from "react-icons/fi";
import Link from "next/link";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'web', label: 'Web Development' },
    { id: 'other', label: 'Other' },
  ];

  const projects = [
    {
      id: 1,
      title: "Movie Review App",
      description:
        "A Python-based desktop application for movie reviews, featuring embedded trailer playback and rating system.",
      tags: ["Python", "Tkinter", "SQLite"],
      category: "web",
      image: "/project-placeholder-1.png",
      github: "#",
      demo: "",
      icon: <FiCode className="w-8 h-8 text-primary" />,
    },
    {
      id: 2,
      title: "Image Classification Model",
      description:
        "An AI model built to classify images using machine learning techniques and Python libraries.",
      tags: ["Python", "TensorFlow", "Machine Learning"],
      category: "ai",
      image: "/project-placeholder-2.png", 
      github: "#",
      demo: "",
      icon: <FiCpu className="w-8 h-8 text-secondary" />,
    },
    {
      id: 3,
      title: "Personal Portfolio",
      description:
        "A modern portfolio website built with Next.js, Tailwind CSS, and Framer Motion for smooth animations.",
      tags: ["Next.js", "React", "Tailwind CSS"],
      category: "web",
      image: "/project-placeholder-3.png",
      github: "#",
      demo: "#",
      icon: <FiLayout className="w-8 h-8 text-accent" />,
    },
    {
      id: 4,
      title: "2D Animation Project",
      description:
        "A short animation created during a training program, exploring creative digital storytelling.",
      tags: ["After Effects", "Animation", "Design"],
      category: "other",
      image: "/project-placeholder-4.png",
      github: "",
      demo: "#",
      icon: <FiVideo className="w-8 h-8 text-primary-light" />,
    },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const projectVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-lg text-foreground/80 mb-8">
            Check out some of my recent work — from AI models to web applications.
            Each project is a piece of my journey as a developer!
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-dark-bg-light hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              whileHover="hover"
              className="bg-background dark:bg-dark-bg rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 flex flex-col h-full"
            >
              <div className="relative h-48 bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
                {project.icon}
                <div className="absolute top-4 right-4 flex space-x-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background/80 dark:bg-dark-bg/80 p-2 rounded-full hover:bg-background dark:hover:bg-dark-bg transition-all"
                      aria-label="View GitHub Repository"
                    >
                      <FiGithub className="w-4 h-4" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background/80 dark:bg-dark-bg/80 p-2 rounded-full hover:bg-background dark:hover:bg-dark-bg transition-all"
                      aria-label="View Live Demo"
                    >
                      <FiExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-foreground/70 mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-dark-bg-light text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <p className="text-lg text-foreground/70">
              No projects found in this category yet. Check back soon!
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-foreground/70 mb-6">
            Interested in working together? I&apos;m always open to new projects and collaborations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white transition-all transform hover:scale-105"
          >
            Let&apos;s Talk
            <FiExternalLink className="ml-2" />
          </Link>
        </motion.div>

        <div className="py-16 text-center">
          <p className="text-xl text-foreground/70">I&apos;m currently working on adding more projects here...</p>
        </div>
      </div>
    </div>
  );
} 