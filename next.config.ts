import type { NextConfig } from "next";

// Déploiement GitHub Pages : export statique servi sous /portfolio-jd/.
const repo = "portfolio-jd";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
