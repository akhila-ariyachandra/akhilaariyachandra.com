/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {},
  content: [
    "./app/**/*.{js,ts,jsx,tsx,scss}",
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
        sora: "var(--font-sora)",
        "roboto-slab": "var(--font-roboto-slab)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
