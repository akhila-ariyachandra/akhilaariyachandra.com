import type { KnipConfig } from "knip";

const config: KnipConfig = {
  tags: ["-lintignore"],
  entry: ["app/**/*.{ts,tsx}", "content-collections.ts"],
  project: [
    "next.config.{js,cjs,mjs,ts}",
    "postcss.config.{js,cjs,mjs,ts}",
    "app/**/*.{ts,tsx}",
  ],
  ignoreDependencies: ["tailwindcss", "@tailwindcss/typography"],
};

export default config;
