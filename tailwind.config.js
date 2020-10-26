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
          color: "var(--text)",
          strong: {
            color: "var(--primary)",
          },
          h1: {
            color: "var(--text)",
          },
          h2: {
            color: "var(--text)",
          },
          h3: {
            color: "var(--text)",
          },
          h4: {
            color: "var(--text)",
          },
          h5: {
            color: "var(--text)",
          },
          h6: {
            color: "var(--text)",
          },
          a: {
            color: "var(--primary)",
          },
          code: {
            color: "var(--primary)",
          },
          blockquote: {
            color: "var(--text)",
          },
          th: {
            color: "var(--text)",
          },
          pre: {
            "margin-top": 0,
            "margin-bottom": 0,
          },
        },
      },
      xl: {
        css: {
          pre: {
            "margin-top": 0,
            "margin-bottom": 0,
          },
        },
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography")({
      modifiers: ["xl"],
    }),
  ],
};
