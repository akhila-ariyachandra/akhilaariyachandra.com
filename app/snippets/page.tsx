import config from "@/lib/config";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import ListContainer from "@/components/ListContainer";
import { allSnippets } from "contentlayer/generated";

export const metadata = {
  title: `Code Snippets | ${config.title}`,
  description: "A few pieces of code I've found useful",
  openGraph: {
    title: "Code Snippets",
    description: "A few pieces of code I've found useful",
    url: `${config.siteUrl}/snippets`,
    images: [
      {
        url: `${config.siteUrl}/snippets-cover.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const SnippetsPage = async () => {
  return (
    <ListContainer title="Code Snippets">
      {allSnippets.map((snippet) => (
        <article key={snippet.slug} className="space-y-2">
          <Link
            href={`/snippets/${snippet.slug}`}
            className="block font-display text-2xl font-bold text-emerald-700 dark:text-emerald-600 sm:text-3xl"
          >
            <Balancer>{snippet.title}</Balancer>
          </Link>

          <p className="text-base font-medium text-zinc-800 dark:text-zinc-200 sm:text-lg">
            {snippet.description}
          </p>
        </article>
      ))}
    </ListContainer>
  );
};

export default SnippetsPage;
