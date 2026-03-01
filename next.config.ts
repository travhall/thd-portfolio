import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
