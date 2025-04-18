"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const circleVariants = {
    initial: { scale: 0 },
    animate: (i: number) => ({
      scale: [0, 1.2, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: i * 0.2,
      },
    }),
  };

  const letterVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.1 + 0.5,
      },
    }),
  };

  if (!isLoading) {
    return null;
  }

  return (
    <div className={`loading-screen ${!isLoading ? "loaded" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="flex space-x-3 mb-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={circleVariants}
              initial="initial"
              animate="animate"
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: 
                  i % 3 === 0 
                    ? "var(--primary)" 
                    : i % 3 === 1 
                      ? "var(--secondary)" 
                      : "var(--accent)",
              }}
            />
          ))}
        </div>
        <div className="flex">
          {"Hello!".split("").map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="initial"
              animate="animate"
              className="text-3xl font-bold"
              style={{
                color: i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "var(--secondary)" : "var(--accent)",
                marginRight: "0.1em"
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.7, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-3 h-0.5 w-24 bg-gradient-to-r from-primary via-secondary to-accent"
        />
      </motion.div>
    </div>
  );
};

export default LoadingScreen; 