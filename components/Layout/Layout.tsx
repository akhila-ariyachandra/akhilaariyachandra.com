import Header from "./Header";
import Footer from "./Footer";
import type { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />

      <main className="container w-full max-w-3xl p-4">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
