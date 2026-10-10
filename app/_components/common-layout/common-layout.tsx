import NowPlaying from "@/_components/now-playing";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "cn";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ky from "ky";
import type { Language, LanguageName } from "linguist-languages";
import * as languages from "linguist-languages";
import { cacheLife } from "next/cache";
import { DM_Sans } from "next/font/google";
import { draftMode } from "next/headers";
import Link from "next/link";
import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FaCodeFork, FaStar } from "react-icons/fa6";
import { z } from "zod";
import Header from "./header";
import ThemeProvider from "./theme-provider";

dayjs.extend(relativeTime);

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
    <footer className="mx-auto w-full max-w-4xl space-y-4 p-3 sm:p-4">
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

      <ErrorBoundary fallback={null}>
        <RepoLink />
      </ErrorBoundary>
    </footer>
  );
};

const RepoLink = async () => {
  "use cache";

  cacheLife("days");

  const response = await ky
    .get(
      "https://api.github.com/repos/akhila-ariyachandra/akhilaariyachandra.com",
    )
    .json();
  const parsedResponse = await z
    .object({
      name: z.string(),
      owner: z.object({
        login: z.string(),
      }),
      description: z.string(),
      pushed_at: z.iso.datetime(),
      stargazers_count: z.number(),
      language: z.string(),
      forks_count: z.number(),
    })
    .parseAsync(response);

  const language: Language = languages[parsedResponse.language as LanguageName];

  return (
    <a
      href="https://github.com/akhila-ariyachandra/akhilaariyachandra.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group block neobrutalism-container p-3 sm:p-4"
    >
      <div className="text-xs underline-offset-2 group-hover:underline sm:text-sm">
        {parsedResponse.owner.login} /
      </div>

      <h4 className="text-xl font-bold underline-offset-2 group-hover:underline sm:text-2xl">
        {parsedResponse.name}
      </h4>

      <p className="my-1 text-sm font-semibold sm:my-2 sm:text-base">
        {parsedResponse.description}
      </p>

      <hr className="my-2 h-0.5 border-0 bg-black sm:my-3" />

      <div className="flex flex-row items-center gap-2 text-xs sm:text-sm">
        <div className="flex flex-row items-center gap-1">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: language.color }}
          />

          <div>{language.name}</div>
        </div>

        <div className="flex flex-row items-center gap-1">
          <FaStar />

          <div>{parsedResponse.stargazers_count}</div>
        </div>

        <div className="flex flex-row items-center gap-1">
          <FaCodeFork />

          <div>{parsedResponse.forks_count}</div>
        </div>

        <time dateTime={parsedResponse.pushed_at} className="ml-auto">
          {dayjs(parsedResponse.pushed_at).fromNow()}
        </time>
      </div>
    </a>
  );
};
