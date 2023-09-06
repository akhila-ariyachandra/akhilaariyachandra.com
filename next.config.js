const path = require("path");
const fs = require("fs");
const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  redirects: async () => {
    const directoryPath = path.join(__dirname, "content", "posts");

    const files = fs.readdirSync(directoryPath);
    const slugs = files.map((file) => file.replace(".mdx", ""));

    // Redirect old blog post links
    return slugs.map((slug) => ({
      source: `/${slug}`,
      destination: `/blog/${slug}`,
      permanent: true,
    }));
  },
};

module.exports = withContentlayer(nextConfig);
