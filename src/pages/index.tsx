import React from "react";
import Img from "gatsby-image";
import SEO from "../components/SEO";
import CareerBlock from "../components/CareerBlock";
import Layout from "../components/Layout";
import TechnologyBlock from "../components/TechnologyBlock";
import PostLink from "../components/PostLink";
import ProjectLink from "../components/ProjectLink";
import { useStaticQuery, graphql, Link } from "gatsby";
import { FaArrowDown } from "react-icons/fa";
import { getSortedCompanies } from "../util/helpers";

type StyledSectionProps = {
  reverse?: boolean;
};

const StyledSection: React.FunctionComponent<StyledSectionProps> = ({
  children,
  reverse,
}) => {
  return (
    <section
      className={`min-h-screen flex ${
        reverse ? "flex-col-reverse" : "flex-col"
      } lg:flex-row`}
    >
      {children}
    </section>
  );
};

const LeftSection: React.FunctionComponent = ({ children }) => {
  return (
    <div className="flex-1 p-10 flex flex-col">
      <div className="flex-1" />
      {children}
      <div className="flex-1" />
    </div>
  );
};

const RightSection: React.FunctionComponent = ({ children }) => {
  return (
    <div className="flex-1 p-10 bg-black flex flex-col">
      <div className="flex-1" />
      {children}
      <div className="flex-1" />
    </div>
  );
};

const Index: React.FunctionComponent = () => {
  const {
    background,
    picture,
    allYaml,
    site,
    allMdx,
  } = useStaticQuery(graphql`
    query IndexPageQuery {
      background: file(relativePath: { eq: "background.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      picture: file(absolutePath: { regex: "/cover-pic.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1200, maxHeight: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 3
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM Do, YYYY")
              title
              description
            }
            timeToRead
          }
        }
      }
      site {
        siteMetadata {
          technologies {
            name
            background
            text
            link
          }
          projects {
            title
            url
            description
          }
        }
      }

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

  const posts = allMdx.edges;
  const companies = getSortedCompanies(allYaml.nodes);
  const technologies = site.siteMetadata.technologies;
  const projects = site.siteMetadata.projects;

  return (
    <Layout maxWidth>
      <SEO title="Akhila Ariyachandra" />

      <StyledSection reverse>
        <LeftSection>
          <h1 className="text-4xl font-bold lg:text-5xl lg:text-right">
            Akhila Ariyachandra
          </h1>

          <p className="text-lg font-light lg:text-xl lg:text-right lg:pl-40">
            Web Developer trying to share his love and knowledge of React,
            JavaScript, and Programming
          </p>

          <div className="flex mt-3 flex-row-reverse lg:flex-row">
            <div className="flex-1" />

            <FaArrowDown className="text-4xl lg:text-5xl transform scale-125" />
          </div>
        </LeftSection>

        <RightSection>
          <Img
            fluid={picture.childImageSharp.fluid}
            alt="Akhila Ariyachandra"
            className="mx-auto rounded-lg w-full"
            style={{ maxWidth: 600 }}
            imgStyle={{ maxWidth: 600 }}
          />
        </RightSection>
      </StyledSection>

      <StyledSection>
        <LeftSection>
          <h2 className="text-2xl font-semibold lg:text-3xl lg:text-right">
            About me
          </h2>
        </LeftSection>

        <RightSection>
          <h3 className="text-xl font-medium lg:text-2xl">Hi.</h3>

          <p className="text-base font-normal my-3 lg:text-lg">
            My name is Akhila Ariyachandra and I'm a web developer from Sri
            Lanka.
          </p>

          <p className="text-base font-normal my-3 lg:text-lg">
            I discovered my love for JavaScript related development when I had
            to create a Node.js API has part of my final year project at
            university.
          </p>

          <p className="text-base font-normal my-3 lg:text-lg">
            I first started learning React through developing a React Native app
            in my first job.
          </p>

          <p className="text-base font-normal my-3 lg:text-lg">
            Now I'm just trying to continue my pursuit in learning more about
            JavaScript, React and Web Development through things like Next.js,
            Gatsby.js and GraphQL, and share what I've learned.
          </p>
        </RightSection>
      </StyledSection>

      <StyledSection>
        <LeftSection>
          <h2 className="text-2xl font-semibold lg:text-3xl lg:text-right">
            Technologies I work with
          </h2>
        </LeftSection>

        <RightSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {technologies.map((technology) => (
              <TechnologyBlock technology={technology} key={technology.name} />
            ))}
          </div>
        </RightSection>
      </StyledSection>

      <StyledSection>
        <LeftSection>
          <h2 className="text-2xl font-semibold lg:text-3xl lg:text-right">
            Latest posts
          </h2>

          <h3 className="text-lg font-semibold lg:text-xl lg:text-right underline">
            <Link to="/blog/">Read all posts</Link>
          </h3>
        </LeftSection>

        <RightSection>
          <div className="grid grid-cols-1 gap-4">
            {posts.map(({ node }) => (
              <PostLink node={node} key={node.id} dark={false} />
            ))}
          </div>
        </RightSection>
      </StyledSection>

      <StyledSection>
        <LeftSection>
          <h2 className="text-2xl font-semibold lg:text-3xl lg:text-right">
            Career
          </h2>
        </LeftSection>

        <RightSection>
          <div className="grid grid-cols-1 gap-3 w-full">
            {companies.map((company) => (
              <CareerBlock company={company} key={company.company} />
            ))}
          </div>
        </RightSection>
      </StyledSection>

      <StyledSection>
        <LeftSection>
          <h2 className="text-2xl font-semibold lg:text-3xl lg:text-right">
            Projects
          </h2>
        </LeftSection>

        <RightSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectLink project={project} key={project.url} />
            ))}
          </div>
        </RightSection>
      </StyledSection>
    </Layout>
  );
};

export default Index;
