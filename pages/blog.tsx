import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import { NextPage } from "next";

const Blog: NextPage = () => {
  return (
    <Layout>
      <SEO
        title="Blog"
        description="A blog about Javascript, React and Web Development"
      />

      <h1>Blog</h1>
    </Layout>
  );
};

export default Blog;
