import type { KnipConfig } from "knip";

const config: KnipConfig = {
  tags: ["-lintignore"],
  entry: ["app/**/*.{ts,tsx}"],
  project: [
    "next.config.{js,cjs,mjs,ts}",
    "postcss.config.{js,cjs,mjs,ts}",
    "app/**/*.{ts,tsx,css}",
    "sanity/**/*.{ts,tsx}",
  ],
  ignore: ["sanity/generated/types.ts"],
};

export default config;
