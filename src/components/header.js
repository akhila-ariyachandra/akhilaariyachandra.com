import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, location }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSocialLink(sort: { order: ASC, fields: createdAt }) {
        nodes {
          name
          link
        }
      }
    }
  `)

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>

        <h2 style={{ margin: 0 }}>
          <Link to="/blog" style={{ textDecoration: `none` }}>
            {`Blog`}
          </Link>
        </h2>

        <h2 style={{ margin: 0 }}>
          <Link to="/about" style={{ textDecoration: `none` }}>
            {`About`}
          </Link>
        </h2>

        {data.allContentfulSocialLink.nodes.map(socialLink => (
          <a
            href={socialLink.link}
            rel="noopener noreferrer"
            target="_blank"
            style={{ textDecoration: `none` }}
          >
            <h2>{socialLink.name}</h2>
          </a>
        ))}
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  location: PropTypes.object.isRequired,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
