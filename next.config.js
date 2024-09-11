/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  basePath: isProd ? '/francyaraujo' : '',
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  publicRuntimeConfig: {
    basePath: isProd ? '/francyaraujo' : ''
  }
};

module.exports = nextConfig;
