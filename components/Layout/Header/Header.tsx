"use client";

import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import type { ComponentProps } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="container flex w-full max-w-3xl flex-row items-center justify-between gap-8 p-4 sm:min-h-[74px]">
      <nav className="flex flex-row flex-wrap items-center gap-1">
        {NAV_LINKS.map(({ label, href, activePath }) => (
          <Link
            key={label}
            href={href}
            className="relative px-3 py-1 font-display text-base font-medium leading-none text-zinc-800 dark:text-zinc-200 sm:text-lg"
          >
            {!!pathname && activePath.test(pathname) && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-zinc-800 mix-blend-difference dark:bg-zinc-200"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            {label}
          </Link>
        ))}
      </nav>

      <ThemeSwitch />
    </header>
  );
};

export default Header;
