import { getOgImage } from "@/_lib/og-image";
import { getDynamicFetchOptions, sanityFetchNonLive } from "@/sanity/lib/live";
import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { Route } from "next";
import { notFound } from "next/navigation";

// Image metadata
export const alt = "Akhila Ariyachandra's Blog Archive";
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

  const { data: post } = await sanityFetchNonLive({
    query: POST_BY_SLUG_QUERY,
    params: { slug, archived: true },
    perspective,
  });

  if (!post) {
    notFound();
  }

  return getOgImage({
    title: post.title,
    pathname: `/blog/archive/${post.slug.current}` as Route,
  });
};

export default Image;
