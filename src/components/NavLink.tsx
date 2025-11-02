"use client";

import { useEffect, useState } from "react";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const NavLink = ({ children, href, className }: NavLinkProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    const active =
      (pathname === "/" && href === "/") ||
      (pathname.startsWith("/blog") && href.startsWith("/blog"));
    setIsActive(active);
  }, [href]);

  return (
    <a
      href={href}
      data-active={isActive ? isActive : null}
      className={className}
    >
      {children}
    </a>
  );
};

export default NavLink;