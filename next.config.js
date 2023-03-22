const bundleAnalyzer = require("@next/bundle-analyzer");
const { withContentlayer } = require("next-contentlayer");

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co"],
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    dirs: ["app", "components", "lib", "hooks"],
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
};

module.exports = withBundleAnalyzer(withContentlayer(nextConfig));
