import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import CareerBlock from "../components/CareerBlock";
import { graphql, useStaticQuery } from "gatsby";
import { getSortedCompanies } from "../util/helpers";

const Career = ({ location }) => {
  const { allYaml } = useStaticQuery(graphql`
    query CareerPageQuery {
      allYaml {
        nodes {
          company
          positions {
            start_date
            end_date
            title
          }
          image {
            childImageSharp {
              fluid(maxWidth: 200, maxHeight: 200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          background_color
          link
        }
      }
    }
  `);

  const companies = getSortedCompanies(allYaml.nodes);

  return (
    <Layout location={location}>
      <SEO title="Career" />

      <div className="my-8 grid grid-cols-1 gap-3">
        {companies.map((company) => (
          <CareerBlock company={company} key={company.company} />
        ))}
      </div>
    </Layout>
  );
};

export default Career;
