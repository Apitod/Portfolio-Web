"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FiGithub className="w-5 h-5" />,
      href: "https://github.com/",
      label: "GitHub",
    },
    {
      icon: <FiLinkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/razan-muhammad-dhirgham-aswani",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      href: "https://instagram.com/razannmd",
      label: "Instagram",
    },
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      href: "https://wa.me/0895326458650",
      label: "WhatsApp",
    },
    {
      icon: <FiMail className="w-5 h-5" />,
      href: "mailto:razandirgham@gmail.com",
      label: "Email",
    },
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-background dark:bg-dark-bg border-t border-gray-200 dark:border-gray-800 py-8"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-xl font-semibold mb-2 text-center md:text-left">
              <span className="text-primary">RazanMDA</span>
            </div>
            <p className="text-sm text-foreground/70">
              © {currentYear} Razan. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center space-x-4 mb-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover="hover"
                  variants={itemVariants}
                  className="text-foreground/70 hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <div className="text-xs text-foreground/50">
              Designed by Razan
            </div>
          </div>
        </div>
        
        {/* Footer divider with shadow */}
        <div className="my-6">
          <motion.div 
            className="footer-divider"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </div>
        
        <div className="text-center text-xs text-foreground/50 pt-2">
          <p>&quot;It always seems impossible until it&apos;s done.&quot;</p>
          <p>- Nelson Mandela</p>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer; 