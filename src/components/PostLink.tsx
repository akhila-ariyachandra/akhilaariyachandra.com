import Link from "next/link";
import { FunctionComponent } from "react";
import { Post } from "src/lib/types";

type Props = {
  post: Post;
};

const PostLink: FunctionComponent<Props> = ({ post }) => {
  return (
    <article className="space-y-2">
      <Link href={`/${post.id}`}>
        <a className="text-3xl sm:text-4xl font-bold">{post.title}</a>
      </Link>

      <p className="text-lg sm:text-xl font-medium">{post.formattedDate}</p>
    </article>
  );
};

export default PostLink;
