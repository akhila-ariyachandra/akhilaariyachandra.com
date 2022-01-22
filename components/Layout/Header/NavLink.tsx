import * as Tooltip from "@radix-ui/react-tooltip";
import type { FC } from "react";
import { useRouter } from "next/router";

const NavLink: FC<{
  label: string;
  href: string;
  activePath: RegExp;
}> = ({ label, href, activePath, children }) => {
  const router = useRouter();
  const enabled = activePath.test(router.pathname);

  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger asChild>
        <a
          href={href}
          aria-label={`${label} navigation link`}
          className={`p-2 rounded text-2xl ${
            enabled
              ? "bg-emerald-200 dark:bg-gray-800"
              : "text-gray-800 dark:text-gray-200"
          } hover:bg-yellow-200 dark:hover:bg-emerald-800`}
          onClick={(e) => {
            e.preventDefault();
            router.push(href);
          }}
        >
          {children}
        </a>
      </Tooltip.Trigger>

      <Tooltip.Content sideOffset={10}>
        <span className="px-2 py-1 bg-yellow-200 dark:bg-emerald-800 leading-none rounded">
          {label}
        </span>
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

export default NavLink;
