import Header from "src/components/Header";
import { FunctionComponent } from "react";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <main className="wrapper mx-auto">
      <Header />

      {children}
    </main>
  );
};

export default Layout;
