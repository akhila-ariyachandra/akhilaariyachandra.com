import ThemeSwitch from "@/components/Layout/ThemeSwitch";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";

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
    label: "Career",
    href: "/career",
    activePath: /^\/career$/,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    activePath: /^\/dashboard$/,
  },
];

const NavLink: FC<{
  href: string;
  activePath: RegExp;
  children: ReactNode;
}> = ({ href, activePath, children }) => {
  const router = useRouter();
  const enabled = activePath.test(router.pathname);

  return (
    <Link href={href}>
      <a
        className={`font-sora text-lg font-medium ${
          enabled
            ? "text-emerald-700 dark:text-emerald-600"
            : "text-zinc-800 dark:text-zinc-200"
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

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
    <header className="container flex w-full max-w-4xl flex-row items-center justify-between gap-4 bg-white bg-opacity-75 p-4 dark:bg-zinc-900">
      <nav className="hidden sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        {NAV_LINKS.map(({ label, href, activePath }) => (
          <NavLink key={href} href={href} activePath={activePath}>
            {label}
          </NavLink>
        ))}
      </nav>

      <Dialog.Root open={dialogOpen}>
        <Dialog.Trigger asChild onClick={() => setDialogOpen(true)}>
          <button className="text-2xl text-zinc-800 dark:text-zinc-200 sm:hidden">
            <MdMenu />
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-30 grid place-items-center bg-black bg-opacity-80 backdrop-blur-sm">
            <Dialog.Content
              className="m-4 w-full max-w-xs"
              onInteractOutside={() => setDialogOpen(false)}
            >
              <Dialog.Close asChild onClick={() => setDialogOpen(false)}>
                <button className="p-2 text-lg text-zinc-800 dark:text-zinc-200">
                  <MdClose />
                </button>
              </Dialog.Close>

              <div className="flex h-full flex-col gap-3 rounded-md bg-white py-2 px-4 dark:bg-zinc-900">
                {NAV_LINKS.map(({ label, href, activePath }) => (
                  <NavLink key={href} href={href} activePath={activePath}>
                    {label}
                  </NavLink>
                ))}
              </div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>

      <span className="flex-1" />

      <ThemeSwitch />
    </header>
  );
};

export default Header;
