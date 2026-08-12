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

export const PERSONAL_INFO_QUERY = defineQuery(`*[_type == "personalInfo"][0] {
  ...,
  "resume": resume.asset->url 
}`);

export const RESUME_QUERY = defineQuery(`*[_type == "personalInfo"][0] {
  "url": resume.asset->url,
  "filename": resume.asset->originalFilename
}`);
