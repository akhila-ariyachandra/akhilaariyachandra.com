import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { FaExclamation, FaImage, FaLink, FaPen } from "react-icons/fa6";
import { MdHorizontalRule } from "react-icons/md";
import { defineField, defineType } from "sanity";
import slugify from "slugify";

dayjs.extend(advancedFormat);

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: FaPen,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        slugify: (input) => slugify(input, { lower: true, strict: true }),
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: "posted",
      title: "Posted",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Heading 5", value: "h5" },
            { title: "Heading 6", value: "h6" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                title: "Link",
                icon: FaLink,
                type: "object",
                fields: [
                  defineField({
                    name: "url",
                    title: "URL",
                    type: "url",
                    validation: (Rule) => Rule.required(),
                  }),
                  defineField({
                    name: "label",
                    title: "Label",
                    type: "string",
                  }),
                  defineField({
                    name: "openInNewTab",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: true,
                    validation: (Rule) => Rule.required(),
                  }),
                ],
                validation: (Rule) => Rule.required(),
              },
            ],
          },
        },
        {
          type: "code",
          options: {
            withFilename: true,
          },
        },
        {
          name: "callout",
          title: "Callout",
          icon: FaExclamation,
          type: "object",
          fields: [
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: ["default", "info", "warn"],
                layout: "radio",
              },
              initialValue: "default",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "array",
              of: [{ type: "block", styles: [], lists: [] }],
              validation: (Rule) => Rule.required(),
            }),
          ],
          validation: (Rule) => Rule.required(),
          preview: {
            select: {
              content: "content",
              type: "type",
            },
            prepare: ({ content, type }) => {
              const text =
                content
                  ?.map(
                    (block: { children?: { text?: string }[] }) =>
                      block.children
                        ?.map((child) => child.text ?? "")
                        .join("") ?? "",
                  )
                  .join(" ") ?? "";

              return {
                title: text.slice(0, 100),
                subtitle: type.charAt(0).toUpperCase() + type.slice(1),
              };
            },
          },
        },

        {
          name: "image",
          title: "Image",
          icon: FaImage,
          type: "image",
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              name: "alt",
              title: "Alt",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
            defineField({
              name: "darkImage",
              title: "Dark mode image",
              type: "image",
              description:
                "Optional. Shown instead of the main image when the site is in dark mode.",
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: "caption",
              subtitle: "alt",
              media: "asset",
            },
            prepare: ({ title, subtitle, media }) => {
              return {
                title: title ?? subtitle,
                media,
              };
            },
          },
        },
        {
          name: "horizontalLine",
          title: "Horizontal Line",
          icon: MdHorizontalRule,
          type: "object",
          fields: [
            defineField({
              name: "style",
              type: "string",
              hidden: true,
              initialValue: "hr",
            }),
          ],
          preview: {
            prepare: () => ({
              title: "Horizontal Line",
            }),
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "posted",
    },
    prepare: ({ title, subtitle }) => {
      return {
        title,
        subtitle: dayjs(subtitle).format("Do MMMM YYYY"),
      };
    },
  },
});
