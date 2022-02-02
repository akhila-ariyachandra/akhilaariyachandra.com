import Link from "next/link";
import type { FC } from "react";
import { useRouter } from "next/router";

const NavLink: FC<{
  href: string;
  activePath: RegExp;
}> = ({ href, activePath, children }) => {
  const router = useRouter();
  const enabled = activePath.test(router.pathname);

  return (
    <Link href={href}>
      <a
        className={`font-sora text-lg font-medium ${
          enabled
            ? "text-emerald-700 dark:text-emerald-600"
            : "text-gray-800 dark:text-gray-200 "
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
