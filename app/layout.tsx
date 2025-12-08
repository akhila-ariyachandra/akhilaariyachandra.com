import { PRODUCTION_URL } from "@/_lib/constants";
import { cn } from "@/_lib/helpers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import Header from "./_components/header";
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
        <Header />

        <main className="container max-w-4xl flex-1 p-3 sm:p-4">
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

const Footer = async () => {
  "use cache";

  cacheLife("days");

  return (
    <footer className="container max-w-4xl p-3 text-zinc-600 sm:p-4 dark:text-zinc-300">
      <p className="text-sm sm:text-base">
        &copy; {new Date().getFullYear()}{" "}
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
