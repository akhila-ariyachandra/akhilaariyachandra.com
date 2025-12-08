"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import HeaderBase from "./header-base";

const HeaderRoot = () => {
  const pathname = usePathname();

  return <HeaderBase pathname={pathname} />;
};

const Header = () => {
  return (
    <Suspense fallback={<HeaderBase />}>
      <HeaderRoot />
    </Suspense>
  );
};

export default Header;
