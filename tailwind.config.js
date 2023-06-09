/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {},
  content: [
    "./app/**/*.{js,ts,jsx,tsx,scss}",
    "./components/**/*.{tsx,module.scss}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sora: ["var(--font-sora)"],
        "roboto-slab": ["var(--font-roboto-slab)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
