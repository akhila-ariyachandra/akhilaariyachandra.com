import Link from "next/link";
import NavLink from "./NavLink";
import Providers from "./providers";
import type { ReactNode } from "react";
import type { Metadata, Route } from "next";
import { Oswald, Source_Code_Pro as SourceCodePro } from "next/font/google";
import { cn, getOgImages } from "@/lib/helpers";
import { Provider } from "react-wrap-balancer";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const display = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const content = SourceCodePro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-content",
});

export const metadata: Metadata = {
  title: "Akhila Ariyachandra",
  description: "Web Developer",
  openGraph: {
    title: "Akhila Ariyachandra",
    description: "Web Developer",
    url: "https://akhilaariyachandra.com",
    type: "website",
    images: getOgImages("Akhila Ariyachandra", "Web Developer"),
  },
  twitter: {
    card: "summary_large_image",
    creator: "@heshan_1010",
  },
  other: {
    "google-site-verification": "SCtCAdftAAE0UptAZAoIYsHnG7xbuN_ofCaHgfDyjn4", // Google Search Console Verification
  },
};

const links: Array<{ label: string; href: Route }> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Snippets",
    href: "/snippets",
  },
];

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={cn(display.variable, content.variable, "h-full scroll-smooth")}
    >
      <body
        className={cn(
          "flex h-full flex-col overflow-y-scroll bg-white font-content antialiased dark:bg-zinc-950",
          "scrollbar-thin scrollbar-thumb-green-700 dark:scrollbar-thumb-green-500",
        )}
      >
        <Providers>
          <Provider>
            <header className="container max-w-4xl p-3 sm:p-4">
              <nav className="flex flex-row items-center gap-2 sm:gap-3">
                {links.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    className="font-medium text-zinc-700 hover:underline dark:text-zinc-300 sm:text-lg"
                    activeClassName="font-medium sm:text-lg underline text-green-700 dark:text-green-500 underline-offset-2 hover:underline-offset-1"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </header>

            <main className="container max-w-4xl p-3 sm:p-4">{children}</main>

            <footer className="container mt-auto max-w-4xl p-3 text-sm text-zinc-700 dark:text-zinc-300 sm:p-4 sm:text-base">
              © 2019 - {new Date().getFullYear()},{" "}
              <Link
                href="/"
                className="font-medium text-green-700 hover:underline dark:text-green-500"
              >
                akhilaariyachandra.com
              </Link>
            </footer>
          </Provider>

          <Analytics />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
