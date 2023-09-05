import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import getOpenGraphImage from "@/lib/opengraph-image";
import { notFound } from "next/navigation";
import { allSnippets } from ".contentlayer/generated";

dayjs.extend(advancedFormat);

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

type SnippetPageProps = {
  params: {
    slug: string;
  };
};

const Image = async ({ params }: SnippetPageProps) => {
  const snippet = allSnippets.find((post) => post.slug === params.slug);

  if (!snippet) {
    notFound();
  }

  return await getOpenGraphImage(snippet.title, "Akhila Ariyachandra");
};

export default Image;
