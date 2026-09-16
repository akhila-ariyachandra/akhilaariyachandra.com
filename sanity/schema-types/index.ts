import { type SchemaTypeDefinition, type TemplateResolver } from "sanity";
import { singletonTypes } from "../shared";
import { companyType } from "./company-type";
import { jobType } from "./job-type";
import { linkType } from "./link-type";
import { personalInfoType } from "./personal-info-type";
import { postType } from "./post-type";
import { technologyType } from "./technology-type";

export const schema: {
  types: SchemaTypeDefinition[];
  templates: TemplateResolver;
} = {
  types: [
    personalInfoType,
    postType,
    technologyType,
    companyType,
    jobType,
    linkType,
  ],
  // Filter out singleton types from the global “New document” menu options
  templates: (templates) =>
    templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
};
