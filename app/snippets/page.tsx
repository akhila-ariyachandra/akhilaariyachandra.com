import { allSnippets } from ".contentlayer/generated";
import Title from "@/_components/title";
import Views from "@/_components/views";
import type { Metadata } from "next";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export const metadata: Metadata = {
  title: "Code Snippets",
  description: "Some code snippets that I use",
  openGraph: {
    title: "Code Snippets",
    description: "Some code snippets that I use",
    url: "/snippets",
    type: "website",
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
              className="font-display text-xl font-medium text-green-700 hover:underline sm:text-2xl dark:text-green-500"
            >
              <Balancer>{snippet.title}</Balancer>
            </Link>

            <div className="text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              {`${snippet.description} - `}
              <Views slug={snippet.slug} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SnippetsPage;
