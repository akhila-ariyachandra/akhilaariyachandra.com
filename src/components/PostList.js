import React from "react"
import PropTypes from "prop-types"
import readingTime from "reading-time"
import { Link } from "gatsby"

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map(post => {
        const title = post.title || post.slug
        return (
          <article key={post.slug}>
            <header>
              <h3>
                <Link style={{ boxShadow: `none` }} to={post.slug}>
                  {title}
                </Link>
              </h3>
              <small>{post.date}</small>
              <small>{readingTime(post.content.content).text}</small>
            </header>
            <section>
              <p>{post.description}</p>
            </section>
          </article>
        )
      })}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PostList
