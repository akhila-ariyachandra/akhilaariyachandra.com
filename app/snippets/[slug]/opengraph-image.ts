import { notFound } from "next/navigation";

import generateOgImage from "@/lib/og-image-generator";

import { allSnippets } from ".contentlayer/generated";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

type OgImageProps = {
  params: {
    slug: string;
  };
};

const Image = async ({ params }: OgImageProps) => {
  const snippet = allSnippets.find((snippet) => snippet.slug === params.slug);

  if (!snippet) {
    notFound();
  }

  return await generateOgImage({
    title: snippet.title,
    subtitle: "Akhila Ariyachandra",
    content: "Code Snippet",
  });
};

export default Image;
