import { FaCode } from "react-icons/fa6";
import { defineField, defineType } from "sanity";

export const technologyType = defineType({
  name: "technology",
  title: "Technology",
  type: "document",
  icon: FaCode,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      validation: (Rule) => Rule.required(),
      // 👇 Enables crop and hotspot tools
      options: {
        hotspot: true,
      },
    }),
  ],
});
