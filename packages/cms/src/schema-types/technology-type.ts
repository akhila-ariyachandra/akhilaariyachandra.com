import { defineType, defineField } from "sanity";

export const technologyType = defineType({
  name: "technology",
  type: "document",
  title: "Technology",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      title: "URL",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
});
