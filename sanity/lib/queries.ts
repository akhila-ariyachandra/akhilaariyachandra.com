import { defineQuery } from "next-sanity";

export const CAREERS_QUERY =
  defineQuery(`*[_type == "job"] | order(duration.start desc) {
  ...,
  company ->,
  technologies[] ->
}`);

export const POSTS_QUERY = defineQuery(
  `*[_type == "post"] | order(posted desc)`,
);

export const POST_BY_SLUG_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]`,
);
