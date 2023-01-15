import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import slugify from "slugify";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { markdownSchema } from "sanity-plugin-markdown";
import { media } from "sanity-plugin-media";
import { FaPenFancy, FaCode, FaSuitcase } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

dayjs.extend(advancedFormat);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [deskTool(), visionTool(), markdownSchema(), media()],
  title: "akhilaariyachandra.com",
  schema: {
    types: [
      {
        name: "employer",
        type: "document",
        title: "Employer",
        icon: HiOutlineBuildingOffice2,
        fields: [
          {
            name: "name",
            type: "string",
            title: "Name",
            validation: (rule) => rule.required(),
          },
          {
            name: "link",
            type: "url",
            title: "Link",
            validation: (rule) => rule.required().unique(),
          },
          {
            name: "logo",
            type: "image",
            title: "Logo",
            options: {
              hotspot: true,
            },
            validation: (rule) => rule.required(),
          },
        ],
      },
      {
        name: "job",
        type: "document",
        title: "Job",
        icon: FaSuitcase,
        fields: [
          {
            name: "position",
            type: "string",
            title: "Position",
            validation: (rule) => rule.required(),
          },
          {
            name: "company",
            type: "reference",
            title: "Company",
            to: [{ type: "employer" }],
            validation: (rule) => rule.required(),
          },
          {
            name: "period",
            type: "object",
            title: "Period",
            fields: [
              {
                name: "start",
                type: "date",
                title: "Start",
                validation: (rule) => rule.required(),
              },
              {
                name: "end",
                type: "date",
                title: "End",
                validation: (rule) =>
                  rule.greaterThan(rule.valueOfField("date")),
              },
            ],
          },
        ],
        preview: {
          select: {
            position: "position",
            startDate: "period.start",
            endDate: "period.end",
            logo: "company.logo",
          },
          prepare: ({ position, startDate, endDate, logo }) => {
            return {
              title: position,
              subtitle: `${dayjs(startDate).format("Do MMMM YYYY")} - ${
                endDate ? dayjs(endDate).format("Do MMMM YYYY") : "Present"
              }`,
              media: logo,
            };
          },
        },
      },
      {
        name: "blog",
        type: "document",
        title: "Blog Posts",
        icon: FaPenFancy,
        fields: [
          {
            name: "title",
            type: "string",
            title: "Title",
            validation: (rule) => rule.required(),
          },
          {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
              source: "title",
              slugify: (input) => slugify(input, { lower: true, trim: true }),
            },
            validation: (rule) => rule.required().unique(),
          },
          {
            name: "date",
            type: "date",
            title: "Date",
            validation: (rule) => rule.required(),
          },
          {
            name: "updated",
            type: "date",
            title: "Updated",
            validation: (rule) => rule.greaterThan(rule.valueOfField("date")),
          },
          {
            name: "description",
            type: "string",
            title: "Description",
            validation: (rule) => rule.required(),
          },
          {
            name: "banner",
            type: "image",
            title: "Banner",
            options: {
              hotspot: true,
            },
            validation: (rule) => rule.required(),
          },
          {
            name: "unsplash",
            type: "object",
            title: "Unsplash",
            fields: [
              {
                name: "photographer",
                type: "string",
                title: "Photographer",
              },
              {
                name: "link",
                type: "url",
                title: "Link",
              },
            ],
          },
          {
            name: "content",
            type: "markdown",
            title: "Content",
            validation: (rule) => rule.required(),
          },
        ],
        preview: {
          select: {
            title: "title",
            date: "date",
            banner: "banner",
          },
          prepare: ({ title, date, banner }) => {
            return {
              title,
              subtitle: dayjs(date).format("Do MMMM YYYY"),
              media: banner,
            };
          },
        },
      },
      {
        name: "snippet",
        type: "document",
        title: "Code Snippets",
        icon: FaCode,
        fields: [
          {
            name: "title",
            type: "string",
            title: "Title",
            validation: (rule) => rule.required(),
          },
          {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
              source: "title",
              slugify: (input) => slugify(input, { lower: true, trim: true }),
            },
            validation: (rule) => rule.required().unique(),
          },
          {
            name: "description",
            type: "string",
            title: "Description",
            validation: (rule) => rule.required(),
          },
          {
            name: "content",
            type: "markdown",
            title: "Content",
            validation: (rule) => rule.required(),
          },
        ],
      },
    ],
  },
});
