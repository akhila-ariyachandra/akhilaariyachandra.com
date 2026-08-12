import { FaUser } from "react-icons/fa6";
import { PiOfficeChair } from "react-icons/pi";
import { defineField, defineType } from "sanity";

export const personalInfoType = defineType({
  name: "personalInfo",
  title: "Personal Information",
  type: "document",
  icon: FaUser,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "picture",
      title: "Picture",
      type: "image",
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "resume",
      title: "Resume",
      type: "file",
      options: {
        accept: "application/pdf",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "about",
      title: "About",
      type: "array",
      of: [
        {
          type: "block",
          styles: [],
          lists: [],
          marks: { annotations: [{ type: "link" }] },
          of: [
            {
              name: "latestJob",
              title: "Latest Job",
              icon: PiOfficeChair,
              type: "object",
              fields: [
                defineField({
                  name: "enabled",
                  type: "boolean",
                  initialValue: true,
                  hidden: true,
                }),
              ],
              preview: {
                prepare: () => ({ title: "Latest Job" }),
              },
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
