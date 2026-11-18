"use server";

import { refresh } from "next/cache";
import { draftMode } from "next/headers";

export const disableDraftMode = async () => {
  const draft = await draftMode();
  draft.disable();

  refresh();
};
