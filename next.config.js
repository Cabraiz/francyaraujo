/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  basePath: isProd ? '/francyaraujo' : '',
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  // other Next.js config options
};

module.exports = nextConfig;
