import Providers from "./providers";
import Analytics from "./analytics";
import Fonts from "./fonts";
import Layout from "@/components/Layout";
import type { ReactNode, FC } from "react";

import "./global.scss";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className="h-full overflow-y-scroll scroll-smooth">
      <head>
        <meta charSet="UTF-8" />

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

        <Fonts />
      </body>
    </html>
  );
};

export default RootLayout;
