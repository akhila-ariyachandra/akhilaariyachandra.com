import Link from "next/link";
import ListContainer from "@/components/ListContainer";
import { getCodeSnippets } from "@/utils/sanity";

// https://beta.nextjs.org/docs/api-reference/segment-config
export const revalidate = 300;

const SnippetsPage = async () => {
  const snippets = await getCodeSnippets();

  return (
    <ListContainer title="Code Snippets">
      {snippets.map((snippet) => (
        <article key={snippet.slug.current} className="space-y-2">
          <Link
            href={`/snippets/${snippet.slug.current}`}
            className="font-sora text-2xl font-bold text-emerald-700 dark:text-emerald-600 sm:text-3xl"
          >
            {snippet.title}
          </Link>

          <p className="font-roboto-slab text-base font-medium text-zinc-800 dark:text-zinc-200 sm:text-lg">
            {snippet.description}
          </p>
        </article>
      ))}
    </ListContainer>
  );
};

export default SnippetsPage;
