import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
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
      </Head>

      <body className="bg-white dark:bg-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
