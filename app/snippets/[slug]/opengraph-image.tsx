import { allSnippets } from ".contentlayer/generated";
import { generateOgImage } from "@/_utils/server-helpers";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { notFound } from "next/navigation";
import { SnippetPageProps } from "./types";

dayjs.extend(advancedFormat);

// Route segment config
export const runtime = "edge";

// Image metadata
// export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const Image = async ({ params: { slug } }: SnippetPageProps) => {
  const snippet = allSnippets.find((snippet) => snippet.slug === slug);

  if (!snippet) {
    notFound();
  }

  return await generateOgImage(
    snippet.title,
    "Akhila Ariyachandra",
    "Code Snippet",
  );
};

export default Image;
