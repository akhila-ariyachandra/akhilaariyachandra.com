import CommonLayout from "@/_components/common-layout";
import DisableDraftMode from "@/_components/disable-draft-mode";
import { PRODUCTION_URL } from "@/_lib/constants";
import { SanityLive } from "@/sanity/lib/live";
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { type ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Akhila Ariyachandra",
    template: "%s | Akhila Ariyachandra",
  },
  description: "Web Developer",
  metadataBase: new URL(PRODUCTION_URL),
  openGraph: {
    title: {
      default: "Akhila Ariyachandra",
      template: "%s | Akhila Ariyachandra",
    },
    description: "Web Developer",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@heshan_1010",
  },
  alternates: {
    canonical: "/",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <CommonLayout>
      {children}

      <SanityLive includeDrafts={isDraftMode} />

      {isDraftMode && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </CommonLayout>
  );
};

export default RootLayout;
