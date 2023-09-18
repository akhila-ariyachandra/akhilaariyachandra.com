import generateOgImage from "@/lib/og-image-generator";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

const Image = async () => {
  return await generateOgImage({
    title: "Akhila Ariyachandra",
    subtitle: "Web Developer",
  });
};

export default Image;
