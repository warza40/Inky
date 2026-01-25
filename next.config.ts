import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// For development server
if (process.env.NODE_ENV === 'development') {
  // This will be handled by the dev script
}

export default nextConfig;
