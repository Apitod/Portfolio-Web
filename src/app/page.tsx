"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCode, FiActivity, FiServer } from "react-icons/fi";
import ScrollIndicator from "@/components/scroll-indicator";

export default function Home() {
  const floatingIcons = [
    { icon: <FiCode className="text-primary" />, top: "10%", left: "10%" },
    { icon: <FiActivity className="text-secondary" />, top: "20%", left: "85%" },
    { icon: <FiServer className="text-accent" />, top: "70%", left: "15%" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden h-screen flex items-center">
        {/* Floating Elements */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute z-0 text-3xl opacity-25"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.25,
              y: [0, -10, 0],
              transition: {
                y: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: index * 0.5,
                },
                opacity: { duration: 1 },
              },
            }}
            style={{
              top: item.top,
              left: item.left,
            }}
          >
            {item.icon}
          </motion.div>
        ))}

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              >
                Hello, I&apos;m Razan
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg md:text-xl text-foreground/80 mb-6"
              >
                An aspiring AI developer and student passionate about creating
                engaging digital experiences. I blend creativity with technical skills
                to build fun and interactive projects.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-medium transition-all transform hover:scale-105"
                >
                  View Projects
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-background dark:bg-dark-bg border border-primary text-primary font-medium hover:bg-primary/10 transition-all transform hover:scale-105"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full md:w-1/2 flex justify-center"
            >
              {/* Hero Image/Animation */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full animate-float"></div>
                <div className="absolute -inset-5 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full animate-morph"></div>
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  {/* Fallback styling in case image doesn't load */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary to-accent text-white text-6xl font-bold">
                    R
                  </div>
                  <Image 
                    src="/images/Razan3.jpg" 
                    alt="Razan's photo" 
                    fill 
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 288px, 384px"
                    onError={(e) => {
                      // Keep the fallback visible if image fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Featured Skills Section */}
      <section className="py-16 bg-gradient-to-b from-background to-background/50 dark:from-dark-bg dark:to-dark-bg/80">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">What I Do</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              I combine technical skills with creativity to build engaging
              digital experiences and solve complex problems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Development",
                description:
                  "Creating intelligent systems that can learn, adapt, and solve complex problems.",
                icon: "🤖",
              },
              {
                title: "Web Development",
                description:
                  "Building responsive, accessible, and beautiful web experiences with modern technologies.",
                icon: "🌐",
              },
              {
                title: "Creative Coding",
                description:
                  "Combining code with creative thinking to make unique interactive digital art and animations.",
                icon: "✨",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-background dark:bg-dark-bg p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Let&apos;s Create Something Amazing Together</h2>
            <p className="text-foreground/70 mb-8">
              I'm always open to new projects and collaborations. Reach out and let's discuss how we can bring your ideas to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium transition-all transform hover:scale-105 hover:shadow-lg"
            >
              Get in Touch
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
