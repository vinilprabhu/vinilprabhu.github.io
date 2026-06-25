import type { NextConfig } from "next";

const repoName = process.env.NODE_ENV === "production" ? "/vinilprabhu_next" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  assetPrefix: repoName,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
