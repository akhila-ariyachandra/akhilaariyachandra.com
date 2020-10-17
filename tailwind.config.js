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
    typography: {
      default: {
        css: {
          color: "var(---text)",
          strong: {
            color: "var(---text)",
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
