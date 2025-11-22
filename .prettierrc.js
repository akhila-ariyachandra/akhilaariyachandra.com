module.exports = {
  organizeImportsSkipDestructiveCodeActions: true,
  tailwindAttributes: ["tw"],
  tailwindFunctions: ["cn"],
  plugins: [
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
};
