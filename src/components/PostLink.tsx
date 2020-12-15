import Link from "next/link";
import type { FunctionComponent } from "react";
import type { Post } from "src/lib/types";

type Props = {
  post: Post;
};

const PostLink: FunctionComponent<Props> = ({ post }) => {
  return (
    <article className="space-y-2">
      <Link href={`/${post.id}`}>
        <a className="text-3xl font-bold text-green-700 dark:text-green-600">
          {post.title}
        </a>
      </Link>

      <p className="text-lg font-medium text-black dark:text-white">
        {post.formattedDate}
      </p>
    </article>
  );
};

export default PostLink;
