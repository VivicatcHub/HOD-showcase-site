import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/HOD-showcase-site",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
