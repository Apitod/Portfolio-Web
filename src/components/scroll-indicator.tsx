"use client";

import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide the indicator after scrolling down a bit
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    // Get the height of the viewport
    const viewportHeight = window.innerHeight;
    
    // Scroll down one viewport height
    window.scrollTo({
      top: viewportHeight,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      className="scroll-indicator cursor-pointer"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <div className="scroll-indicator-text">Scroll</div>
      <FiChevronDown className="scroll-indicator-arrow text-primary" />
    </motion.div>
  );
};

export default ScrollIndicator; 