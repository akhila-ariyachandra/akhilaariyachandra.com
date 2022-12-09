import type { ReactNode, FC } from "react";

import "./global.scss";

interface CMSRootLayoutProps {
  children: ReactNode;
}

const CMSRootLayout: FC<CMSRootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default CMSRootLayout;
