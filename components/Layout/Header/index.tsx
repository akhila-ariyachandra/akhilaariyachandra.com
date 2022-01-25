import ThemeSwitch from "@/components/Layout/ThemeSwitch";
import NavLink from "@/components/Layout/Header/NavLink";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { IconType } from "react-icons";
import { FaHome, FaPencilAlt, FaCode, FaChartBar } from "react-icons/fa";

const NAV_LINKS: {
  label: string;
  Icon: IconType;
  href: string;
  activePath: RegExp;
}[] = [
  {
    label: "Home",
    Icon: FaHome,
    href: "/",
    activePath: /^\/$/,
  },
  {
    label: "Blog",
    Icon: FaPencilAlt,
    href: "/blog",
    activePath: /^\/blog*/,
  },
  {
    label: "Snippets",
    Icon: FaCode,
    href: "/snippets",
    activePath: /^\/snippets*/,
  },
  {
    label: "Dashboard",
    Icon: FaChartBar,
    href: "/dashboard",
    activePath: /^\/dashboard$/,
  },
];

const Header: React.FunctionComponent = () => {
  return (
    <Tooltip.Provider>
      <header className="container sticky top-0 z-40 flex w-full max-w-4xl flex-row items-center justify-between gap-4 bg-white bg-opacity-75 p-4 backdrop-blur-xl backdrop-filter dark:bg-gray-900">
        {NAV_LINKS.map(({ label, Icon, href, activePath }) => (
          <NavLink
            key={label}
            label={label}
            href={href}
            activePath={activePath}
          >
            <Icon />
          </NavLink>
        ))}

        <span className="flex-1" />

        <ThemeSwitch />
      </header>
    </Tooltip.Provider>
  );
};

export default Header;
