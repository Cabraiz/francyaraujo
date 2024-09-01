// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",  // Enables static exports, which GitHub Pages requires.
  basePath: "/francyaraujo",  // Replace with your repository name.
  assetPrefix: "/francyaraujo/", // Ensures static assets are correctly referenced.
  images: {
    unoptimized: true,  // Disables server-based image optimization.
  },
  images: {
    loader: "akamai",  // Use Akamai image loader for static exports.
    path: "",  // Ensures image paths are relative.
  },
};

module.exports = nextConfig;
