import getOpenGraphImage from "@/lib/opengraph-image";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

const Image = async () => {
  return await getOpenGraphImage("Personal Blog", "Akhila Ariyachandra");
};

export default Image;
