import Link from "next/link";
import type { FunctionComponent } from "react";
import { formatDate } from "@/lib/helpers";

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
        <a className="dark:text-green-600 text-green-700 font-sora text-3xl font-bold">
          {post.title}
        </a>
      </Link>

      <div className="flex flex-row dark:text-gray-200 text-gray-800 font-roboto-slab text-lg font-medium truncate">
        <p className="min-w-0 truncate">{formatDate(post.date)}</p>

        <span className="mx-2">-</span>

        <p className="min-w-0 truncate">{`${hits} views`}</p>
      </div>
    </article>
  );
};

export default PostLink;
