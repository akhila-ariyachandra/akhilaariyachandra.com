const bundleAnalyzer = require("@next/bundle-analyzer");
const path = require("path");
const fs = require("fs");
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
    dirs: ["app", "components", "lib"],
  },
  experimental: {
    typedRoutes: true,
  },
  redirects: async () => {
    // Redirect all old blog post links
    const directoryPath = path.join(__dirname, "content", "posts");
    const files = await fs.readdirSync(directoryPath);

    return [
      ...files.map((file) => {
        const slug = file.replace(".mdx", "");

        return {
          source: `/${slug}`,
          destination: `/blog/${slug}`,
          permanent: true,
        };
      }),
    ];
  },
};

module.exports = withBundleAnalyzer(withContentlayer(nextConfig));
