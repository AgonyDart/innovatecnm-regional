import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API: process.env.API,
  },
};

export default nextConfig;
