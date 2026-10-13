import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/config";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
