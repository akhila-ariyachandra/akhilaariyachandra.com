import { formatDate } from "@/lib/helpers";
import Link from "next/link";
import type { FunctionComponent } from "react";

type Props = {
  post: {
    id: string;
    title: string;
    date: string;
  };
  hits: number;
};

const PostLink: FunctionComponent<Props> = ({ post, hits }) => {
  return (
    <article className="space-y-2">
      <Link href={`/blog/${post.id}`}>
        <a className="font-sora text-3xl font-bold text-emerald-700 dark:text-emerald-600">
          {post.title}
        </a>
      </Link>

      <div className="flex flex-row truncate font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200">
        <p className="min-w-0 truncate">{formatDate(post.date)}</p>

        <span className="mx-2">-</span>

        <p className="min-w-0 truncate">{`${hits} views`}</p>
      </div>
    </article>
  );
};

export default PostLink;
