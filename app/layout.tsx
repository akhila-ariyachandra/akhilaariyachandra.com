import { cn, getOgImage } from "@/_utils/helpers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Route } from "next";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import NextTopLoader from "nextjs-toploader";
import type { ReactNode } from "react";
import { Provider as WrapBalancerProvider } from "react-wrap-balancer";
import "./globals.css";
import NavLink from "./nav-link";
import "./syntax-highlighting.css";
import ThemeSwitcher from "./theme-switcher";

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
];

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={cn(
        GeistMono.variable,
        GeistSans.variable,
        "h-full scroll-smooth",
      )}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "flex h-full flex-col overflow-y-scroll bg-white font-content antialiased dark:bg-zinc-950",
          "scrollbar-thin scrollbar-thumb-green-700 dark:scrollbar-thumb-green-500",
          "transition-colors duration-200 ease-out",
        )}
      >
        <ThemeProvider attribute="class">
          <NextTopLoader color="#22c55e" showSpinner={false} />

          <WrapBalancerProvider>
            <header className="container flex max-w-4xl flex-row items-center justify-between gap-4 p-3 sm:p-4">
              <nav className="flex flex-row items-center gap-2 sm:gap-3">
                {links.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-medium text-zinc-700 hover:underline sm:text-lg dark:text-zinc-300",
                      "data-[active]:font-medium data-[active]:text-green-700 data-[active]:underline data-[active]:underline-offset-2 data-[active]:hover:underline-offset-1 data-[active]:sm:text-lg data-[active]:dark:text-green-500",
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
          </WrapBalancerProvider>

          <SpeedInsights />
          {!!process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID && (
            <GoogleAnalytics
              gaId={process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}
            />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
