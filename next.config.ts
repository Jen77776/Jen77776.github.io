import type { NextConfig } from "next";

// GitHub Pages serves the prerendered site without a Node.js server.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
