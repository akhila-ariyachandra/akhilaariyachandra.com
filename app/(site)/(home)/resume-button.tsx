"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { type Route } from "next";

const ResumeButton = ({ resume }: { resume?: string | null }) => {
  if (!resume) {
    return null;
  }

  const href: Route = "/resume";

  return (
    <a
      href={href}
      download="Akhila_Heshan_Ariyachandra_Resume.pdf"
      rel="nofollow"
      className="neobrutalism-button"
      onClick={() => {
        sendGAEvent("event", "resumeDownloaded");
      }}
    >
      Resume
    </a>
  );
};

export default ResumeButton;
