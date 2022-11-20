"use client";

import useViews from "@/hooks/useViews.hook";
import Link from "next/link";
import type { FC } from "react";

interface PostLinkProps {
  slug: string;
  title: string;
  /**
   * Format date before passing as a prop because this component should not
   * import `day.js` to avoid increasing the bundle size
   */
  date: string;
}

const PostLink: FC<PostLinkProps> = ({ slug, title, date }) => {
  const { count } = useViews(slug);

  return (
    <article className="space-y-2">
      <Link
        href={`/blog/${slug}`}
        className="font-sora text-3xl font-bold text-emerald-700 dark:text-emerald-600"
      >
        {title}
      </Link>

      <div className="font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200">
        {date}

        <span className="mx-2">&bull;</span>

        {`${count} views`}
      </div>
    </article>
  );
};

export default PostLink;
