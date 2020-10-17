import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "src/styles/index.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider defaultTheme="dark">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
