const postQuery = `
{
    posts: allContentfulBlogPost(sort: {fields: date, order: DESC}) {
      nodes {
        slug
        title
        description
        date(formatString: "MMMM D, YYYY")
        content {
          childMarkdownRemark {
            timeToRead
          }
        }
        tags
      }
    }
}
`

const flatten = arr =>
  arr.map(({ content, ...rest }) => {
    const { childMarkdownRemark } = content
    const { timeToRead } = childMarkdownRemark

    return {
      timeToRead,
      ...rest,
    }
  })

const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.nodes),
    indexName: `Posts`,
    settings,
  },
]

module.exports = queries
