import Layout from "../components/Layout"
import { NextPage, GetStaticProps, GetStaticPaths } from "next"
import { client } from "../util/cms"
import { BlogPost } from "../util/types"

type Props = {
  blogPost: BlogPost
}

const Post: NextPage<Props> = ({ blogPost }) => {
  return (
    <Layout>
      <h1>{blogPost.title}</h1>
    </Layout>
  )
}

export default Post

export const getStaticProps: GetStaticProps = async context => {
  const results = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": context.params.slug,
  })

  const blogPosts = results.items.map(item => {
    const blogPost: any = item.fields

    blogPost.banner = blogPost.banner.fields

    return blogPost
  })

  return {
    props: { blogPost: blogPosts[0] },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const results = await client.getEntries({
    content_type: "blogPost",
  })

  const paths = results.items.map(item => {
    const blogPost: any = item.fields

    return {
      params: {
        slug: blogPost.slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
