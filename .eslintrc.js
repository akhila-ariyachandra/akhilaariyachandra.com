module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "next/core-web-vitals",
    "prettier",
  ],
  plugins: ["react-compiler"],
  parserOptions: { projectService: true, tsconfigRootDir: __dirname },
  rules: {
    "react-compiler/react-compiler": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },
};
