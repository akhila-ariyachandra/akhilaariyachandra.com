"use client";

import dayjs from "dayjs";
import useViews from "@/hooks/useViews.hook";
import Link from "next/link";
import type { FC } from "react";
import { formatDate } from "@/lib/helpers";

interface PostLinkProps {
  slug: string;
  title: string;
  date: string;
}

const PostLink: FC<PostLinkProps> = ({ slug, title, date }) => {
  const { count } = useViews(slug);

  return (
    <article className="space-y-2">
      <Link
        href={`/blog/${slug}`}
        className="font-sora text-2xl font-bold text-emerald-700 dark:text-emerald-600 sm:text-3xl"
      >
        {title}
      </Link>

      <div className="font-roboto-slab text-base font-medium text-zinc-800 dark:text-zinc-200 sm:text-lg">
        <time dateTime={dayjs(date).toISOString()}>{formatDate(date)}</time>

        <span className="mx-2">&bull;</span>

        {`${count} views`}
      </div>
    </article>
  );
};

export default PostLink;
