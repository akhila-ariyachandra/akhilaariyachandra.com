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
    dirs: ["app", "components", "lib", "pages", "hooks", "utils"],
  },
  experimental: {
    appDir: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap.xml",
      },
      {
        source: "/rss.xml",
        destination: "/api/rss.xml",
      },
    ];
  },
};

module.exports = withBundleAnalyzer(withContentlayer(nextConfig));