"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiCalendar, FiTag, FiArrowRight, FiExternalLink } from "react-icons/fi";

export default function Activity() {
  const activities = [
    {
      id: 1,
      title: "Google Developer Student Club Workshop",
      excerpt:
        "Participated as a Student in a workshop about AI Kotlin Fundamentals for beginners.",
      date: "February 25, 2025",
      category: "Workshop",
      location: "NutriHub Makassar",
      image: "/images/Workshop.jpg",
      slug: "gdsc-ai-workshop",
    },
    {
      id: 2,
      title: "Google Developer Group DevFest",
      excerpt:
        "Attended a Google Developer Group DevFest event, where I learned about the latest trends in technology and the future of the industry.",
      date: "November 12, 2024",
      category: "Event",
      location: "Ciputra University Makassar",
      image: "/images/devfest.jpg",
      slug: "event-devfest",
    },
    {
      id: 3,
      title: "Information Systems Student Association (KampoenkSisfo2024)",
      excerpt:
        "Becoming a Cadre of Information Systems Student Association (KampoenkSisfo2024).",
      date: "February 10, 2024",
      category: "Organization",
      location: "UINAM Campus",
      image: "/images/pengkaderan.jpg",
      slug: "tech-exhibition",
    },
    {
      id: 4,
      title: "Animation Workshop",
      excerpt:
        "Creating a short animation using After Effects and Adobe Illustrator.",
      date: "July 22, 2024",
      category: "Education",
      location: "Online",
      image: "/images/activity-4.jpg",
      slug: "web-bootcamp-completion",
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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "workshop":
        return "bg-primary/10 text-primary";
      case "competition":
        return "bg-secondary/10 text-secondary";
      case "organization":
        return "bg-accent/10 text-accent";
      case "education":
        return "bg-green-500/10 text-green-500";
      default:
        return "bg-gray-100 dark:bg-dark-bg-light text-foreground/70";
    }
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
            My Activities
          </h1>
          <p className="text-lg text-foreground/80">
            Events, competitions, and educational experiences that have shaped my learning journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {activities.map((activity) => (
            <motion.article
              key={activity.id}
              variants={itemVariants}
              className="mb-10 overflow-hidden bg-background dark:bg-dark-bg rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800"
            >
              <div className="md:flex">
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-3xl">🏆</span>
                  </div>
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex flex-wrap items-center mb-3 gap-2">
                    <span className="text-sm text-foreground/60 flex items-center">
                      <FiCalendar className="mr-1 w-3 h-3" />
                      {activity.date}
                    </span>
                    <span className="text-sm text-foreground/60">•</span>
                    <span className="text-sm text-foreground/60 flex items-center">
                      <FiExternalLink className="mr-1 w-3 h-3" />
                      {activity.location}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                        activity.category
                      )}`}
                    >
                      <FiTag className="inline mr-1 w-3 h-3" />
                      {activity.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                    <Link href={`/activity/${activity.slug}`}>{activity.title}</Link>
                  </h2>
                  <p className="text-foreground/70 mb-4">{activity.excerpt}</p>
                  <Link
                    href={`/activity/${activity.slug}`}
                    className="text-primary hover:text-primary-dark transition-colors inline-flex items-center font-medium"
                  >
                    Read more
                    <FiArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-foreground/70 mb-4">
            These activities represent my ongoing commitment to learning and growth.
            Stay tuned for more updates on my journey!
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
      </div>
    </div>
  );
} 