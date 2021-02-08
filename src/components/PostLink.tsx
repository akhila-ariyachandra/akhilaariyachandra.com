import Link from "next/link";
import type { FunctionComponent } from "react";
import type { Post } from "src/lib/types";

type Props = {
  post: Post;
};

const PostLink: FunctionComponent<Props> = ({ post }) => {
  return (
    <article className="space-y-2">
      <Link href={`/blog/${post.id}`}>
        <a className="dark:text-green-600 text-green-700 text-3xl font-bold">
          {post.title}
        </a>
      </Link>

      <p className="dark:text-gray-200 text-gray-800 text-lg font-medium">
        {post.formattedDate}
      </p>
    </article>
  );
};

export default PostLink;
