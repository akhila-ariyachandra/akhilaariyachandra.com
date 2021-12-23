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
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
