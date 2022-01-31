import ThemeSwitch from "@/components/Layout/ThemeSwitch";
import NavLink from "@/components/Layout/Header/NavLink";

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

const Header: React.FunctionComponent = () => {
  return (
    <header className="container sticky top-0 z-40 flex w-full max-w-4xl flex-row items-center justify-between gap-4 bg-white bg-opacity-75 p-4 backdrop-blur-xl backdrop-filter dark:bg-gray-900">
      {NAV_LINKS.map(({ label, href, activePath }) => (
        <NavLink key={href} href={href} activePath={activePath}>
          {label}
        </NavLink>
      ))}

      <span className="flex-1" />

      <ThemeSwitch />
    </header>
  );
};

export default Header;
