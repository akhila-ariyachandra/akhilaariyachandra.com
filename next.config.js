/* eslint-disable @typescript-eslint/no-var-requires */
const { withContentlayer } = require("next-contentlayer");

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
  },
};

module.exports = withContentlayer(nextConfig);
