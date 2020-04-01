/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ description, lang, meta, title, image }) => {
  const { site, picture } = useStaticQuery(
    graphql`
      query {
        picture: file(absolutePath: { regex: "/cover-pic.jpg/" }) {
          childImageSharp {
            fixed(width: 1200, height: 630) {
              src
            }
          }
        }
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const titleTemplate =
    title === site.siteMetadata.title
      ? "%s"
      : `%s | ${site.siteMetadata.title}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={titleTemplate}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: "og:image",
          content: `${site.siteMetadata.siteUrl}${
            image ? image : picture.childImageSharp.fixed.src
          }`,
        },
        {
          property: `og:image:alt`,
          content: title,
        },
        { property: "og:image:width", content: 1200 },
        { property: "og:image:height", content: 630 },
      ].concat(meta)}
      defer={false}
    />
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default SEO;
