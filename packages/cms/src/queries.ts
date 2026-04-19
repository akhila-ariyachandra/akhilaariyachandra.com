import { defineQuery } from "groq";

export const CAREERS_QUERY =
  defineQuery(`*[_type == "career"] | order(startDate desc) {
  ...,
  employer->,
  technologies[]->
}`);

export const CURRENT_JOB_QUERY =
  defineQuery(`*[_type == "career"] | order(startDate desc) [0] {
  ...,
  employer->,
  technologies[]->
}`);
