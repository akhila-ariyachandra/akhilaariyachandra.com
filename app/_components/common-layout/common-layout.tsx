import NowPlaying from "@/_components/now-playing";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "cn";
import { cacheLife } from "next/cache";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import Header from "./header";
import ThemeProvider from "./theme-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={cn(
        "min-h-dvh scrollbar-gutter-stable scroll-smooth",
        "scrollbar-thumb-accent dark:scrollbar-thumb-accent-dark scrollbar-thin",
      )}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={cn(
          dmSans.className,
          "theme-transition relative flex min-h-dvh flex-col bg-green-100 font-medium text-black antialiased dark:bg-green-950 dark:text-white",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-size-[16px_16px] [--dot-color:var(--color-zinc-400)] dark:[--dot-color:var(--color-zinc-600)]" />

          <Header />

          <main className="mx-auto w-full max-w-4xl flex-1 p-3 sm:p-4">
            {children}
          </main>

          <Footer />

          <SpeedInsights />
        </ThemeProvider>
      </body>

      {!!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      )}
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
      <div className="neobrutalism-container space-y-4 p-3 sm:p-4">
        <NowPlaying />

        <p className="text-sm sm:text-base">
          &copy; {year}{" "}
          <Link
            href="/"
            className="text-accent dark:text-accent-dark font-semibold hover:underline"
          >
            Akhila Ariyachandra
          </Link>
        </p>
      </div>
    </footer>
  );
};
