module.exports = {
  purge: {
    mode: "layers",
    layers: ["base", "components", "utilities"],
    content: [
      "./src/components/**/*.js",
      "./src/context/**/*.js",
      "./src/pages/**/*.js",
      "./src/pages/**/*.mdx",
      "./src/templates/**/*.js",
      "./src/**/*.css",
      "./gatsby-config.js",
    ],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
