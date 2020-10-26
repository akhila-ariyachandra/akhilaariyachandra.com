import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import SpecialBlock from "src/components/post/SpecialBlock";
import CodeBlock from "src/components/post/CodeBlock";
import Image from "next/image";
import HitCounter from "src/components/post/HitCounter";
import hydrate from "next-mdx-remote/hydrate";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { getAllPostIds, getPostData } from "src/lib/posts";
import { Post } from "src/lib/types";

const mdxComponents = {
  SpecialBlock,
  pre: (props) => <div {...props} className="next-highlight" />,
  code: CodeBlock,
};

type Props = {
  postData: Post;
};

const BlogPost: NextPage<Props> = ({ postData }) => {
  const content = hydrate(postData.content, {
    components: mdxComponents,
  });

  return (
    <Layout>
      <SEO
        title={postData.title}
        description={postData.description}
        image={postData.banner}
      />

      <div className="my-4 pseudo-full-bleed lg:rounded-lg overflow-hidden">
        <Image
          src={postData.banner}
          alt={postData.title}
          title={postData.title}
          width={1200}
          height={630}
        />
      </div>

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

      <h1 className="pseudo-full-bleed text-4xl sm:text-5xl font-black text-center px-4 my-4">
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

      <div className="prose sm:prose-xl p-4">{content}</div>

      <div className="flex justify-center">
        <HitCounter />
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
