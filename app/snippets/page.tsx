import type { Metadata } from "next";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import Title from "@/components/Title";
import { getOgImage } from "@/lib/helpers";

import { allSnippets } from ".contentlayer/generated";

export const metadata: Metadata = {
  title: "Code Snippets | Akhila Ariyachandra",
  description: "Some code snippets that I use",
  openGraph: {
    title: "Code Snippets | Akhila Ariyachandra",
    description: "Some code snippets that I use",
    url: "/snippets",
    type: "website",
    images: getOgImage("Code Snippets", "Akhila Ariyachandra"),
  },
  alternates: {
    canonical: "/snippets",
  },
};

const SnippetsPage = () => {
  return (
    <>
      <Title>Snippets</Title>

      <ul className="space-y-2 sm:space-y-3">
        {allSnippets.map((snippet) => (
          <li key={snippet.slug}>
            <Link
              href={`/snippets/${snippet.slug}`}
              className="font-display text-xl font-medium text-green-700 hover:underline dark:text-green-500 sm:text-2xl"
            >
              <Balancer>{snippet.title}</Balancer>
            </Link>

            <div className="text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
              {snippet.description}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SnippetsPage;
