import React from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="container flex flex-col justify-between min-h-full">
      <Header />

      <main className="container p-4 max-w-4xl">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
