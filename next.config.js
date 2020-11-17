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
        dest: "public",
        runtimeCaching,
        disable: process.env.NODE_ENV === "development",
      },
    ],
  ],
  {
    async rewrites() {
      return [
        {
          source: "/service-worker.js",
          destination: "/_next/static/service-worker.js",
        },
      ];
    },
  }
);
