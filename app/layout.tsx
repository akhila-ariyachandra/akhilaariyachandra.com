import clsx from "classnames";
import config from "@/lib/config";
import Providers from "./providers";
import Analytics from "./analytics";
import Layout from "@/components/Layout";
import type { ReactNode, FC } from "react";
import { Sora, Roboto_Slab as RobotoSlab } from "next/font/google";

import "./global.scss";

const sora = Sora({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sora",
});
const robotoSlab = RobotoSlab({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

export const metadata = {
  title: config.title,
  description: config.description,
  openGraph: {
    url: config.siteUrl,
    type: "website",
    images: [
      {
        url: `${config.siteUrl}/cover-pic.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: config.author.twitter,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html
      lang="en"
      className={clsx(
        "h-full overflow-y-scroll scroll-smooth",
        sora.variable,
        robotoSlab.variable
      )}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2f855a" />
        <meta name="apple-mobile-web-app-title" content="Akhila Ariyachandra" />
        <meta name="application-name" content="Akhila Ariyachandra" />
        <meta name="msapplication-TileColor" content="#00a300" />
        <meta name="theme-color" content="#38a169" />

        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="SCtCAdftAAE0UptAZAoIYsHnG7xbuN_ofCaHgfDyjn4"
        />
      </head>

      <body className="h-full bg-white antialiased transition-colors duration-200 dark:bg-zinc-900">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>

        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
