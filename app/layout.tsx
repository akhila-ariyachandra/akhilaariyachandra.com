import NowPlaying from "@/_components/now-playing";
import { PRODUCTION_URL } from "@/_lib/constants";
import { cn } from "@/_lib/helpers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { type ReactNode } from "react";
import "./globals.css";
import "./syntax-highlighting.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});
const geist = Geist({
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
  return (
    <html
      lang="en"
      className={cn(geistMono.variable, "min-h-dvh scroll-smooth")}
      data-scroll-behavior="smooth"
    >
      <body
        className={cn(
          geist.className,
          "font-content flex min-h-dvh flex-col bg-white antialiased dark:bg-zinc-950",
          "transition-colors duration-200 ease-out",
        )}
      >
        <header className="border-b border-zinc-200 px-4 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          <div className="mx-auto flex max-w-4xl flex-row items-center border-x border-zinc-200 *:border-r *:border-zinc-200 dark:border-zinc-700 *:dark:border-zinc-700">
            <Link
              href="/"
              className="font-display text-accent dark:text-accent-dark px-4 py-2 text-lg font-bold sm:text-xl"
            >
              Akhila Ariyachandra
            </Link>

            <Link
              href="/blog"
              className="px-3 py-2 text-base font-medium sm:text-lg"
            >
              Blog
            </Link>
          </div>
        </header>

        <main className="container max-w-4xl flex-1 border-x border-zinc-200 dark:border-zinc-700">
          {children}
        </main>

        <Footer />

        <SpeedInsights />
        <Analytics />
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
    <footer className="border-t border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
      <div className="mx-auto max-w-4xl border-x border-zinc-200 *:p-3 sm:*:p-4 dark:border-zinc-700">
        <NowPlaying />

        <p className="border-t border-zinc-200 text-sm sm:text-base dark:border-zinc-700">
          &copy; {year}{" "}
          <Link
            href="/"
            className="text-accent dark:text-accent-dark hover:underline"
          >
            Akhila Ariyachandra
          </Link>
        </p>
      </div>
    </footer>
  );
};
