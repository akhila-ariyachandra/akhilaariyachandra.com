import type { KnipConfig } from "knip";

const config: KnipConfig = {
  project: ["app/**/*.{ts,tsx,css}", "sanity/**/*.{ts,tsx}"],
  entry: ["checkly.config.ts"],
  ignore: ["sanity/generated/types.ts"],
};

export default config;
