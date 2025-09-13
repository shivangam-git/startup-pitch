import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",   // wildcard: allow all HTTPS domains
      },
    ],
  },
  experimental:{
    ppr: 'incremental'
  },
  devIndicators: {
    position: "bottom-right", // ✅ valid
  },
};

export default nextConfig;
