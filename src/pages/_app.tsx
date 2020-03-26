import React from "react";
import Router from "next/router";
import * as gtag from "../lib/gtag";
import { Fonts } from "../util/fonts";

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

const MyApp = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Load fonts
    Fonts();
  }, []);

  return (
    <React.Fragment>
      <style jsx global>{`
        html {
          margin-left: calc(100vw - 100%);
        }

        body {
          font-family: "Inter", sans-serif;
        }

        hr {
          border: 0;
          height: 1px;
          background: #000;
        }

        .link {
          cursor: pointer;
        }

        .link:hover {
          color: #00c853;
        }
      `}</style>

      <Component {...pageProps} />
    </React.Fragment>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
