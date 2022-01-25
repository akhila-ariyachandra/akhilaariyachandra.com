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
          className={`rounded p-2 text-2xl ${
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
        <span className="rounded bg-yellow-200 px-2 py-1 leading-none dark:bg-emerald-800">
          {label}
        </span>
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

export default NavLink;
