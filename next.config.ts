import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production" && process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isProd ? "/admix" : "",
  assetPrefix: isProd ? "/admix/" : "",
};

export default nextConfig;
