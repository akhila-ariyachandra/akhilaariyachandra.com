import React from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="flex flex-col justify-between mx-auto min-h-full">
      <Header />

      <main className="container p-4 w-full max-w-3xl">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
