import ListContainer from "@/components/ListContainer";
import PostLink from "@/components/PostLink";
import { getBlogPosts } from "@/utils/sanity";

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
