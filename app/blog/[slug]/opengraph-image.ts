import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { notFound } from "next/navigation";

import generateOgImage from "@/lib/og-image-generator";

import { allPosts } from ".contentlayer/generated";

dayjs.extend(advancedFormat);

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
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return await generateOgImage({
    title: post.title,
    subtitle: "Akhila Ariyachandra",
    content: dayjs(post.posted).format("Do MMMM YYYY"),
  });
};

export default Image;
