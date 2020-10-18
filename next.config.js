const withOffline = require("next-offline");
const withOptimizedImages = require("next-optimized-images");
const path = require("path");

module.exports = withOffline(
  withOptimizedImages({
    webpack: (config) => {
      config.resolve.alias.images = path.join(
        __dirname,
        "src",
        "content",
        "images"
      );

      return config;
    },
    workboxOpts: {
      swDest: "static/service-worker.js",
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "offlineCache",
            expiration: {
              maxEntries: 200,
            },
          },
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: "/service-worker.js",
          destination: "/_next/static/service-worker.js",
        },
      ];
    },
  })
);
