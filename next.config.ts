import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  distDir: "dist",
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
