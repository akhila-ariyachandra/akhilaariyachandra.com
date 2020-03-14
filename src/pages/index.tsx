import Layout from "../components/Layout"
import PostLink from "../components/PostLink"
import { NextPage, GetStaticProps } from "next"
import { client } from "../util/cms"
import { BlogPost } from "../util/types"

type Props = {
  blogPosts: [BlogPost]
}

const Index: NextPage<Props> = ({ blogPosts }) => {
  return (
    <Layout>
      <h1>Index</h1>

      {blogPosts.map(blogPost => (
        <PostLink blogPost={blogPost} key={blogPost.slug} />
      ))}
    </Layout>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const results = await client.getEntries({
    content_type: "blogPost",
    order: "-fields.date",
    limit: 3,
  })

  const blogPosts = results.items.map(item => {
    const blogPost: any = item.fields

    blogPost.banner = blogPost.banner.fields

    return blogPost
  })

  return {
    props: { blogPosts },
  }
}
