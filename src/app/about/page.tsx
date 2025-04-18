"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiMusic, FiCode, FiAward, FiBookOpen, FiCpu, FiGithub } from "react-icons/fi";

export default function About() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const interestItems = [
    {
      icon: <FiMusic className="w-6 h-6 text-primary" />,
      title: "Piano",
      description: "Classical music enthusiast & casual pianist",
    },
    {
      icon: <FiCode className="w-6 h-6 text-primary" />,
      title: "Programming",
      description: "Coding is both my profession and hobby",
    },
    {
      icon: <FiCpu className="w-6 h-6 text-primary" />,
      title: "AI & ML",
      description: "Exploring the frontiers of artificial intelligence",
    },
    {
      icon: "🏋️‍♂️",
      title: "Gym",
      description: "Staying fit and maintaining a healthy lifestyle",
    },
  ];

  const achievementItems = [
    {
      icon: <FiAward className="w-6 h-6 text-accent" />,
      title: "Perfect GPA",
      description: "4.00/4.00 in my first semester",
    },
    {
      icon: <FiGithub className="w-6 h-6 text-accent" />,
      title: "Google Developer Group",
      description: "Active campus member",
    },
    {
      icon: <FiBookOpen className="w-6 h-6 text-accent" />,
      title: "AI Certifications",
      description: "Azure AI & Microsoft certified",
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-lg text-foreground/80">
            Get to know the person behind the code ✨
          </p>
        </motion.div>

        {/* Bio Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-2/5 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/20 relative">
                <Image src="/images/Razan2.jpg" alt="Razan" fill className="object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-secondary/40 flex items-center justify-center text-7xl font-bold">
                  <Image src="/images/Razan2.jpg" alt="Razan" fill className="object-cover"/>
                </div>
              </div>
              
              <motion.div
                className="absolute -bottom-5 -right-5 bg-background dark:bg-dark-bg px-4 py-2 rounded-full shadow-lg border border-gray-100 dark:border-gray-800"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <span className="text-lg font-semibold">4.00 GPA 🎓</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-3/5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">Hey there! 👋</h2>
              <div className="space-y-4 text-lg">
                <p>
                  I'm Razan, a passionate Information Systems student at Universitas Islam Negeri Alauddin Makassar with a knack for building cool digital stuff!
                </p>
                <p>
                  When I'm not coding or playing piano, you can find me at the gym or diving into the latest AI research. I love creating things that are both functional and fun!
                </p>
                <p>
                  Currently, I'm exploring the fascinating world of artificial intelligence, developing Python-based applications, and working on creative web development projects.
                </p>
                <p className="font-medium text-primary">
                  I'm a fast learner who's always eager to take on new challenges and push my creative boundaries.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Interests Section */}
        <motion.div
          className="max-w-5xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Things I Love</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interestItems.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-background dark:bg-dark-bg p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievementItems.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-background dark:bg-dark-bg p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 