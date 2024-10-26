import { getOgImage } from "@/_lib/og-image";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Akhila Ariyachandra";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
const Image = () => {
  return getOgImage("Akhila Ariyachandra", "Web Developer");
};

export default Image;
