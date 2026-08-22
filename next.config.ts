import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  agentRules: false,
  basePath: isProd ? "/francyaraujo" : "",
  distDir: "dist",
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
