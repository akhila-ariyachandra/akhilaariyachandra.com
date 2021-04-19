import useSWR from "swr";
import Link from "next/link";
import type { FunctionComponent } from "react";
import type { Post } from "@/lib/types";
import { fetcher, formatDate } from "@/lib/helpers";

type Props = {
  post: Post;
};

const PostLink: FunctionComponent<Props> = ({ post }) => {
  const { data } = useSWR(`/api/hit/${post.id}`, fetcher, {
    initialData: 0,
    revalidateOnMount: true,
  });

  return (
    <article className="space-y-2">
      <Link href={`/blog/${post.id}`}>
        <a className="dark:text-green-600 text-green-700 text-3xl font-bold">
          {post.title}
        </a>
      </Link>

      <div className="flex flex-col dark:text-gray-200 text-gray-800 text-lg font-medium sm:flex-row">
        <p>{formatDate(post.date)}</p>

        <span className="hidden mx-2 sm:block">-</span>

        <p>{`${data} views`}</p>
      </div>
    </article>
  );
};

export default PostLink;
