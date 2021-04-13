const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const fs = require("fs");
const path = require("path");

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    [
      withPWA,
      {
        pwa: {
          dest: "public",
          runtimeCaching,
          disable: process.env.NODE_ENV === "development",
        },
      },
    ],
  ],
  {
    images: {
      domains: ["i.scdn.co"],
    },
    rewrites: async () => {
      return [
        {
          source: "/bee.js",
          destination: "https://cdn.splitbee.io/sb.js",
        },
        {
          source: "/_hive/:slug",
          destination: "https://hive.splitbee.io/:slug",
        },
      ];
    },
    redirects: async () => {
      const redirects = [];

      // Move all blog posts under /blog
      const postsDirectory = path.join("content", "posts");
      const fileNames = fs.readdirSync(postsDirectory);
      const routes = fileNames.map((fileName) =>
        fileName.replace(/\.mdx$/, "")
      );

      for (const route of routes) {
        redirects.push({
          source: `/${route}`,
          destination: `/blog/${route}`,
          permanent: true,
        });
      }

      // Fix redirect for DEV post for https://dev.to/akhilaariyachandra/mimic-react-life-cycle-methods-with-hooks-286a
      redirects.push({
        source: `/mimic-react-life-cycles-methods-with-hooks`,
        destination: `/blog/mimic-react-life-cycle-methods-with-hooks`,
        permanent: true,
      });

      return redirects;
    },
    webpack: (config, { dev, isServer }) => {
      // Replace React with Preact only in client production build
      /* if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
        });
      } */

      return config;
    },
    future: {
      webpack5: true,
      strictPostcssConfiguration: true,
    },
  }
);
