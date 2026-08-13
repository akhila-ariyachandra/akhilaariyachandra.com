import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Portfolio")
    .items([
      S.listItem()
        .title("Personal Information")
        .id("personalInfo")
        .icon(context.schema.get("personalInfo")?.icon)
        .child(
          // Instead of rendering a list of documents, we render a single
          // document, specifying the `documentId` manually to ensure
          // that we're editing the single instance of the document
          S.document().schemaType("personalInfo").documentId("personalInfo"),
        ),
      S.divider(),
      S.documentTypeListItem("post").title("Blog"),
      S.divider(),
      S.documentTypeListItem("technology").title("Technologies"),
      S.documentTypeListItem("company").title("Companies"),
      S.documentTypeListItem("job").title("Jobs"),
    ]);
