import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ListContainer from "../components/ListContainer";
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
          link
        }
      }
    }
  `);

  const companies = getSortedCompanies(allYaml.nodes);

  return (
    <Layout location={location}>
      <SEO title="Career" description="My work experience" />

      <ListContainer title="Career">
        {companies.map((company) => (
          <CareerBlock company={company} key={company.company} />
        ))}
      </ListContainer>
    </Layout>
  );
};

export default Career;
