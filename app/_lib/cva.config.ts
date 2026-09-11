import { cn as mergeClasses } from "cn";
import { defineConfig } from "cva/config";

export { type VariantProps } from "cva";

export const { cva, cx: cn } = defineConfig({ cx: mergeClasses });
