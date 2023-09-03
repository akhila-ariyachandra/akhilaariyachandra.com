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
  ...delegated
}: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      className={
        pathname === "/" ||
        pathname.startsWith("/blog") ||
        pathname.startsWith("/snippets")
          ? activeClassName
          : className
      }
      {...delegated}
    >
      {children}
    </Link>
  );
};

export default NavLink;
