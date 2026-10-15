import { type SchemaTypeDefinition } from "sanity";
import { companyType } from "./company-type";
import { jobType } from "./job-type";
import { linkType } from "./link-type";
import { personalInfoType } from "./personal-info-type";
import { postType } from "./post-type";
import { technologyType } from "./technology-type";

export const schema: {
  types: SchemaTypeDefinition[];
} = {
  types: [
    personalInfoType,
    postType,
    technologyType,
    companyType,
    jobType,
    linkType,
  ],
};
