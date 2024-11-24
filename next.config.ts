import { withContentCollections } from "@content-collections/next";
import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  experimental: {
    after: true,
    reactCompiler: true,
  },
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    dirs: ["app"],
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  redirects: async () => {
    // Redirect old snippet pages
    return [
      "firebase-authentication-react-hook",
      "prettier-config",
      "prisma-development",
      "serverless-pre-rendering",
      "sleep-in-javascript",
      "using-clsx-or-classnames-with-tailwind-merge",
    ].map((slug) => ({
      source: `/snippets/${slug}`,
      destination: `/blog/${slug}`,
      permanent: true,
    }));
  },
};

export default withContentCollections(withBundleAnalyzer(nextConfig));
