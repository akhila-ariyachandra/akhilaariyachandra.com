import { defineQuery } from "next-sanity";

export const CAREERS_QUERY =
  defineQuery(`*[_type == "job"] | order(duration.start desc) {
  ...,
  company ->,
  technologies[] ->
}`);
