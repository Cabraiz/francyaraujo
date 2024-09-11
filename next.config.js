/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/francyaraujo' : '',
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true, // Porque estamos gerando o build estaticamente
  }
};

module.exports = nextConfig;
