const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([
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
]);
