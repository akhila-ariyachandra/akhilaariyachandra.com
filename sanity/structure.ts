import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      S.documentTypeListItem("post").title("Blog"),
      S.divider(),
      S.documentTypeListItem("technology").title("Technologies"),
      S.documentTypeListItem("company").title("Companies"),
      S.documentTypeListItem("job").title("Jobs"),
    ]);
