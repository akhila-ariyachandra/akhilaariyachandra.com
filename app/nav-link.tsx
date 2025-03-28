"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { type ComponentProps } from "react";

type NavLinkProps = ComponentProps<typeof Link>;

const NavLink = ({ children, href, ...delegated }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive =
    (pathname === "/" && href === "/") ||
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    (pathname.startsWith("/blog") && href.toString().startsWith("/blog"));

  return (
    <Link href={href} data-active={isActive ? isActive : null} {...delegated}>
      {children}
    </Link>
  );
};

export default NavLink;
