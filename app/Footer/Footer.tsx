import { Suspense } from "react";
import Link from "next/link";

import BlogTotals, { TotalsDisplay } from "./BlogTotals";

const Footer = () => {
  return (
    <footer className="container mt-auto max-w-4xl p-3 text-sm text-zinc-700 dark:text-zinc-300 sm:p-4 sm:text-base">
      © {new Date().getFullYear()},{" "}
      <Link
        href="/"
        className="font-medium text-green-700 hover:underline dark:text-green-500"
      >
        akhilaariyachandra.com
      </Link>{" "}
      <Suspense fallback={<TotalsDisplay views={0} upvotes={0} />}>
        <BlogTotals />
      </Suspense>
    </footer>
  );
};

export default Footer;
