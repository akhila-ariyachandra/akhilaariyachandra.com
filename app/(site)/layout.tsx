import DisableDraftMode from "@/_components/disable-draft-mode";
import NowPlaying from "@/_components/now-playing";
import { PRODUCTION_URL } from "@/_lib/constants";
import { SanityLive } from "@/sanity/lib/live";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "cn";
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { cacheLife } from "next/cache";
import { DM_Sans } from "next/font/google";
import { draftMode } from "next/headers";
import Link from "next/link";
import { type ReactNode } from "react";
import "./globals.css";
import Header from "./header";
import ThemeProvider from "./theme-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

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
    <html
      lang="en"
      className={cn(
        "min-h-dvh scrollbar-gutter-stable scroll-smooth",
        "scrollbar-thumb-black scrollbar-track-white dark:scrollbar-thumb-white dark:scrollbar-track-zinc-950",
      )}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={cn(
          dmSans.className,
          "flex min-h-dvh flex-col font-medium text-black antialiased sm:border-r-4 sm:border-r-black dark:text-white",
          "bg-green-100 bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-size-[16px_16px] theme-transition [--dot-color:var(--color-zinc-400)] dark:bg-green-950 dark:[--dot-color:var(--color-zinc-600)]",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />

          <main className="mx-auto w-full max-w-4xl flex-1 p-3 sm:p-4">
            {children}
          </main>

          <Footer />

          <SanityLive includeDrafts={isDraftMode} />

          {isDraftMode ? (
            <>
              <VisualEditing />
              <DisableDraftMode />
            </>
          ) : (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

const getYear = async () => {
  "use cache";

  cacheLife("days");

  return new Date().getFullYear();
};

const Footer = async () => {
  const year = await getYear();

  return (
    <footer className="mx-auto w-full max-w-4xl p-3 sm:p-4">
      <div className="space-y-4 neobrutalism-container pt-3 sm:pt-4">
        <NowPlaying />

        <div className="flex flex-row items-center justify-between gap-4 border-t-2 border-t-black">
          <p className="p-3 text-sm sm:p-4 sm:text-base">
            &copy; {year}{" "}
            <Link
              href="/"
              className="font-semibold text-accent hover:underline dark:text-accent-dark"
            >
              Akhila Ariyachandra
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
