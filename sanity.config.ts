import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

dayjs.extend(advancedFormat);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [deskTool(), visionTool()],
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
    ],
  },
});
