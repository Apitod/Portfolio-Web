import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3B75B4", // lighter deep blue
          DEFAULT: "#27548A", // deep blue
          dark: "#1D3F69", // darker deep blue
        },
        secondary: {
          light: "#224A63", // lighter teal/navy
          DEFAULT: "#183B4E", // dark teal/navy
          dark: "#102A38", // darker teal/navy
        },
        accent: {
          light: "#E5BB7B", // lighter golden yellow
          DEFAULT: "#DDA853", // golden yellow
          dark: "#C69240", // darker golden yellow
        },
        background: {
          light: "#FFFFFF",
          DEFAULT: "#F5EEDC", // light beige
          dark: "#183B4E", // dark teal/navy
        },
        foreground: {
          light: "#4a4a4a",
          DEFAULT: "#333333",
          dark: "#F5EEDC", // light beige for dark mode text
        },
        "dark-bg": {
          light: "#224A63", // lighter teal/navy
          DEFAULT: "#183B4E", // dark teal/navy
          dark: "#102A38", // darker teal/navy
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        fadeIn: "fadeIn 1s ease-in-out",
        slideUp: "slideUp 0.5s ease-out",
        slideRight: "slideRight 0.5s ease-out",
        bounce: "bounce 1.5s infinite",
        morph: "morph 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "25%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "50%": { borderRadius: "40% 60% 50% 50% / 40% 40% 60% 60%" },
          "75%": { borderRadius: "60% 40% 30% 70% / 40% 70% 30% 60%" },
        },
      },
    },
  },
  plugins: [],
};

export default config; 