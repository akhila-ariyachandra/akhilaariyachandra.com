import useViews from "@/hooks/useViews.hook";
import Link from "next/link";
import type { FC } from "react";
import { formatDate } from "@/lib/helpers";

type PostLinkProps = {
  slug: string;
  title: string;
  date: string;
};

const PostLink: FC<PostLinkProps> = ({ slug, title, date }) => {
  const { count } = useViews(slug);

  return (
    <article className="space-y-2">
      <Link href={`/blog/${slug}`}>
        <a className="font-sora text-3xl font-bold text-emerald-700 dark:text-emerald-600">
          {title}
        </a>
      </Link>

      <div className="flex flex-row gap-2 truncate font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200">
        <p className="min-w-0 truncate">{formatDate(date)}</p>

        <span>-</span>

        <p className="min-w-0 truncate">{count} views</p>
      </div>
    </article>
  );
};

export default PostLink;
