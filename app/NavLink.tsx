"use client";

import Link from "next/link";
import { type ComponentProps } from "react";
import { usePathname } from "next/navigation";

type NavLinkProps = ComponentProps<typeof Link> & {
  activeClassName?: ComponentProps<typeof Link>["className"];
};

const NavLink = ({
  className,
  activeClassName,
  children,
  href,
  ...delegated
}: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      className={
        (pathname === "/" && href === "/") ||
        (pathname.startsWith("/blog") && href.toString().startsWith("/blog")) ||
        (pathname.startsWith("/snippets") &&
          href.toString().startsWith("/snippets"))
          ? activeClassName
          : className
      }
      href={href}
      {...delegated}
    >
      {children}
    </Link>
  );
};

export default NavLink;
