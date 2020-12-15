const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

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
    webpack: (config, { dev, isServer }) => {
      // Replace React with Preact only in client production build
      if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
        });
      }

      return config;
    },
    async rewrites() {
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
  }
);
