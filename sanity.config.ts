import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import slugify from "slugify";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { markdownSchema } from "sanity-plugin-markdown";
import { media } from "sanity-plugin-media";

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
        fields: [
          {
            name: "name",
            type: "string",
            title: "Name",
          },
          {
            name: "link",
            type: "url",
            title: "Link",
          },
          {
            name: "logo",
            type: "image",
            title: "Logo",
            options: {
              hotspot: true,
            },
          },
        ],
      },
      {
        name: "job",
        type: "document",
        title: "Job",
        fields: [
          {
            name: "position",
            type: "string",
            title: "Position",
          },
          {
            name: "company",
            type: "reference",
            title: "Company",
            to: [{ type: "employer" }],
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
              },
              {
                name: "end",
                type: "date",
                title: "End",
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
        fields: [
          {
            name: "title",
            type: "string",
            title: "Title",
          },
          {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
              source: "title",
              slugify: (input) => slugify(input, { lower: true, trim: true }),
            },
          },
          {
            name: "date",
            type: "date",
            title: "Date",
          },
          {
            name: "updated",
            type: "date",
            title: "Updated",
          },
          {
            name: "description",
            type: "string",
            title: "Description",
          },
          {
            name: "banner",
            type: "image",
            title: "Banner",
            options: {
              hotspot: true,
            },
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
    ],
  },
});
