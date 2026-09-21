import { dataset, projectId } from "@/sanity/env";
import type { NextConfig } from "next";
import { sanity } from "next-sanity/live/cache-life";

const nextConfig: NextConfig = {
  experimental: {
    turbopackRustReactCompiler: true,
    globalNotFound: true,
    exposeTestingApiInProductionBuild: process.env.VERCEL_ENV === "preview",
  },
  reactStrictMode: true,
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
  cacheLife: {
    default: sanity,
  },
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: `/images/${projectId}/${dataset}/**`,
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
