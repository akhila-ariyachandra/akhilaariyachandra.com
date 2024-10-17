import { withContentCollections } from "@content-collections/next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    after: true,
    reactCompiler: true,
  },
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    dirs: ["app"],
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
