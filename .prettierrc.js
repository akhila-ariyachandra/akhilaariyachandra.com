module.exports = {
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [
    require.resolve("prettier-plugin-organize-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};
