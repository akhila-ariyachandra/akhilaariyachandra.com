import { defineField, defineType } from "sanity";

export const careerType = defineType({
  name: "career",
  type: "document",
  fields: [
    defineField({
      name: "position",
      type: "string",
      title: "Position",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "employer",
      type: "reference",
      title: "Employer",
      validation: (rule) => rule.required(),
      to: [{ type: "company", validation: (rule) => rule.required() }],
    }),
    defineField({
      name: "startDate",
      type: "date",
      title: "Start Date",
      validation: (rule) => rule.required(),
      fieldset: "period",
    }),
    defineField({
      name: "endDate",
      type: "date",
      title: "End Date",
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = context.document?.startDate as string | undefined;
          // If either is missing, let .required() on those fields handle empties,
          // or return an error here if you require both.
          if (!endDate || !startDate) {
            return true;
          }

          if (endDate > startDate) {
            return true;
          }

          return "End date must be after the start date";
        }),
      fieldset: "period",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "technologies",
      type: "array",
      title: "Technologies",
      of: [
        {
          type: "reference",
          name: "technology",
          to: [{ type: "technology" }],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "position",
      subtitle: "employer.name",
      media: "employer.logo",
    },
  },
  fieldsets: [
    {
      name: "period",
      title: "Period",
      options: {
        columns: 2,
      },
    },
  ],
  orderings: [
    {
      title: "Start Date, Descending",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
});
