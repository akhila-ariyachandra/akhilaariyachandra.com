import getOpenGraphImage from "@/lib/opengraph-image";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

const Image = async () => {
  return await getOpenGraphImage("Code Snippets", "Akhila Ariyachandra");
};

export default Image;
