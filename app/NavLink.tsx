"use client";

import Link from "next/link";
import { type ComponentProps } from "react";
import { usePathname } from "next/navigation";

type NavLinkProps = ComponentProps<typeof Link>;

const NavLink = ({ children, href, ...delegated }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive =
    (pathname === "/" && href === "/") ||
    (pathname.startsWith("/blog") && href.toString().startsWith("/blog")) ||
    (pathname.startsWith("/snippets") &&
      href.toString().startsWith("/snippets"));

  return (
    <Link href={href} data-active={isActive ? isActive : null} {...delegated}>
      {children}
    </Link>
  );
};

export default NavLink;
