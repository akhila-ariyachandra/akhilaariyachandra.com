import "./globals.css";
import "./syntax-highlighting.css";

import type { Metadata, Route } from "next";
import { Oswald, Source_Code_Pro as SourceCodePro } from "next/font/google";
import type { ReactNode } from "react";

import { cn, getOgImage } from "@/lib/helpers";

import { Suspense } from "react";
import { Provider as WrapBalancerProvider } from "react-wrap-balancer";
import Footer from "./Footer";
import NavLink from "./NavLink";
import { PHProvider, PostHogPageview } from "./posthog";

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
  title: {
    default: "Akhila Ariyachandra",
    template: "%s | Akhila Ariyachandra",
  },
  description: "Web Developer",
  metadataBase: new URL("https://akhilaariyachandra.com"),
  openGraph: {
    title: {
      default: "Akhila Ariyachandra",
      template: "%s | Akhila Ariyachandra",
    },
    description: "Web Developer",
    url: "/",
    type: "website",
    images: getOgImage("Akhila Ariyachandra", "Web Developer"),
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
      <Suspense>
        <PostHogPageview />
      </Suspense>

      <body
        className={cn(
          "flex h-full flex-col overflow-y-scroll bg-white font-content antialiased dark:bg-zinc-950",
          "scrollbar-thin scrollbar-thumb-green-700 dark:scrollbar-thumb-green-500",
        )}
      >
        <PHProvider>
          <WrapBalancerProvider>
            <header className="container max-w-4xl p-3 sm:p-4">
              <nav className="flex flex-row items-center gap-2 sm:gap-3">
                {links.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-medium text-zinc-700 hover:underline dark:text-zinc-300 sm:text-lg",
                      "data-[active]:font-medium data-[active]:text-green-700 data-[active]:underline data-[active]:underline-offset-2 data-[active]:hover:underline-offset-1 data-[active]:dark:text-green-500 data-[active]:sm:text-lg",
                    )}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </header>

            <main className="container max-w-4xl p-3 sm:p-4">{children}</main>

            <Footer />
          </WrapBalancerProvider>
        </PHProvider>
      </body>
    </html>
  );
};

export default RootLayout;
