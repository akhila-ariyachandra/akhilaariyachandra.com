import config from "@/lib/config";
import Link from "next/link";
import ThemeSwitch from "@/components/Layout/ThemeSwitch";
import { useRouter } from "next/router";

const Header: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <header className="container sticky z-40 top-0 flex flex-row-reverse items-center justify-between p-4 w-full max-w-4xl dark:bg-gray-900 bg-white bg-opacity-75 backdrop-blur-xl backdrop-filter">
      <ThemeSwitch />

      {router.pathname !== "/" && (
        <Link href="/">
          <a className="dark:text-emerald-600 text-emerald-700 font-sora text-xl font-bold leading-5 sm:text-2xl">
            {config.title}
          </a>
        </Link>
      )}
    </header>
  );
};

export default Header;
