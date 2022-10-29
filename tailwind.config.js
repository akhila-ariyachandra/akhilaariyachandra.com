/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {},
  content: [
    "./pages/**/*.tsx",
    "./components/**/*.{tsx,module.scss}",
    "./styles/**/*.scss",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sora: "var(--sora-font)",
        "roboto-slab": "var(--roboto-slab-font)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
