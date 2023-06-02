import Header from "./Header";
import Footer from "./Footer";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <Header />

      <main className="container w-full max-w-3xl p-4">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
