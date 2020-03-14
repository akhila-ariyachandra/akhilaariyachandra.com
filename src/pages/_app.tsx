import React from "react"

const MyApp = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <style jsx global>{`
        body {
          font-family: "Inter", sans-serif;
        }
      `}</style>

      <Component {...pageProps} />
    </React.Fragment>
  )
}

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

export default MyApp
