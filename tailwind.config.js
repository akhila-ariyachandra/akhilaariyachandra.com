module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: [
    "./pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/styles/**/*.scss",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
