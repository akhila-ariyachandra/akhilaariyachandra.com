import { PiOfficeChair } from "react-icons/pi";
import { defineField, defineType } from "sanity";

export const jobType = defineType({
  name: "job",
  title: "Job",
  type: "document",
  icon: PiOfficeChair,
  fields: [
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "reference",
      to: [{ type: "company" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "object",
      fields: [
        defineField({
          name: "start",
          title: "Start",
          type: "date",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "end",
          title: "End",
          type: "date",
          validation: (Rule) =>
            Rule.custom((end, context) => {
              const start = (context.parent as { start?: string } | undefined)
                ?.start;

              if (!start || !end) return true; // let `.required()` handle empties

              if (end <= start) {
                return "End date must be after start date";
              }

              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "technology" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "position",
      subtitle: "company.name",
      media: "company.logo",
    },
  },
});
