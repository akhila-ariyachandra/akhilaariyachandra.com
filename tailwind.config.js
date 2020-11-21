module.exports = {
  future: {},
  purge: [
    "./pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/components/**/*.js",
    "./src/components/**/*.scss",
    "./src/styles/**/*.scss",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
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
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography")({
      modifiers: ["xl"],
    }),
  ],
};
