import { generateOgImage } from "@/_utils/server-helpers";

// Route segment config
export const runtime = "edge";

// Image metadata
// export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const Image = async () => {
  return await generateOgImage("Code Snippets", "Akhila Ariyachandra");
};

export default Image;
