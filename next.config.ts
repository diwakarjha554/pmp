import type { NextConfig } from "next";

/** Upstream backend used by the client-side forms through the /api/v1 rewrite. */
const API_UPSTREAM = (process.env.API_UPSTREAM ?? "https://pmpublishers.in/api/v1").replace(/\/$/, "");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "s3.pmpublishers.in" },
      { protocol: "https", hostname: "pmpublishers.in" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${API_UPSTREAM}/:path*`,
      },
    ];
  },
};

export default nextConfig;
