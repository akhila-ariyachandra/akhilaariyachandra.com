module.exports = {
  endOfLine: "lf",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  plugins: [
    require("prettier-plugin-prisma"),
    require("prettier-plugin-tailwindcss"),
  ],
};
