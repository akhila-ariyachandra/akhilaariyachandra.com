import type { KnipConfig } from "knip";

const config: KnipConfig = {
  project: [
    "app/**/*.{ts,tsx,css}",
    "components/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "sanity/**/*.{ts,tsx}",
  ],
  ignore: ["sanity/generated/types.ts"],
};

export default config;
