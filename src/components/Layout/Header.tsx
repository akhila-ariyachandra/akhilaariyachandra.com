import React from "react";
import config from "@/lib/config";
import Link from "next/link";

const NAV_LINKS = [
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

const Header: React.FunctionComponent = () => {
  return (
    <header className="container sticky z-40 top-0 flex flex-row items-center justify-between p-4 max-w-4xl dark:bg-gray-900 bg-white">
      <Link href="/">
        <a className="text-gray-800 hover:text-green-700 text-lg font-medium tracking-wider uppercase lg:text-xl">
          {config.title}
        </a>
      </Link>

      <nav className="ml-auto pr-4">
        <ul className="flex flex-row gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.title}>
              <Link href={link.href}>
                <a className="text-gray-800 hover:text-green-700 text-lg font-medium lg:text-xl">
                  {link.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default React.memo(Header);
