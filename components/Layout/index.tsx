import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto flex min-h-full flex-col justify-between">
      <Header />

      <main className="container w-full max-w-3xl p-4">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
