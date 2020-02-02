import React from "react"
import PropTypes from "prop-types"
import readingTime from "reading-time"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map(post => {
        const title = post.title || post.slug
        return (
          <article key={post.slug} style={{ margin: `${rhythm(2)} 0` }}>
            <header>
              <Link to={`/${post.slug}`}>
                <h3>{title}</h3>
              </Link>

              <small>
                {`${post.date} `}&#8226;
                {` ${readingTime(post.content.content).text}`}
              </small>
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
