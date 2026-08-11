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
