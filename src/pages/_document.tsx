import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "../lib/gtag";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" href="/icon.png" />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/images/icons/icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="72x72"
            href="/images/icons/icon-72x72.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/images/icons/icon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="128x128"
            href="/images/icons/icon-128x128.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="144x144"
            href="/images/icons/icon-144x144.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="72x72"
            href="/images/icons/icon-152x152.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="72x72"
            href="/images/icons/icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="72x72"
            href="/images/icons/icon-384x384.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="72x72"
            href="/images/icons/icon-512x512.png"
          />
          <link rel="manifest" href="/manifest.json" />

          <meta name="theme-color" content="#00C853" />

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
