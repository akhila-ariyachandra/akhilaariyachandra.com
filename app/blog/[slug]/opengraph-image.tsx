import { allPosts } from ".contentlayer/generated";
import { generateOgImage } from "@/_utils/server-helpers";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { notFound } from "next/navigation";
import { BlogPostPageProps } from "./types";

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

const Image = async ({ params: { slug } }: BlogPostPageProps) => {
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return await generateOgImage(
    post.title,
    "Akhila Ariyachandra",
    dayjs(post.posted).format("Do MMMM YYYY"),
  );
};

export default Image;
