import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/schema-types";
import { media } from "sanity-plugin-media";

export default defineConfig({
  name: "default",
  title: "Portfolio",

  projectId: "vcrx709q",
  dataset: "production",

  plugins: [structureTool(), media(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
