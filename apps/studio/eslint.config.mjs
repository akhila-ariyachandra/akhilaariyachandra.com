import studio from "@sanity/eslint-config-studio";
import turboConfig from "eslint-config-turbo/flat";
import { defineConfig } from "eslint/config";

export default defineConfig(studio, turboConfig);
