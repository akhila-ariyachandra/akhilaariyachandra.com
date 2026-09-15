import { FaLink } from "react-icons/fa6";
import { GoProjectRoadmap } from "react-icons/go";
import { defineField, defineType } from "sanity";

export const jobProjectType = defineType({
  name: "jobProject",
  title: "Project",
  type: "document",
  icon: GoProjectRoadmap,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        defineField({
          name: "link",
          title: "Link",
          icon: FaLink,
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "url",
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "cover",
      title: "Cover",
      type: "image",
      validation: (Rule) => Rule.required(),
      // 👇 Enables crop and hotspot tools
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
  ],
});
