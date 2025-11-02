import { getOgImage } from "@/_lib/og-image";

// Image metadata
export const alt = "Akhila Ariyachandra's Blog";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
const Image = () => {
  return getOgImage({
    title: "Personal Blog",
    subtitle: "Akhila Ariyachandra",
    pathname: "/blog",
  });
};

export default Image;
