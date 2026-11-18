"use client";

import dynamic from "next/dynamic";

const DisableDraftModeButton = dynamic(
  () => import("./disable-draft-mode-button"),
  {
    ssr: false,
  },
);

const DisableDraftMode = () => {
  return <DisableDraftModeButton />;
};

export default DisableDraftMode;
