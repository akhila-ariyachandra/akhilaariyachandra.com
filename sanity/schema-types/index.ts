import { type SchemaTypeDefinition } from "sanity";
import { companyType } from "./company-type";
import { jobType } from "./job-type";
import { postType } from "./post-type";
import { technologyType } from "./technology-type";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, technologyType, companyType, jobType],
};
