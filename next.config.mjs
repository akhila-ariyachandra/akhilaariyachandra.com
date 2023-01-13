import bundleAnalyzer from "@next/bundle-analyzer";
import { withContentlayer } from "next-contentlayer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co", "cdn.sanity.io"],
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    dirs: ["app", "components", "lib", "pages", "hooks"],
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

export default withBundleAnalyzer(withContentlayer(nextConfig));
