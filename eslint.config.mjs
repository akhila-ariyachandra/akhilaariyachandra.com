// @ts-check
import eslintReact from "@eslint-react/eslint-plugin";
import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import nextVitals from "eslint-config-next/core-web-vitals";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  {
    rules: {
      curly: ["error", "all"],
      "no-console": "error",
    },
  },
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
  {
    files: ["**/*.{js,mjs}"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: "directive", next: "*" },
        { blankLine: "never", prev: "directive", next: "directive" },
        { blankLine: "never", prev: "import", next: "import" },
      ],
      "@stylistic/spaced-comment": "error",
      "@stylistic/jsx-self-closing-comp": "error",
    },
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/newline-after-import": "error",
    },
  },
  nextVitals,
  {
    extends: [eslintReact.configs["recommended-type-checked"]],
    rules: {
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
    },
  },
  {
    files: ["**/*.{js,mjs}"],
    extends: [eslintReact.configs["disable-type-checked"]],
  },
  eslintConfigPrettier,
);
