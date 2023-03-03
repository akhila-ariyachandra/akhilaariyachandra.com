"use client";

import clsx from "classnames";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import type { FC, ComponentProps } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS: {
  label: string;
  href: ComponentProps<typeof Link>["href"];
  activePath: RegExp;
}[] = [
  {
    label: "Home",
    href: "/",
    activePath: /^\/$/,
  },
  {
    label: "Blog",
    href: "/blog",
    activePath: /^\/blog*/,
  },
  {
    label: "Snippets",
    href: "/snippets",
    activePath: /^\/snippets*/,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    activePath: /^\/dashboard$/,
  },
];

const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className="container flex w-full max-w-3xl flex-row items-center justify-between gap-8 p-4 sm:min-h-[74px]">
      <nav className="flex flex-row flex-wrap items-center gap-4">
        {NAV_LINKS.map(({ label, href, activePath }) => (
          <Link
            key={label}
            href={href}
            className={clsx(
              "font-sora text-base font-medium sm:text-lg",
              pathname && activePath.test(pathname)
                ? "text-emerald-700 dark:text-emerald-600"
                : "text-zinc-800 dark:text-zinc-200"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      <ThemeSwitch />
    </header>
  );
};

export default Header;
