import Link from "next/link";

const Header = ({ pathname }: { pathname?: string }) => {
  return (
    <header className="container max-w-4xl p-3 sm:mt-40 sm:p-4">
      <nav className="flex items-center gap-4 text-base font-medium text-zinc-600 sm:text-lg dark:text-zinc-300">
        <Link
          href="/"
          data-active={pathname === "/" ? true : false}
          className="data-[active=true]:text-accent dark:data-[active=true]:text-accent-dark underline-offset-2 hover:underline"
        >
          Home
        </Link>

        <Link
          href="/blog"
          data-active={pathname?.startsWith("/blog") ? true : false}
          className="data-[active=true]:text-accent dark:data-[active=true]:text-accent-dark underline-offset-2 hover:underline"
        >
          Blog
        </Link>
      </nav>
    </header>
  );
};

export default Header;
