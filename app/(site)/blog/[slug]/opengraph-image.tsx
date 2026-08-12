import { getOgImage } from "@/_lib/og-image";
import { getDynamicFetchOptions, sanityFetchMetadata } from "@/sanity/lib/live";
import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
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
const Image = async ({ params }: PageProps<"/blog/[slug]">) => {
  const [{ slug }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);

  const { data: post } = await sanityFetchMetadata({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    perspective,
  });

  if (!post) {
    notFound();
  }

  return getOgImage({
    title: post.title,
    pathname: `/blog/${post.slug}`,
  });
};

export default Image;
