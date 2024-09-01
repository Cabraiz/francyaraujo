// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",  // This enables static exports, which GitHub Pages requires.
    basePath: "/francyaraujo",  // Replace with your repository name.
    assetPrefix: "/francyaraujo/", // Ensures static assets are correctly referenced.
    images: {
      unoptimized: true,  // Disables server-based image optimization.
    },
  };
  
  module.exports = nextConfig;
  