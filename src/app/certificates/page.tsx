"use client";

import { Metadata } from "next";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiAward, FiExternalLink } from "react-icons/fi";

export default function Certificates() {
  const certificates = [
    {
      id: 1,
      title: "Azure AI Fundamentals",
      organization: "Microsoft & Talenta AI Indonesia",
      date: "2024",
      description: "Foundational knowledge of machine learning and AI in the cloud",
      image: "/images/sertif3.jpeg",
      link: "https://talentaid.biji-biji.com/storage/certificates/Certificate_156779_37_7n1y7.pdf?sv=2019-07-07&sr=b&sig=%2FsUJbDnqXYoHmfESJ7a43sfiC4YUGYx41uEXsoomJdw%3D&se=2024-08-24T05%3A39%3A05Z&sp=r",
    },
    {
      id: 2,
      title: "Career Essentials in Generative AI",
      organization: "LinkedIn & Microsoft",
      date: "2024",
      description: "Understanding generative AI technology and its applications",
      image: "/images/Sertif1.jpg",
      link: "https://www.linkedin.com/learning/certificates/1c8e5069f7d1c5d6b18880fa6605fbc665c6f95f6e96680f234d42de8d05005f",
    },
    {
      id: 3,
      title: "Gold Medalist – National Science and Language Olympiad (ONSB) 2023",
      organization: "Olimpiade Nasional Sains dan Bahasa (ONSB), under BRANINDOKATOR",
      date: "2023",
      description: "Awarded a Gold Medal (Predikat A+) for outstanding performance in the National Science and Language Olympiad (ONSB) held on January 29, 2023, in East Java, Indonesia.",
      image: "/images/sertif4.jpeg",
      link: "#",
    },
    {
      id: 4,
      title: "What Is Generative AI? – LinkedIn Learning",
      organization: "LinkedIn Learning",
      date: "2024",
      description: "Completed an online course titled \"What Is Generative AI?\" from LinkedIn Learning, which explored the fundamentals of Generative Artificial Intelligence, including its applications, tools, and ethical considerations.",
      image: "/images/Sertif2.jpg",
      link: "#",
    },
  ];

  // Helper function to check if string is a valid image path
  const isValidImagePath = (path: string | undefined): boolean => {
    if (!path) return false;
    return path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png');
  };

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
            I&apos;m always looking to expand my skills and knowledge!
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
                  <span className="bg-gray-100 dark:bg-dark-bg-light text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                    {certificate.date}
                  </span>
                </div>
                <p className="text-sm text-primary mb-2 font-medium">
                  {certificate.organization}
                </p>
                <p className="text-foreground/70 mb-4">
                  {certificate.description}
                </p>
                <div className="h-60 rounded-lg flex items-center justify-center mb-4 overflow-hidden relative bg-gradient-to-r from-primary/10 to-secondary/10">
                  {isValidImagePath(certificate.image) ? (
                    <Image
                      src={certificate.image}
                      alt={certificate.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-foreground/60 mb-2">
                        Certificate Preview
                      </p>
                      <p className="text-xs">
                        (Upload your certificate images later)
                      </p>
                    </div>
                  )}
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

        {certificates.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-xl text-foreground/70">I&apos;m currently working on adding my certificates here...</p>
          </div>
        )}
      </div>
    </div>
  );
} 