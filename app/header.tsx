"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="mx-auto w-full max-w-4xl p-3 sm:mt-40 sm:p-4">
      <nav className="flex items-center gap-4 text-base font-medium text-zinc-600 sm:text-lg dark:text-zinc-300">
        <Link
          href="/"
          data-active={pathname === "/" ? true : false}
          className="data-[active=true]:text-accent dark:data-[active=true]:text-accent-dark"
        >
          Home
        </Link>

        <Link
          href="/blog"
          data-active={pathname.startsWith("/blog") ? true : false}
          className="data-[active=true]:text-accent dark:data-[active=true]:text-accent-dark"
        >
          Blog
        </Link>
      </nav>
    </header>
  );
};

export default Header;
