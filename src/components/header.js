import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import { rhythm, scale } from "../utils/typography"

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
        marginBottom: `1.45rem`,
        marginTop: `1.45rem`,
      }}
    >
      <Link to="/" style={{ textDecoration: `none` }}>
        <h1>{siteTitle}</h1>
      </Link>

      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flex: 1 }}>
          <h2 style={{ marginRight: rhythm(0.5), ...scale(0.5) }}>
            <Link to="/blog">{`Blog`}</Link>
          </h2>

          <h2 style={{ ...scale(0.5) }}>
            <Link to="/about" style={{ textDecoration: `none` }}>
              {`About`}
            </Link>
          </h2>
        </div>

        <div style={{ display: "flex" }}>
          {data.allContentfulSocialLink.nodes.map((socialLink, index) => (
            <h2 style={{ ...scale(0.5) }} key={socialLink.link}>
              <a
                href={socialLink.link}
                rel="noopener noreferrer"
                target="_blank"
                style={{
                  textDecoration: `none`,
                  marginRight:
                    index !== data.allContentfulSocialLink.nodes.length - 1
                      ? rhythm(0.5)
                      : 0,
                }}
              >
                {socialLink.name}
              </a>
            </h2>
          ))}
        </div>
      </div>

      <hr />
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
