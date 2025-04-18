import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
};

module.exports = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/Portfolio-Web' : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
