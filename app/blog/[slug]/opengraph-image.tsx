import { getOgImage } from "@/_lib/og-image";
import { allNoBodyPosts } from "content-collections";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { notFound } from "next/navigation";

dayjs.extend(advancedFormat);

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Akhila Ariyachandra's Blog";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Image generation
const Image = async (props: BlogPostPageProps) => {
  const params = await props.params;
  const post = allNoBodyPosts.find((post) => post._meta.path === params.slug);

  if (!post) {
    notFound();
  }

  return getOgImage(
    post.title,
    "Akhila Ariyachandra",
    dayjs(post.posted).format("Do MMMM YYYY"),
  );
};

export default Image;
