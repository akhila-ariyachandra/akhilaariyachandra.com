/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "next/core-web-vitals",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "react-compiler"],
  parser: "@typescript-eslint/parser",
  parserOptions: { projectService: true, tsconfigRootDir: __dirname },
  root: true,
  rules: {
    "react-compiler/react-compiler": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/require-await": "off",
  },
};
