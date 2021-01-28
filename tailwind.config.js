module.exports = {
  future: {},
  purge: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/components/**/*.js",
    "./src/components/**/*.scss",
    "./src/styles/**/*.scss",
  ],
  darkMode: "class",
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.black"),
            "strong,a,code": {
              color: theme("colors.green.700"),
            },
            "h1,h2,h3,h4,h5,h6,blockquote,th": {
              color: theme("colors.black"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.white"),
            "strong,a,code": {
              color: theme("colors.green.600"),
            },
            "h1,h2,h3,h4,h5,h6,blockquote,th": {
              color: theme("colors.white"),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [require("@tailwindcss/typography")],
};
