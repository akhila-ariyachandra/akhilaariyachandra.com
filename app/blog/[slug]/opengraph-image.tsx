import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import getOpenGraphImage from "@/lib/opengraph-image";
import { notFound } from "next/navigation";
import { allPosts } from ".contentlayer/generated";

dayjs.extend(advancedFormat);

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

const Image = async ({ params }: BlogPostPageProps) => {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return await getOpenGraphImage(
    post.title,
    "Akhila Ariyachandra",
    dayjs(post.posted).format("Do MMMM YYYY"),
  );
};

export default Image;
