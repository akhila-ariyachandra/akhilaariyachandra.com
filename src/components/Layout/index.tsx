import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Layout/Header";
const Footer = dynamic(() => import("@/components/Layout/Footer"));

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
