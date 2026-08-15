import NowPlaying from "@/_components/now-playing";
import { cn } from "@/_lib/helpers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cacheLife } from "next/cache";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import Header from "./header";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={cn(
        geistMono.variable,
        "min-h-dvh scroll-smooth",
        "scrollbar-thumb-accent dark:scrollbar-thumb-accent-dark scrollbar-thin",
      )}
      data-scroll-behavior="smooth"
    >
      <body
        className={cn(
          geist.className,
          "flex min-h-dvh flex-col bg-white antialiased dark:bg-zinc-950",
          "transition-colors duration-200 ease-out",
        )}
      >
        <Header />

        <main className="mx-auto w-full max-w-4xl flex-1 p-3 sm:p-4">
          {children}
        </main>

        <Footer />

        <SpeedInsights />
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
    <footer className="mx-auto w-full max-w-4xl space-y-4 p-3 text-zinc-600 sm:p-4 dark:text-zinc-300">
      <NowPlaying />

      <p className="text-sm sm:text-base">
        &copy; {year}{" "}
        <Link
          href="/"
          className="text-accent dark:text-accent-dark hover:underline"
        >
          Akhila Ariyachandra
        </Link>
      </p>
    </footer>
  );
};
