module.exports = {
  future: {},
  mode: process.env.NODE_ENV ? "jit" : undefined,
  purge: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.{tsx,js,scss}",
    "./src/styles/**/*.scss",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800"),
            "strong,a,code": {
              color: theme("colors.green.700"),
            },
            "h1,h2,h3,h4,h5,h6,blockquote,th": {
              color: theme("colors.gray.800"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
