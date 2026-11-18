import { getOgImage } from "@/lib/og-image";
import type { Route } from "next";

// Image metadata
export const alt = "Akhila Ariyachandra";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
const Image = () => {
  return getOgImage({
    title: "Akhila Ariyachandra",
    pathname: "" as Route,
  });
};

export default Image;
