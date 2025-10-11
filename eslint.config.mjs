// @ts-check
import eslintReact from "@eslint-react/eslint-plugin";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import reactCompiler from "eslint-plugin-react-compiler";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
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
    extends: ["next/core-web-vitals"],
  }),
  reactCompiler.configs.recommended,
  {
    extends: [eslintReact.configs["recommended-type-checked"]],
    rules: {
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
    },
  },
  eslintConfigPrettier,
);
