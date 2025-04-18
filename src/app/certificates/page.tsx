"use client";

import { motion } from "framer-motion";
import { FiAward, FiExternalLink } from "react-icons/fi";

export default function Certificates() {
  const certificates = [
    {
      id: 1,
      title: "Azure AI Fundamentals",
      organization: "Microsoft",
      date: "2024",
      description: "Foundational knowledge of machine learning and AI in the cloud",
      image: "/certificate-placeholder-1.jpg",
      link: "#", // Will be replaced later
    },
    {
      id: 2,
      title: "Career Essentials in Generative AI",
      organization: "LinkedIn & Microsoft",
      date: "2024",
      description: "Understanding generative AI technology and its applications",
      image: "/certificate-placeholder-2.jpg",
      link: "#", // Will be replaced later
    },
    {
      id: 3,
      title: "Python for Data Science",
      organization: "DataCamp",
      date: "2023",
      description: "Python programming skills for data analysis and visualization",
      image: "/certificate-placeholder-3.jpg",
      link: "#", // Will be replaced later
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      organization: "Udemy",
      date: "2023",
      description: "Full-stack web development with modern frameworks",
      image: "/certificate-placeholder-4.jpg",
      link: "#", // Will be replaced later
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Certificates
          </h1>
          <p className="text-lg text-foreground/80">
            A collection of certifications that reflect my continuous learning journey.
            I'm always looking to expand my skills and knowledge!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {certificates.map((certificate) => (
            <motion.div
              key={certificate.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-background dark:bg-dark-bg rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <FiAward className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-bold">{certificate.title}</h3>
                  </div>
                  <span className="bg-gray-100 dark:bg-dark-bg-light px-2 py-1 rounded-full text-xs">
                    {certificate.date}
                  </span>
                </div>
                <p className="text-sm text-primary mb-2 font-medium">
                  {certificate.organization}
                </p>
                <p className="text-foreground/70 mb-4">
                  {certificate.description}
                </p>
                <div className="h-40 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <p className="text-sm text-foreground/60 mb-2">
                      Certificate Preview
                    </p>
                    <p className="text-xs">
                      (Upload your certificate images later)
                    </p>
                  </div>
                </div>
                <a
                  href={certificate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:text-primary-dark transition-colors"
                >
                  <span className="mr-2 text-sm font-medium">
                    View Certificate
                  </span>
                  <FiExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-foreground/70 italic">
            More certificates will be added as I continue my learning journey!
          </p>
        </motion.div>
      </div>
    </div>
  );
} 