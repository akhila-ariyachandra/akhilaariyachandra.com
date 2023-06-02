import Link from "next/link";
import type { ComponentProps } from "react";

interface DashboardItemProps {
  title: string;
  link:
    | {
        url: ComponentProps<typeof Link>["href"];
        type: "internal";
      }
    | {
        url: string;
        type: "external";
      };
  value?: number;
}

const DashboardItem = ({ link, title, value = 0 }: DashboardItemProps) => {
  return (
    <div className="rounded-md border-2 border-zinc-600 p-2 dark:border-zinc-300">
      {link.type === "internal" ? (
        <Link
          href={link.url}
          className="flex flex-row font-sora text-2xl font-medium text-emerald-700 dark:text-emerald-600 sm:text-3xl"
        >
          {title}
        </Link>
      ) : (
        <a
          className="flex flex-row font-sora text-2xl font-medium text-emerald-700 dark:text-emerald-600 sm:text-3xl"
          target="_blank"
          rel="noopener noreferrer"
          href={link.url}
        >
          {title}
        </a>
      )}

      <div className="mt-2 font-roboto-slab text-xl font-normal text-zinc-800 dark:text-zinc-200 sm:text-2xl">
        {value}
      </div>
    </div>
  );
};

export default DashboardItem;
