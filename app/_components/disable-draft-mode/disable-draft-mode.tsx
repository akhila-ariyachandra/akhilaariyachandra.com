"use client";

import { useIsPresentationTool } from "next-sanity/hooks";
import { useTransition } from "react";
import { disableDraftMode } from "./actions";

const DisableDraftMode = () => {
  const [pending, startTransition] = useTransition();
  const isPresentationTool = useIsPresentationTool();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (isPresentationTool) {
    return null;
  }

  const disable = () => {
    startTransition(async () => {
      await disableDraftMode();
    });
  };

  return (
    <button
      type="button"
      className="fixed right-4 bottom-4 cursor-pointer rounded bg-gray-50 px-4 py-2 disabled:pointer-events-none disabled:opacity-50"
      onClick={disable}
      disabled={pending}
    >
      {pending ? "Disabling..." : "Disable Draft Mode"}
    </button>
  );
};

export default DisableDraftMode;
