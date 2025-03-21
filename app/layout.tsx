"use cache";

import { PRODUCTION_URL } from "@/_lib/constants";
import { cn } from "@/_lib/helpers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Route } from "next";
import { ThemeProvider } from "next-themes";
import { Link, ViewTransitions } from "next-view-transitions";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import NavLink from "./nav-link";
import "./syntax-highlighting.css";
import ThemeSwitcher from "./theme-switcher";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
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
  other: {
    "google-site-verification": "SCtCAdftAAE0UptAZAoIYsHnG7xbuN_ofCaHgfDyjn4", // Google Search Console Verification
  },
  alternates: {
    canonical: "/",
  },
};

const links: { label: string; href: Route }[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={cn(
          geistMono.variable,
          geist.variable,
          "h-full scroll-smooth",
        )}
        suppressHydrationWarning
      >
        <body
          className={cn(
            "font-content flex h-full flex-col overflow-y-scroll bg-white antialiased dark:bg-zinc-950",
            "scrollbar-thin scrollbar-thumb-green-700 dark:scrollbar-thumb-green-500",
            "transition-colors duration-200 ease-out",
          )}
        >
          <ThemeProvider attribute="class">
            <header className="container flex max-w-4xl flex-row items-center justify-between gap-4 p-3 sm:p-4">
              <nav className="flex flex-row items-center gap-2 sm:gap-3">
                {links.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-medium text-zinc-700 hover:underline sm:text-lg dark:text-zinc-300",
                      "data-active:font-medium data-active:text-green-700 data-active:underline data-active:underline-offset-2 data-active:hover:underline-offset-1 sm:data-active:text-lg dark:data-active:text-green-500",
                    )}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <ThemeSwitcher />
            </header>

            <main className="container max-w-4xl p-3 sm:p-4">{children}</main>

            <footer className="container mt-auto max-w-4xl p-3 text-sm text-zinc-700 sm:p-4 sm:text-base dark:text-zinc-300">
              © {new Date().getFullYear()},{" "}
              <Link
                href="/"
                className="font-medium text-green-700 hover:underline dark:text-green-500"
              >
                akhilaariyachandra.com
              </Link>
            </footer>

            <SpeedInsights />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
};

export default RootLayout;
