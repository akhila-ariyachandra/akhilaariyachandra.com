import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import Markdown from "markdown-to-jsx";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { getAllPostIds, getPostData } from "src/lib/posts";
import { Post } from "src/lib/types";

type Props = {
  postData: Post;
};

const BlogPost: NextPage<Props> = ({ postData }) => {
  return (
    <Layout>
      <SEO title={postData.title} />

      <h1 className="text-4xl sm:text-5xl font-black px-4 my-4">
        {postData.title}
      </h1>

      <p className="text-lg sm:text-xl font-medium px-4 my-2">
        {postData.formattedDate}
      </p>

      <div className="prose sm:prose-xl p-4">
        <Markdown children={postData.content} />
      </div>
    </Layout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
};
