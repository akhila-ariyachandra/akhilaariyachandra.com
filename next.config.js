/* eslint-disable @typescript-eslint/no-var-requires */
const { withContentlayer } = require("next-contentlayer");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    dirs: ["app", "components", "db", "lib", "hooks"],
  },
  experimental: {
    typedRoutes: true,
    logging: {
      level: "verbose",
      fullUrl: true,
    },
  },
};

module.exports = withBundleAnalyzer(withContentlayer(nextConfig));
