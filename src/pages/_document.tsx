import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="/icon.png" />
          <link rel="manifest" href="/manifest.json" />

          <meta name="theme-color" content="#00C853" />
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
