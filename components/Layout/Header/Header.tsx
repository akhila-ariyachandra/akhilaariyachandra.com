import dynamic from "next/dynamic";
import NavLink from "./NavLink";
import ThemeSwitch from "./ThemeSwitch";
const NavDialog = dynamic(() => import("./NavDialog"), {
  suspense: true,
});
import type { FC } from "react";
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/router";
import { MdMenu } from "react-icons/md";

const NAV_LINKS: {
  label: string;
  href: string;
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
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = () => {
      setDialogOpen(false);
    };

    router.events.on("routeChangeStart", handleStart);

    return () => {
      router.events.off("routeChangeStart", handleStart);
    };
  }, [router]);

  return (
    <header className="container flex w-full max-w-3xl flex-row items-center justify-between gap-4 p-4">
      <nav className="hidden sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        {NAV_LINKS.map(({ label, href, activePath }) => (
          <NavLink key={href} href={href} activePath={activePath}>
            {label}
          </NavLink>
        ))}
      </nav>

      <Suspense
        fallback={
          <button
            className="text-2xl text-zinc-800 dark:text-zinc-200 sm:hidden"
            aria-label="Mobile navigation dialog button"
          >
            <MdMenu />
          </button>
        }
      >
        <NavDialog
          isOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          navLinks={NAV_LINKS}
          trigger={
            <button
              className="text-2xl text-zinc-800 dark:text-zinc-200 sm:hidden"
              aria-label="Mobile navigation dialog button"
            >
              <MdMenu />
            </button>
          }
        />
      </Suspense>

      <span className="flex-1" />

      <ThemeSwitch />
    </header>
  );
};

export default Header;
