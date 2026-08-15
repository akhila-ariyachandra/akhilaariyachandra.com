"use client";

import { sendGAEvent } from "@next/third-parties/google";

const ResumeButton = ({ resume }: { resume?: string | null }) => {
  if (!resume) {
    return null;
  }

  return (
    <a
      href="/resume"
      download="Akhila_Heshan_Ariyachandra_Resume.pdf"
      rel="nofollow"
      className="text-accent dark:text-accent-dark rounded border border-zinc-200 px-2 py-1 text-lg hover:underline sm:px-4 sm:py-2 sm:text-xl dark:border-zinc-700"
      onClick={() => {
        sendGAEvent("event", "resumeDownloaded");
      }}
    >
      Resume
    </a>
  );
};

export default ResumeButton;
