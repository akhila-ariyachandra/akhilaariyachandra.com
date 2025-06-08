// @ts-check
import eslintReact from "@eslint-react/eslint-plugin";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/require-await": "off",
    },
  },
  compat.config({
    extends: ["plugin:drizzle/recommended"],
  }),
  compat.config({
    extends: ["next/core-web-vitals"],
  }),
  compat.config({
    plugins: ["react-compiler"],
    rules: {
      "react-compiler/react-compiler": "error",
    },
  }),
  {
    extends: [eslintReact.configs["recommended-type-checked"]],
  },
  eslintConfigPrettier,
);
