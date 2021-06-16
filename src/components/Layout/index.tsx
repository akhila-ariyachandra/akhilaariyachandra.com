import React from "react";
import Script from "next/script";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <main className="wrapper place-content-between mx-auto min-h-full">
      <Header />

      {children}

      <Footer />

      <Script
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
    </main>
  );
};

export default Layout;
