module.exports = {
  future: {},
  content: [
    "./pages/**/*.tsx",
    "./components/**/*.{tsx,js,scss}",
    "./styles/**/*.scss",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        "roboto-slab": ["Roboto Slab", "serif"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: "Sora, sans-serif",
            color: theme("colors.gray.800"),
            "strong,a,code": {
              color: theme("colors.emerald.700"),
            },
            "h1,h2,h3,h4,h5,h6,blockquote,th": {
              color: theme("colors.gray.800"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.200"),
            "strong,a,code": {
              color: theme("colors.emerald.600"),
            },
            "h1,h2,h3,h4,h5,h6,blockquote,th": {
              color: theme("colors.gray.200"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
