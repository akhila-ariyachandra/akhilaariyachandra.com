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
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
