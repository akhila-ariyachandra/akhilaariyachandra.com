const Dotenv = require("dotenv-webpack");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  target: "serverless",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
  env: {
    title: "Akhila Ariyachandra",
    description: "Web Developer with a passion for JavaScript and React",
    author: "@heshan_1010",
    siteUrl: "https://akhilaariyachandra.com",
  },
});
