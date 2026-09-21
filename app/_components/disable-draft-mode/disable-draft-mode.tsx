"use client";

import { Button } from "@/_components/button";
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
    <Button
      className="fixed right-4 bottom-4"
      onClick={disable}
      disabled={pending}
    >
      {pending ? "Disabling..." : "Disable Draft Mode"}
    </Button>
  );
};

export default DisableDraftMode;
