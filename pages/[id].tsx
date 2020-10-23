import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import Markdown from "markdown-to-jsx";
import Image from "src/components/post/Image";
import SpecialBlock from "src/components/post/SpecialBlock";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { getAllPostIds, getPostData } from "src/lib/posts";
import { Post } from "src/lib/types";

type Props = {
  postData: Post;
};

const BlogPost: NextPage<Props> = ({ postData }) => {
  return (
    <Layout>
      <SEO title={postData.title} description={postData.description} />

      <img
        src={require(`../src/content/images${postData.banner}?webp"`)}
        alt={postData.title}
        title={postData.title}
        className="pseudo-full-bleed lg:rounded-lg my-4"
      />

      {postData.photographer && postData.unsplash_link ? (
        <p className="text-base sm:text-xlg font-medium text-center px-4 my-2">
          {"Photo by "}
          <a
            href={postData.unsplash_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {postData.photographer}
          </a>
        </p>
      ) : null}

      <h1 className="text-4xl sm:text-5xl font-black text-center px-4 my-4">
        {postData.title}
      </h1>

      <p className="text-lg sm:text-xl font-medium text-center px-4 my-2">
        {`Posted on ${postData.formattedDate}`}
      </p>

      {postData.updated ? (
        <p className="text-lg sm:text-xl font-medium text-center px-4 my-2">
          {`Last updated on ${postData.formattedUpdated}`}
        </p>
      ) : null}

      <div className="prose sm:prose-xl p-4">
        <Markdown
          children={postData.content}
          options={{
            overrides: {
              img: ({ children, ...props }) => (
                <Image path={props.src} title={props.alt} />
              ),
              SpecialBlock: {
                component: SpecialBlock,
              },
            },
          }}
        />
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
