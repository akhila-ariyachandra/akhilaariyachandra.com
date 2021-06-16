import React from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <main className="wrapper place-content-between mx-auto min-h-full">
      <Header />

      {children}

      <Footer />
    </main>
  );
};

export default Layout;
