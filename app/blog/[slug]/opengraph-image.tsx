import { getOgImage } from "@/_lib/og-image";
import { allNoBodyPosts } from "content-collections";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { notFound } from "next/navigation";

dayjs.extend(advancedFormat);

// Image metadata
export const alt = "Akhila Ariyachandra's Blog";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
const Image = async (props: PageProps<"/blog/[slug]">) => {
  const params = await props.params;
  const post = allNoBodyPosts.find((post) => post._meta.path === params.slug);

  if (!post) {
    notFound();
  }

  return getOgImage({
    title: post.title,
    pathname: `/blog/${post._meta.path}`,
  });
};

export default Image;
