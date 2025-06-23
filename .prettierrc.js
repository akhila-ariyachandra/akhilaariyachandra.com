module.exports = {
  organizeImportsSkipDestructiveCodeActions: true,
  tailwindAttributes: ["tw"],
  tailwindFunctions: ["cn"],
  plugins: [
    require.resolve("@prettier/plugin-oxc"),
    require.resolve("prettier-plugin-organize-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};
