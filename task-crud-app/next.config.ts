import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: '.', // Force root to current folder
  },
};

export default nextConfig;
