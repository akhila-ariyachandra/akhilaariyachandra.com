/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
// eslint-disable-next-line no-undef
module.exports = {
  organizeImportsSkipDestructiveCodeActions: true,
  tailwindAttributes: ["tw"],
  tailwindFunctions: ["cn", "cva"],
  tailwindStylesheet: "./app/(site)/globals.css",
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
};
