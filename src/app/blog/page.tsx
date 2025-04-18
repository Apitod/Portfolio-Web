"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiCalendar, FiTag, FiArrowRight } from "react-icons/fi";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with AI Development",
      excerpt:
        "Exploring the fundamentals of artificial intelligence and how to begin your journey as an AI developer.",
      date: "April 15, 2024",
      category: "AI",
      readTime: "5 min read",
      slug: "getting-started-with-ai",
    },
    {
      id: 2,
      title: "The Power of Python in Data Science",
      excerpt:
        "How Python has become the go-to language for data scientists and why you should learn it too.",
      date: "March 28, 2024",
      category: "Programming",
      readTime: "7 min read",
      slug: "python-in-data-science",
    },
    {
      id: 3,
      title: "My First Semester as a CS Student",
      excerpt:
        "Reflections on challenges, achievements, and lessons learned during my first semester of university.",
      date: "February 10, 2024",
      category: "Personal",
      readTime: "4 min read",
      slug: "first-semester-reflections",
    },
    {
      id: 4,
      title: "Building a Portfolio Website with Next.js",
      excerpt:
        "A step-by-step guide on creating a modern, responsive portfolio website using Next.js and Tailwind CSS.",
      date: "January 22, 2024",
      category: "Web Development",
      readTime: "8 min read",
      slug: "portfolio-with-nextjs",
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
      case "ai":
        return "bg-primary/10 text-primary";
      case "programming":
        return "bg-secondary/10 text-secondary";
      case "web development":
        return "bg-accent/10 text-accent";
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
            My Blog
          </h1>
          <p className="text-lg text-foreground/80">
            Thoughts, tutorials, and insights about technology, development, and my learning journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="mb-10 p-6 bg-background dark:bg-dark-bg rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center mb-3 space-x-3">
                <span className="text-sm text-foreground/60 flex items-center">
                  <FiCalendar className="mr-1 w-3 h-3" />
                  {post.date}
                </span>
                <span className="text-sm text-foreground/60">•</span>
                <span className="text-sm text-foreground/60">{post.readTime}</span>
                <span className="text-sm text-foreground/60">•</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                    post.category
                  )}`}
                >
                  <FiTag className="inline mr-1 w-3 h-3" />
                  {post.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-foreground/70 mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-primary hover:text-primary-dark transition-colors inline-flex items-center font-medium"
              >
                Read more
                <FiArrowRight className="ml-2 w-4 h-4" />
              </Link>
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
            This blog is where I share my knowledge, experiences, and thoughts.
            Check back regularly for new content!
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
      </div>
    </div>
  );
} 