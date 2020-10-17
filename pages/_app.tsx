import { ThemeProvider } from "next-themes";

import "src/styles/index.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider defaultTheme="dark">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
