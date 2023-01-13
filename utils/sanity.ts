import sanityClient from "@/lib/sanity-client";
import type { BlogPost } from "@/lib/types";
import { groq } from "next-sanity";

export const getBlogPosts = async () => {
  return await sanityClient.fetch<BlogPost[]>(
    groq`*[_type == "blog"] | order(date desc)`
  );
};

export const getBlogPost = async (slug: string) => {
  const result = await sanityClient.fetch<BlogPost>(
    groq`*[_type == "blog" && slug.current == $slug][0]`,
    {
      slug,
    }
  );

  return result;
};
