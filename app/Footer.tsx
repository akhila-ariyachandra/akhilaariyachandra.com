import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container mt-auto max-w-4xl p-3 text-sm text-zinc-700 dark:text-zinc-300 sm:p-4 sm:text-base">
      © {new Date().getFullYear()},{" "}
      <Link
        href="/"
        className="font-medium text-green-700 hover:underline dark:text-green-500"
      >
        akhilaariyachandra.com
      </Link>
    </footer>
  );
};

export default Footer;
