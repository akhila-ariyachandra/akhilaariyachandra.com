import Link from "next/link";
import type { FC, ReactNode } from "react";
import { useRouter } from "next/router";

interface NavLinkProps {
  href: string;
  activePath: RegExp;
  children: ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ href, activePath, children }) => {
  const router = useRouter();
  const enabled = activePath.test(router.pathname);

  return (
    <Link
      href={href}
      className={`font-sora text-lg font-medium ${
        enabled
          ? "text-emerald-700 dark:text-emerald-600"
          : "text-zinc-800 dark:text-zinc-200"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
