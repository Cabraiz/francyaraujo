import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1"],
  distDir: "dist",
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
