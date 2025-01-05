import { type Post } from "content-collections";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "next-view-transitions";
import Views from "./views";

dayjs.extend(advancedFormat);

const PostsList = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className="space-y-2 sm:space-y-3">
      {posts
        .sort((a, b) => (dayjs(a.posted).isBefore(b.posted) ? 1 : -1))
        .map((post) => (
          <li key={post._meta.path}>
            <Link
              href={`/blog/${post._meta.path}`}
              className="text-pretty font-display text-xl font-medium tracking-tighter text-green-700 hover:underline sm:text-2xl dark:text-green-500"
              style={{
                viewTransitionName: `title-${post._meta.path}`,
              }}
            >
              {post.title}
            </Link>

            <div className="text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              <time
                dateTime={dayjs(post.posted).toISOString()}
                style={{
                  viewTransitionName: `date-${post._meta.path}`,
                }}
              >
                {`${dayjs(post.posted).format("Do MMMM YYYY")}${
                  post.updated
                    ? ` (Updated on ${dayjs(post.updated).format(
                        "Do MMMM YYYY",
                      )})`
                    : ""
                }`}
              </time>

              <span
                className="font-light text-zinc-500 dark:text-zinc-400"
                style={{
                  viewTransitionName: `separator-${post._meta.path}`,
                }}
              >
                {" - "}
              </span>

              <Views slug={post._meta.path} />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default PostsList;
