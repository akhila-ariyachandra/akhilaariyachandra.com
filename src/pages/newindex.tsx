import React from "react";
import BackgroundImage from "gatsby-background-image";
import Img from "gatsby-image";
import SEO from "../components/SEO";
import { useStaticQuery, graphql } from "gatsby";
import { FaArrowDown } from "react-icons/fa";

type StyledSectionProps = {
  reverse?: boolean;
};

const StyledSection: React.FunctionComponent<StyledSectionProps> = ({
  children,
  reverse,
}) => {
  return (
    <section
      className={`h-screen flex ${
        reverse ? "flex-col-reverse" : "flex-col"
      } lg:flex-row`}
    >
      {children}
    </section>
  );
};

const LeftSection: React.FunctionComponent = ({ children }) => {
  return (
    <div className="flex-1 p-10 text-white antialiased flex flex-col">
      <div className="flex-1" />
      {children}
      <div className="flex-1" />
    </div>
  );
};

const RightSection: React.FunctionComponent = ({ children }) => {
  return (
    <div className="flex-1 p-10 bg-black text-white antialiased flex flex-col">
      <div className="flex-1" />
      {children}
      <div className="flex-1" />
    </div>
  );
};

const Index: React.FunctionComponent = () => {
  const { background, picture } = useStaticQuery(graphql`
    query NewQuery {
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
    }
  `);

  const imageData = background.childImageSharp.fluid;

  return (
    <BackgroundImage
      className="min-h-screen flex flex-col bg-fixed"
      fluid={imageData}
    >
      <SEO title="Akhila Ariyachandra" />

      <StyledSection reverse>
        <LeftSection>
          <h1 className="text-4xl font-bold text-white antialiased lg:text-5xl lg:text-right">
            Akhila Ariyachandra
          </h1>

          <p className="text-lg font-light lg:text-xl lg:text-right">
            Web Developer trying to share his love and knowledge of React,
            JavaScript, and Programming
          </p>

          <div className="flex mt-3 flex-row-reverse lg:flex-row">
            <div className="flex-1" />

            <FaArrowDown className="text-4xl lg:text-5xl" />
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
          <h2 className="text-2xl font-semibold text-white antialiased lg:text-3xl lg:text-right">
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
          <h2
            className="text-2xl font-semibold text-white antialiased lg:text-3xl lg:text-right"
            id="career"
          >
            Career
          </h2>
        </LeftSection>

        <RightSection></RightSection>
      </StyledSection>
    </BackgroundImage>
  );
};

export default Index;
