import PostLink from "@/components/PostLink";
import { desc } from "drizzle-orm";
import { allPosts, type Post } from ".contentlayer/generated";
import { db } from "@/db/connection";
import { views } from "@/db/schema";

const getMostPopularPosts = async () => {
  const topViews = await db
    .select()
    .from(views)
    .orderBy(desc(views.count))
    .limit(3);

  const topViewSlugs = topViews.map((item) => item.slug);

  const posts = allPosts.filter((post) => topViewSlugs.includes(post.slug));

  return posts as Post[];
};

const MostPopularPosts = async () => {
  const posts = await getMostPopularPosts();

  return (
    <>
      {posts.map((post) => (
        <PostLink
          key={post.slug}
          title={post.title}
          slug={post.slug}
          date={post.posted}
        />
      ))}
    </>
  );
};

export default MostPopularPosts;
