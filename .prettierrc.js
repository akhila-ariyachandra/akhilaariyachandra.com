module.exports = {
  organizeImportsSkipDestructiveCodeActions: true,
  tailwindAttributes: ["tw"],
  tailwindFunctions: ["cn"],
  plugins: [
    "@prettier/plugin-oxc",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-prisma",
  ],
};
