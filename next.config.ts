import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [60, 75, 82],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "qieqbayjzctctkpsjdlm.supabase.co",
      },
    ],
  },
};

export default nextConfig;