"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentProps } from "react";

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
