import NowPlaying from "@/_components/now-playing";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "cn";
import ky from "ky";
import { cacheLife } from "next/cache";
import { DM_Sans } from "next/font/google";
import { draftMode } from "next/headers";
import Link from "next/link";
import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FaStar } from "react-icons/fa6";
import { z } from "zod";
import { buttonVariants } from "../button";
import Header from "./header";
import ThemeProvider from "./theme-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

const CommonLayout = async ({ children }: { children: ReactNode }) => {
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

          {!isDraftMode && (
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

export default CommonLayout;

const getYear = async () => {
  "use cache";

  cacheLife("days");

  return new Date().getFullYear();
};

const Footer = async () => {
  const year = await getYear();

  return (
    <footer className="mx-auto w-full max-w-4xl p-3 sm:p-4">
      <div className="space-y-4 neobrutalism-container py-3 sm:py-4">
        <NowPlaying />

        <div className="flex flex-row items-center justify-between gap-4 border-t-2 border-t-black px-3 pt-3 sm:px-4 sm:pt-4">
          <p className="text-sm sm:text-base">
            &copy; {year}{" "}
            <Link
              href="/"
              className="font-semibold text-accent hover:underline dark:text-accent-dark"
            >
              Akhila Ariyachandra
            </Link>
          </p>

          <ErrorBoundary fallback={null}>
            <RepoLink />
          </ErrorBoundary>
        </div>
      </div>
    </footer>
  );
};

const RepoLink = async () => {
  "use cache";

  const response = await ky
    .get(
      "https://api.github.com/repos/akhila-ariyachandra/akhilaariyachandra.com",
    )
    .json();
  const parsedResponse = await z
    .object({
      stargazers_count: z.number(),
    })
    .parseAsync(response);

  return (
    <a
      href="https://github.com/akhila-ariyachandra/akhilaariyachandra.com"
      target="_blank"
      rel="noopener noreferrer"
      className={buttonVariants()}
    >
      <span>{parsedResponse.stargazers_count}</span>

      <FaStar />
      <span className="sr-only">Star</span>

      <span>Repo</span>
    </a>
  );
};
