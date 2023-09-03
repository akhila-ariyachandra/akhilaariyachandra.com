import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Title from "@/components/Title";
import { allSnippets } from ".contentlayer/generated";

const SnippetsPage = () => {
  return (
    <>
      <Title>Snippets</Title>

      <ul className="space-y-2 sm:space-y-3">
        {allSnippets.map((snippet) => (
          <li key={snippet.slug}>
            <Link
              href={`/snippets/${snippet.slug}`}
              className="font-display text-xl font-medium text-green-700 hover:underline sm:text-2xl"
            >
              <Balancer>{snippet.title}</Balancer>
            </Link>

            <div className="text-sm text-zinc-600 sm:text-base">
              {snippet.description}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SnippetsPage;
