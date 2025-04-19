import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true,
  },
};

module.exports = {
  output: 'export',
  // Remove basePath for local development, add it only during production build for GitHub Pages
  basePath: '',
  images: {
    unoptimized: true,
  },
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true,
  },
}

export default nextConfig;
