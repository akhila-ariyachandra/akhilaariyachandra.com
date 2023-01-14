import ListContainer from "@/components/ListContainer";
import PostLink from "@/components/PostLink";
import { getBlogPosts } from "@/utils/sanity";

// https://beta.nextjs.org/docs/api-reference/segment-config
export const revalidate = 300;

const BlogPage = async () => {
  const blogPosts = await getBlogPosts();

  return (
    <ListContainer title="Blog">
      {blogPosts.map(({ slug, date, title }) => (
        <PostLink
          slug={slug.current}
          title={title}
          date={date}
          key={slug.current}
        />
      ))}
    </ListContainer>
  );
};

export default BlogPage;
