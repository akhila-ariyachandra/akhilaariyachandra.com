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
    title: config.title,
    description: config.description,
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
  other: {
    "google-site-verification": "SCtCAdftAAE0UptAZAoIYsHnG7xbuN_ofCaHgfDyjn4", // Google Search Console Verification
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
